import { formatTime } from '../utils/timeUtils';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
}

export default function ProgressBar({ currentTime, duration }: ProgressBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        ></div>
      </div>
    </div>
  );
};