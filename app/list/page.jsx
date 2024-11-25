'use client'

import  { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      const response = await fetch('/api/save-recording');
      const data = await response.json();
      setRecordings(data);
    };

    fetchRecordings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recorded Audio Files</h1>
      <Link href="/" passHref>
        <Button variant="outline" className="mb-4">
          Back to Recorder
        </Button>
      </Link>
      {recordings.length === 0 ? (
        <p>No recordings found</p>
      ) : (
        <ul className="space-y-2">
          {recordings.map((recording, index) => (
            <li 
              key={index} 
              className="bg-gray-100 p-2 rounded flex justify-between items-center"
            >
              <span>{recording.filename}</span>
              <span className="text-sm text-gray-500">
                {new Date(recording.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}