import { Input, Button, Upload, Select } from "antd";
import {
  UploadOutlined,
  AudioOutlined,
  SendOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import VoiceRecorderModal from "./VoiceRecorderModal";

const languageOptions = [
  { value: "en", label: "English 🇬🇧" },
  { value: "hi", label: "Hindi 🇮🇳" },
  { value: "es", label: "Spanish 🇪🇸" },
  { value: "fr", label: "French 🇫🇷" },
  { value: "de", label: "German 🇩🇪" },
  { value: "it", label: "Italian 🇮🇹" },
  { value: "pt", label: "Portuguese 🇵🇹" },
  { value: "ru", label: "Russian 🇷🇺" },
  { value: "zh-Hans", label: "Chinese (Simplified) 🇨🇳" },
  { value: "zh-Hant", label: "Chinese (Traditional) 🇹🇼" },
  { value: "ja", label: "Japanese 🇯🇵" },
  { value: "ko", label: "Korean 🇰🇷" },
  { value: "ar", label: "Arabic 🇸🇦" },
  { value: "tr", label: "Turkish 🇹🇷" },
  { value: "nl", label: "Dutch 🇳🇱" },
  { value: "sv", label: "Swedish 🇸🇪" },
  { value: "pl", label: "Polish 🇵🇱" },
  { value: "th", label: "Thai 🇹🇭" },
  { value: "vi", label: "Vietnamese 🇻🇳" },
  { value: "id", label: "Indonesian 🇮🇩" },
  { value: "ms", label: "Malay 🇲🇾" },
  { value: "uk", label: "Ukrainian 🇺🇦" },
  { value: "fa", label: "Persian 🇮🇷" },
  { value: "he", label: "Hebrew 🇮🇱" },
  { value: "el", label: "Greek 🇬🇷" },
  { value: "cs", label: "Czech 🇨🇿" },
  { value: "hu", label: "Hungarian 🇭🇺" },
  { value: "ro", label: "Romanian 🇷🇴" },
  { value: "sk", label: "Slovak 🇸🇰" },
  { value: "bg", label: "Bulgarian 🇧🇬" },
  { value: "hr", label: "Croatian 🇭🇷" },
  { value: "sr", label: "Serbian 🇷🇸" },
  { value: "sl", label: "Slovenian 🇸🇮" },
  { value: "da", label: "Danish 🇩🇰" },
  { value: "fi", label: "Finnish 🇫🇮" },
  { value: "no", label: "Norwegian 🇳🇴" },
  { value: "et", label: "Estonian 🇪🇪" },
  { value: "lv", label: "Latvian 🇱🇻" },
  { value: "lt", label: "Lithuanian 🇱🇹" },
  { value: "bn", label: "Bengali 🇧🇩" },
  { value: "ta", label: "Tamil 🇮🇳" },
  { value: "te", label: "Telugu 🇮🇳" },
  { value: "ml", label: "Malayalam 🇮🇳" },
  { value: "kn", label: "Kannada 🇮🇳" },
  { value: "mr", label: "Marathi 🇮🇳" },
  { value: "gu", label: "Gujarati 🇮🇳" },
  { value: "pa", label: "Punjabi 🇮🇳" },
  { value: "ur", label: "Urdu 🇵🇰" },
  { value: "sw", label: "Swahili 🇰🇪" },
  { value: "af", label: "Afrikaans 🇿🇦" },
  { value: "sq", label: "Albanian 🇦🇱" },
  { value: "am", label: "Amharic 🇪🇹" },
  { value: "hy", label: "Armenian 🇦🇲" },
  { value: "az", label: "Azerbaijani 🇦🇿" },
  { value: "eu", label: "Basque 🇪🇸" },
  { value: "be", label: "Belarusian 🇧🇾" },
  { value: "bs", label: "Bosnian 🇧🇦" },
  { value: "ca", label: "Catalan 🇪🇸" },
  { value: "gl", label: "Galician 🇪🇸" },
  { value: "is", label: "Icelandic 🇮🇸" },
  { value: "ga", label: "Irish 🇮🇪" },
  { value: "kk", label: "Kazakh 🇰🇿" },
  { value: "km", label: "Khmer 🇰🇭" },
  { value: "lo", label: "Lao 🇱🇦" },
  { value: "mk", label: "Macedonian 🇲🇰" },
  { value: "mn", label: "Mongolian 🇲🇳" },
  { value: "ne", label: "Nepali 🇳🇵" },
  { value: "ps", label: "Pashto 🇦🇫" },
  { value: "si", label: "Sinhala 🇱🇰" },
  { value: "tg", label: "Tajik 🇹🇯" },
  { value: "uz", label: "Uzbek 🇺🇿" },
  { value: "zu", label: "Zulu 🇿🇦" }
];

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [files, setFiles] = useState([]);
  const [voice, setVoice] = useState(null);
  const [voiceModal, setVoiceModal] = useState(false);

  const handleFile = (file) => {
    const realFile = file.originFileObj || file;
    setFiles((prev) => [...prev, realFile]);
    return false;
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVoice = () => {
    setVoice(null);
  };

  const handleSend = () => {
    if (!text && files.length === 0 && !voice) return;

    onSend({
      text,
      files,
      voice,
      language,
    });

    setText("");
    setFiles([]);
    setVoice(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {files.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {files.map((file, index) => (
            <div
              key={index}
              style={{
                padding: "4px 8px",
                border: "1px solid #ddd",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {file.name}

              <DeleteOutlined
                style={{ cursor: "pointer" }}
                onClick={() => removeFile(index)}
              />
            </div>
          ))}
        </div>
      )}

      {voice && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid #ddd",
            padding: "4px 8px",
            borderRadius: 6,
            width: "fit-content",
          }}
        >
          <audio
            controls
            src={URL.createObjectURL(voice)}
            style={{ width: 220 }}
          />

          <DeleteOutlined
            style={{ cursor: "pointer", color: "#ff4d4f" }}
            onClick={removeVoice}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Select
          value={language}
          onChange={(v) => setLanguage(v)}
          showSearch
          optionFilterProp="label"
          style={{ width: 170 }}
          options={languageOptions }
        />

        <Upload multiple beforeUpload={handleFile} showUploadList={false}>
          <Button icon={<UploadOutlined />} />
        </Upload>

        <Button icon={<AudioOutlined />} onClick={() => setVoiceModal(true)} />

        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          onPressEnter={handleSend}
        />

        <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>
          Send
        </Button>
      </div>

      <VoiceRecorderModal
        open={voiceModal}
        setOpen={setVoiceModal}
        onSend={(voiceFile) => setVoice(voiceFile)}
      />
    </div>
  );
}
