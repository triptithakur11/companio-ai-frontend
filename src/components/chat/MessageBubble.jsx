import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useRef } from "react";
import { FiVolume2 } from "react-icons/fi";
import { FaWaveSquare } from "react-icons/fa";
import { Image } from "antd";

export default function MessageBubble({ message }) {
  const { role, text, voice, files = [] } = message;
  const isUser = role === "user";

  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("female");

  const audioRef = useRef(null);

  const cleanTextForSpeech = (input) => {
    if (!input) return "";

    return input
      .replace(/[#*_>`]/g, "") // remove markdown symbols
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // remove markdown links
      .replace(/```[\s\S]*?```/g, "") // remove code blocks
      .replace(/`([^`]+)`/g, "$1") // remove inline code
      .replace(/\n+/g, ". ") // replace new lines with pauses
      .replace(/\s+/g, " ") // normalize spaces
      .trim();
  };

  const speakMessage = async () => {
    if (!text) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setSpeaking(false);
      return;
    }

    try {
      setLoading(true);

      const cleanText = cleanTextForSpeech(text);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/revision/text-to-speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: cleanText,
            voice: selectedVoice,
          }),
        },
      );

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      setLoading(false);
      setSpeaking(true);

      audio.play();

      audio.onended = () => {
        setSpeaking(false);
        audioRef.current = null;
      };
    } catch (err) {
      console.error(err);
      setLoading(false);
      setSpeaking(false);
    }
  };

  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  const imageFiles = files.filter(isImage);
  const otherFiles = files.filter((url) => !isImage(url));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          padding: 12,
          borderRadius: 12,
          background: isUser ? "#3B82F6" : "#fff",
          color: isUser ? "#fff" : "#111",
          maxWidth: "70%",
          fontSize: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {text && (
          <div>
            {isUser ? (
              text
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            )}
          </div>
        )}

        {imageFiles.length > 0 && (
          <Image.PreviewGroup>
            {imageFiles.map((url, index) => (
              <Image
                key={index}
                src={url}
                width={220}
                style={{ borderRadius: 8 }}
              />
            ))}
          </Image.PreviewGroup>
        )}

        {otherFiles.map((url, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              color: isUser ? "#fff" : "#2563eb",
              textDecoration: "underline",
              fontSize: 13,
            }}
          >
            📎 View File
          </a>
        ))}

        {voice && (
          <audio
            controls
            src={voice}
            style={{
              width: "220px",
              marginTop: 4,
            }}
          />
        )}

        {!isUser && text && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 4,
            }}
          >
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              style={{
                borderRadius: 6,
                padding: "2px 6px",
                fontSize: 12,
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              <option value="female">👩 Female</option>
              <option value="male">👨 Male</option>
            </select>

            <button
              onClick={speakMessage}
              disabled={loading}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
              }}
            >
              {loading ? (
                <span className="loader" />
              ) : speaking ? (
                <FaWaveSquare className="speakingIcon" />
              ) : (
                <FiVolume2 />
              )}
            </button>
          </div>
        )}
      </div>

      <style>
        {`
        .loader {
          width:16px;
          height:16px;
          border:2px solid #ccc;
          border-top:2px solid #333;
          border-radius:50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .speakingIcon {
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity:0.6 }
          50% { transform: scale(1.3); opacity:1 }
          100% { transform: scale(1); opacity:0.6 }
        }
        `}
      </style>
    </div>
  );
}
