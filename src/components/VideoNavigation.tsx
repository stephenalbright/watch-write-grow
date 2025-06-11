
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoNavigationProps {
  currentIndex: number;
  totalVideos: number;
  onPrevious: () => void;
  onNext: () => void;
  category: string;
}

const VideoNavigation: React.FC<VideoNavigationProps> = ({
  currentIndex,
  totalVideos,
  onPrevious,
  onNext,
  category
}) => {
  if (totalVideos <= 1) return null;

  return (
    <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <Button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <div className="text-center">
        <p className="text-lg font-medium text-gray-800">
          Video {currentIndex + 1} of {totalVideos}
        </p>
        <p className="text-sm text-gray-600 capitalize">
          {category}
        </p>
      </div>
      
      <Button
        onClick={onNext}
        disabled={currentIndex === totalVideos - 1}
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VideoNavigation;
