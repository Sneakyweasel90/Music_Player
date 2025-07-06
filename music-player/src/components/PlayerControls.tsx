interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function PlayerControls({ 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrevious 
}: PlayerControlsProps) {
  return (
    <div className="flex justify-center items-center space-x-4 mb-6">
      <button
        onClick={onPrevious}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full transition-colors"
        aria-label="Previous song"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </button>

      <button
        onClick={onTogglePlay}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <button
        onClick={onNext}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full transition-colors"
        aria-label="Next song"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};