'use client'

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

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

      // Generate unique filename
      const filename = `recording_${Date.now()}.wav`;

      // Save file and update recordings list
      const response = await fetch('/api/save-recording', {
        method: 'POST',
        body: JSON.stringify({ 
          filename, 
          url: audioURL 
        }),
        headers: {
          'Content-Type': 'application/json'
        }
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
    <div className="flex flex-col items-center space-y-4">
      <Button 
        onClick={recording ? stopRecording : startRecording}
        variant={recording ? "destructive" : "default"}
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      {audioURL && (
        <audio 
          src={audioURL} 
          controls 
          className="mt-4"
        />
      )}
    </div>
  );
}