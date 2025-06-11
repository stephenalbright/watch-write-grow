
import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import DescriptionCard from '../components/DescriptionCard';
import WritingPromptCard from '../components/WritingPromptCard';
import FeedbackSection from '../components/FeedbackSection';

const Index = () => {
  const [userWriting, setUserWriting] = useState('');
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  // Mock video data - in real app this would come from Supabase
  const videoData = {
    id: 1,
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    description: "A woman throws a red ball in the park. Her dog chases it while people relax nearby. Trees sway in the gentle breeze.",
    caption: "🐶 + 🧺 = ❤️"
  };

  const handleSubmitWriting = (writing: string) => {
    setUserWriting(writing);
    setFeedbackVisible(true);
  };

  const handleTryAgain = () => {
    setUserWriting('');
    setFeedbackVisible(false);
  };

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

        <div className="grid gap-6 md:grid-cols-2">
          <VideoCard 
            videoUrl={videoData.videoUrl}
            caption={videoData.caption}
          />
          
          <DescriptionCard 
            description={videoData.description}
          />
        </div>

        <WritingPromptCard 
          onSubmit={handleSubmitWriting}
          isSubmitted={feedbackVisible}
          onTryAgain={handleTryAgain}
        />

        {feedbackVisible && (
          <FeedbackSection 
            userWriting={userWriting}
            videoDescription={videoData.description}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
