
import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import WritingPromptCard from '../components/WritingPromptCard';
import FeedbackSection from '../components/FeedbackSection';
import { useVideos } from '../hooks/useVideos';

const Index = () => {
  const [userWriting, setUserWriting] = useState('');
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const { data: videos, isLoading, error } = useVideos();

  const handleSubmitWriting = (writing: string) => {
    setUserWriting(writing);
    setFeedbackVisible(true);
  };

  const handleTryAgain = () => {
    setUserWriting('');
    setFeedbackVisible(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading videos: {error.message}</div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">No videos found.</div>
      </div>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Watch & Write
          </h1>
          <p className="text-lg text-gray-600">
            Watch the video, then describe what you saw
          </p>
        </div>

        <VideoCard 
          videoUrl={currentVideo.video_url}
          caption={currentVideo.caption || undefined}
        />

        <WritingPromptCard 
          onSubmit={handleSubmitWriting}
          isSubmitted={feedbackVisible}
          onTryAgain={handleTryAgain}
        />

        {feedbackVisible && (
          <FeedbackSection 
            userWriting={userWriting}
            videoDescription={currentVideo.description}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
