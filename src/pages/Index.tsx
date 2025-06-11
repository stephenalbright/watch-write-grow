
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Watch & Write</h1>
          <p className="text-gray-600">Watch the video, then describe what you saw</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg">Loading videos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error loading videos: {error.message}</p>
            <button 
              onClick={() => refetch()} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : !videos || videos.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-6">
              <p className="text-orange-800 text-lg mb-4">No videos found in database.</p>
              <button 
                onClick={() => refetch()} 
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  );
};

export default Index;
