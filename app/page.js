import Link from 'next/link';
import AudioRecorder from './recorder/page';

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Audio Recorder</h1>
      <AudioRecorder />
      <Link href="/list" className="mt-4 inline-block p-2 bg-green-500 text-white">
        View Recordings
      </Link>
    </main>
  );
}