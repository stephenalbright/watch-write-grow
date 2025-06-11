
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VideoCardProps {
  videoUrl: string;
  caption?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl, caption }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-gray-800 text-center">
          📺 Watch this video
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
          <video 
            controls 
            className="w-full h-full object-cover"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='sans-serif' font-size='16'%3EClick to play video%3C/text%3E%3C/svg%3E"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {caption && (
          <div className="text-center">
            <p className="text-2xl" role="img" aria-label="Video hint">
              {caption}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
