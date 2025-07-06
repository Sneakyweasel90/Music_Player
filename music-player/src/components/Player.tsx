"use client"

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
}


// Credits
// Music by [Pixabay Music](https://pixabay.com/music/)
// Images by [Unsplash](https://unsplash.com/)
// Icons by [Lucide](https://lucide.dev/)

const playlist: Song[] = [
  {
    id: 1,
    title: "Jungle Waves",
    artist: "DIMMYSAD",
    src: "/songs/junglewaves.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Stylish Deep Electronic",
    artist: "NverAvetyanMusic",
    src: "/songs/Stylish_Deep_Electronic.mp3",
    cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Spinning Head",
    artist: "Gvidon",
    src: "/songs/spinning-head.mp3",
    cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Alone",
    artist: "BoDleasons",
    src: "/songs/alone.mp3",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Don't Talk",
    artist: "Cosmonkey",
    src: "/songs/dont-talk.mp3",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Gorilla",
    artist: "Alex_MakeMusic",
    src: "/songs/gorilla.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  },
  {
    id: 7,
    title: "Future Design",
    artist: "Penguin Music",
    src: "/songs/future-design.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop"
  },
];

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function EnhancedMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    const handleNext = () => {
      const nextIndex = (currentSongIndex + 1) % playlist.length;
      setCurrentSongIndex(nextIndex);
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 100);
    };

    const handleError = () => {
      setError('Failed to load audio file');
      console.error('Audio loading error');
    };

    audio.load();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleNext);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleNext);
      audio.removeEventListener('error', handleError);
    };
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error('Play error:', err);
        setError('Failed to play audio');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    setError(null);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 100);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setError(null);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = clickX / rect.width;
    const newTime = clickRatio * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 w-[100%] to-indigo-900 flex items-center justify-center p-4">      
      <div className="relative w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* Error Message */}
        {error && (
          <div className="lg:col-span-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Main Player Card */}
        <div className="flex-1 backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse"></div>
          
          {/* Audio Element */}
          <audio 
            ref={audioRef} 
            src={currentSong.src}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            crossOrigin="anonymous"
          />
          
          {/* Album Art */}
          <div className="relative mb-8">
            <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-2xl relative">
              {currentSong.cover ? (
                <img 
                  src={currentSong.cover} 
                  alt={`${currentSong.title} cover`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Music className="w-24 h-24 text-white/80" />
                </div>
              )}
              
              {/* Rotating Animation for Playing State */}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/10 rounded-2xl animate-spin" style={{animationDuration: '20s'}}></div>
              )}
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-white/10"></div>
            </div>
            
            {/* Floating Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-gray-800 group-hover:text-purple-600 transition-colors" />
              ) : (
                <Play className="w-8 h-8 text-gray-800 group-hover:text-purple-600 transition-colors ml-1" />
              )}
            </button>
          </div>

          {/* Song Info */}
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2 truncate">
              {currentSong.title}
            </h2>
            <p className="text-white/70 text-lg">{currentSong.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 relative z-10">
            <div className="flex justify-between text-sm text-white/70 mb-3">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div 
              className="w-full bg-white/20 rounded-full h-2 cursor-pointer relative overflow-hidden group"
              onClick={handleProgressClick}
            >
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300 relative"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center items-center space-x-6 mb-8 relative z-10">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <SkipBack className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <SkipForward className="w-6 h-6 text-white" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsVolumeVisible(!isVolumeVisible)}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Volume2 className="w-6 h-6 text-white" />
              </button>
              
              {/* Volume Slider */}
              {isVolumeVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-white/10 backdrop-blur-xl rounded-full p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24 h-2 bg-white/20 rounded-lg cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                      }}
                    />
                    <span className="text-white/70 text-sm w-8">
                      {Math.round(volume * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Song Preview */}
          <div className="text-center text-white/60 text-sm relative z-10">
            <p>Next: {playlist[(currentSongIndex + 1) % playlist.length].title}</p>
          </div>
        </div>

        {/* Playlist Preview */}
        <div className="w-full lg:w-80 backdrop-blur-xl bg-white/5 rounded-2xl p-4 shadow-xl border border-white/10">
          <h3 className="text-white font-semibold mb-3 text-center">Playlist</h3>
          <div className="space-y-2 max-h-96 lg:max-h-[600px] overflow-y-auto">
            {playlist.map((song, index) => (
              <button
                key={song.id}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setError(null);
                }}
                className={`w-full p-3 rounded-xl text-left transition-all duration-300 hover:bg-white/10 ${
                  index === currentSongIndex 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Music className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-sm opacity-70 truncate">{song.artist}</p>
                  </div>
                  {index === currentSongIndex && isPlaying && (
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                      <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};