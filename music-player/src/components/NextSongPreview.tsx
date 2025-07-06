import { Song } from '../types/music';

interface NextSongPreviewProps {
  song: Song;
}

export default function NextSongPreview({ song }: NextSongPreviewProps) {
  return (
    <div className="text-center text-sm text-gray-500">
      <p>Next: {song.title}</p>
    </div>
  );
};