import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, SkipForward, SkipBack, Volume2, VolumeX, Settings, Maximize } from 'lucide-react';

interface VideoPlayerProps {
    title: string;
    duration: string;
}

export function VideoPlayer({ title, duration }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlayback = () => setIsPlaying(!isPlaying);

    return (
        <Card>
            <CardContent className="p-0 relative bg-black aspect-video flex items-center justify-center overflow-hidden">
                <div className="text-white text-opacity-30 text-sm absolute top-4 left-4">
                    {title || 'Loading video...'}
                </div>

                {/* Placeholder for video */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-opacity-50 text-lg">
                        {isPlaying ? 'Playing video...' : 'Video paused'}
                    </div>
                </div>

                {/* Video controls overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="flex flex-col gap-2">
                        {/* Progress bar */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={currentTime}
                            onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                            className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer"
                        />

                        <div className="flex justify-between items-center">
                            {/* Left controls */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={togglePlayback}
                                    className="text-white hover:bg-white/10">
                                    {isPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                    <SkipBack size={20} />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                    <SkipForward size={20} />
                                </Button>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="text-white hover:bg-white/10">
                                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                    </Button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : volume}
                                        onChange={(e) => setVolume(parseInt(e.target.value))}
                                        className="w-16 h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                <span className="text-white text-xs">10:23 / {duration}</span>
                            </div>

                            {/* Right controls */}
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                    <Settings size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                    <Maximize size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
