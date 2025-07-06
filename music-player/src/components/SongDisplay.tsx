import { Song } from '../types/music';

interface SongDisplayProps {
  song: Song;
}

export default function SongDisplay({ song }: SongDisplayProps) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        {song.title}
      </h2>
      <p className="text-gray-600">{song.artist}</p>
    </div>
  );
};