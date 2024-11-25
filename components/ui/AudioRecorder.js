'use client';

import { useState, useRef } from 'react';

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);

      const filename = `recording_${Date.now()}.wav`;

      await fetch('/api/recordings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      });

      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div>
      <button 
        onClick={recording ? stopRecording : startRecording}
        className={`p-2 ${recording ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && <audio src={audioURL} controls />}
    </div>
  );
}