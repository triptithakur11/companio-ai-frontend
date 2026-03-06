import { Input, Button, Upload, Select } from "antd";
import { UploadOutlined, AudioOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";

export default function ChatInput({ onSend }) {

  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const handleSend = () => {

    if (!text) return;

    onSend({
      type: "text",
      text: text,
      language: language
    });

    setText("");
  };
// const handleFile = (e) => {
//   const file = e.target.files[0];   // FIRST FILE
//   setSelectedFile(file);
// };
  const handleFile = (file) => {

    // onSend({
    //   type: "file",
    //   file: file,
    //   language: language
    // });
console.log(file);
    return false;
  };

  const startRecording = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {

      const blob = new Blob(chunksRef.current, { type: "audio/wav" });

     const file = new File([blob], "voice.wav", {
  type: "audio/wav"
});

      onSend({
        type: "voice",
        file: file,
        language: language
      });
    };

    recorder.start();
  };

  const stopRecording = () => {

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  return (

    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

      <Select
        value={language}
        onChange={(v) => setLanguage(v)}
        style={{ width: 120 }}
        options={[
          { value: "en", label: "English" },
          { value: "hi", label: "Hindi" },
          { value: "es", label: "Spanish" },
          { value: "fr", label: "French" }
        ]}
      />

      <Upload
        beforeUpload={handleFile}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>
          File
        </Button>
      </Upload>

      <Button
        icon={<AudioOutlined />}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
      >
        Voice
      </Button>

      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />

      <Button type="primary" onClick={handleSend}>
        Send
      </Button>

    </div>
  );
}