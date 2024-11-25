import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const { filename } = await request.json();
    const recordingsPath = path.join(process.cwd(), 'recordings.json');

    // Ensure file exists with valid JSON
    await ensureFileExists(recordingsPath);

    const recordings = await readRecordings(recordingsPath);
    recordings.push({
      filename,
      timestamp: new Date().toISOString()
    });

    await fs.writeFile(recordingsPath, JSON.stringify(recordings, null, 2));

    return NextResponse.json({ message: 'Recording saved successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save recording' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const recordingsPath = path.join(process.cwd(), 'recordings.json');
    
    // Ensure file exists with valid JSON
    await ensureFileExists(recordingsPath);

    const recordings = await readRecordings(recordingsPath);
    return NextResponse.json(recordings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read recordings' }, { status: 500 });
  }
}

// Helper function to ensure file exists with valid JSON
async function ensureFileExists(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    // File doesn't exist, create with empty array
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
  }
}

// Helper function to read recordings safely
async function readRecordings(filePath) {
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch {
    return [];
  }
}