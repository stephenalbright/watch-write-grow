
import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import WritingPromptCard from '../components/WritingPromptCard';
import FeedbackSection from '../components/FeedbackSection';
import VideoNavigation from '../components/VideoNavigation';
import { useVideos } from '../hooks/useVideos';

const Index = () => {
  const [userWriting, setUserWriting] = useState('');
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const { data: videos, isLoading, error, refetch } = useVideos();

  const handleSubmitWriting = (writing: string) => {
    setUserWriting(writing);
    setFeedbackVisible(true);
  };

  const handleTryAgain = () => {
    setUserWriting('');
    setFeedbackVisible(false);
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setFeedbackVisible(false);
      setUserWriting('');
    }
  };

  const handleNextVideo = () => {
    if (videos && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setFeedbackVisible(false);
      setUserWriting('');
    }
  };

  const currentVideo = videos && videos.length > 0 ? videos[currentVideoIndex] : null;
  const totalVideos = videos?.length || 0;

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

        {isLoading && (
          <div className="text-center text-gray-600 mb-4">
            Loading videos...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 mb-4 p-4 bg-red-50 rounded-lg">
            Error loading videos: {error.message}
            <br />
            <button 
              onClick={() => refetch()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {!currentVideo && !isLoading && !error && (
          <div className="text-center text-amber-600 bg-amber-50 p-4 rounded-lg">
            No videos found in database.
            <br />
            <button 
              onClick={() => refetch()} 
              className="mt-2 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            >
              Refresh
            </button>
          </div>
        )}

        {currentVideo && (
          <>
            <VideoCard 
              videoUrl={currentVideo.file_path}
              caption={currentVideo.title}
            />

            {totalVideos > 1 && (
              <VideoNavigation
                currentIndex={currentVideoIndex}
                totalVideos={totalVideos}
                onPrevious={handlePreviousVideo}
                onNext={handleNextVideo}
                category="all videos"
              />
            )}

            <WritingPromptCard 
              onSubmit={handleSubmitWriting}
              isSubmitted={feedbackVisible}
              onTryAgain={handleTryAgain}
            />

            {feedbackVisible && (
              <FeedbackSection 
                userWriting={userWriting}
                videoDescription={currentVideo.description || 'Video description not available'}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
