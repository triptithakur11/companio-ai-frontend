import { Modal, Button, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

export default function VoiceRecorderModal({ open, setOpen, onSend }) {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (recording) startVisualizer();
    else cancelAnimationFrame(animationRef.current);
  }, [recording]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    source.connect(analyser);
    analyserRef.current = analyser;

    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      setRecording(false);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const retake = () => {
    setAudioBlob(null);
    startRecording();
  };

  const sendVoice = () => {
    const file = new File([audioBlob], "voice.webm", { type: "audio/webm" });
    onSend(file);
    setAudioBlob(null);
    setOpen(false);
  };

  const startVisualizer = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;

        ctx.fillStyle = "#1677ff";
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      centered
      title="Voice Recording"
    >
      <Space
        direction="vertical"
        align="center"
        style={{ width: "100%", padding: 20 }}
      >
        {recording && (
          <>
            <AudioOutlined style={{ fontSize: 40, color: "#ff4d4f" }} />
            <div style={{ color: "#ff4d4f", fontWeight: 500 }}>
              Recording...
            </div>
          </>
        )}

        <canvas
          ref={canvasRef}
          width={300}
          height={80}
          style={{
            background: "#111",
            borderRadius: 8,
          }}
        />

        {!recording && !audioBlob && (
          <Button type="primary" onClick={startRecording}>
            Start Recording
          </Button>
        )}

        {recording && (
          <Button danger onClick={stopRecording}>
            Stop Recording
          </Button>
        )}

        {audioBlob && (
          <>
            <audio controls src={URL.createObjectURL(audioBlob)} />

            <Space>
              <Button onClick={retake}>Retake</Button>

              <Button type="primary" onClick={sendVoice}>
                Send
              </Button>
            </Space>
          </>
        )}
      </Space>
    </Modal>
  );
}