// import AudioRecorder from '@/components/AudioRecorder';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AudioRecorder from './recorder/page';

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
      <h1 className="text-3xl font-bold">Audio Recorder</h1>
      <AudioRecorder />
      <Link href="/list" passHref>
        <Button variant="secondary">
          View Recordings
        </Button>
      </Link>
    </div>
  );
}