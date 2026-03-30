import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useRef, useEffect } from "react";
import { FiVolume2 } from "react-icons/fi";
import { FaWaveSquare } from "react-icons/fa";
import { Image, Switch } from "antd";

export default function MessageBubble({ message }) {
  const { role, text, voice, files = [], hasText = true } = message;
  const isUser = role === "user";

  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [showText, setShowText] = useState(hasText);

  const audioRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const handleClick = () => setUserInteracted(true);
    window.addEventListener("click", handleClick, { once: true });

    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!isUser && voice && message.autoPlay && userInteracted) {
      const audioEl = audioRef.current;
      if (!audioEl) return;

      const timer = setTimeout(async () => {
        try {
          await audioEl.play();
          setSpeaking(true);
        } catch (err) {
          console.log("Autoplay blocked");
        }
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [voice, message.autoPlay, isUser, userInteracted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const cleanTextForSpeech = (input) => {
    if (!input) return "";

    return input
      .replace(/[#*_>`]/g, "")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\n+/g, ". ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const playVoice = async () => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    try {
      setLoading(true);

      if (!audioEl.paused) {
        audioEl.pause();
        audioEl.currentTime = 0;
        setSpeaking(false);
        setLoading(false);
        return;
      }

      if (voice) {
        await audioEl.play().catch(() => {});
        setSpeaking(true);
        setLoading(false);
        return;
      }

      if (text) {
        const cleanText = cleanTextForSpeech(text);
        const voiceSettings = JSON.parse(
          localStorage.getItem("user"),
        )?.voiceSettings;

        const res = await fetch(
          // "http://localhost:3000/revision/text-to-speech",
          `https://companio-ai-backend-tripti-new.azurewebsites.net/revision/text-to-speech`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: cleanText,
              voiceSettings,
            }),
          },
        );

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        audioEl.src = url;

        await audioEl.play().catch(() => {});
        setSpeaking(true);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setSpeaking(false);
    }
  };

  const isImage = (file) =>
    file?.type?.startsWith("image") ||
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file?.url || file);

  const imageFiles = files.filter(isImage);
  const otherFiles = files.filter((f) => !isImage(f));

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
        {!isUser && text && !hasText && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12 }}>
              {showText ? "📄 Text" : "🔊 Voice"}
            </span>
            <Switch
              size="small"
              checked={showText}
              onChange={(checked) => setShowText(checked)}
            />
          </div>
        )}

        {showText && text && (
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
            {imageFiles.map((file, index) => (
              <Image
                key={index}
                src={file.url || file}
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

        <audio
          ref={audioRef}
          src={voice || ""}
          style={{
            display: showText ? "none" : "block",
            width: "220px",
            marginTop: 4,
          }}
          controls={!showText}
          onPlay={() => setSpeaking(true)}
          onPause={() => setSpeaking(false)}
          onEnded={() => setSpeaking(false)}
        />
        {!isUser && text && showText && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 4,
            }}
          >
            <button
              onClick={playVoice}
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