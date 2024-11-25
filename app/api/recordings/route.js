import Link from 'next/link';

async function getRecordings() {
  try {
    const response = await fetch('http://localhost:3000/api/recordings', { 
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recordings');
    }

    return response.json();
  } catch (error) {
    console.error('Recordings fetch error:', error);
    return [];
  }
}

export default async function RecordingsPage() {
  const recordings = await getRecordings();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Recorded Audio Files</h1>
      <Link href="/" className="mb-4 inline-block p-2 bg-blue-500 text-white">
        Back to Recorder
      </Link>
      {recordings.length === 0 ? (
        <p>No recordings found</p>
      ) : (
        <ul>
          {recordings.map((recording, index) => (
            <li key={index} className="mb-2 p-2 bg-gray-100">
              {recording.filename} - {new Date(recording.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}