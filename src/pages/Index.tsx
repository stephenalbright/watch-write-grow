
import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import WritingPromptCard from '../components/WritingPromptCard';
import FeedbackSection from '../components/FeedbackSection';
import CategorySelector from '../components/CategorySelector';
import VideoNavigation from '../components/VideoNavigation';
import { useVideosByCategory } from '../hooks/useVideosByCategory';
import { useVideoCategories } from '../hooks/useVideoCategories';

const Index = () => {
  const [userWriting, setUserWriting] = useState('');
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: categories = [], isLoading: categoriesLoading } = useVideoCategories();
  const { data: videos, isLoading: videosLoading, error } = useVideosByCategory(selectedCategory);

  console.log('Current state:', {
    selectedCategory,
    currentVideoIndex,
    videosLength: videos?.length,
    categories,
    isLoading: videosLoading
  });

  const handleSubmitWriting = (writing: string) => {
    setUserWriting(writing);
    setFeedbackVisible(true);
  };

  const handleTryAgain = () => {
    setUserWriting('');
    setFeedbackVisible(false);
  };

  const handleCategoryChange = (category: string) => {
    console.log('Category changed to:', category);
    setSelectedCategory(category);
    setCurrentVideoIndex(0); // Reset to first video when category changes
    setFeedbackVisible(false); // Reset feedback when switching videos
    setUserWriting('');
  };

  const handlePreviousVideo = () => {
    console.log('Previous video clicked, current index:', currentVideoIndex);
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setFeedbackVisible(false);
      setUserWriting('');
    }
  };

  const handleNextVideo = () => {
    console.log('Next video clicked, current index:', currentVideoIndex, 'total videos:', videos?.length);
    if (videos && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setFeedbackVisible(false);
      setUserWriting('');
    }
  };

  // Use placeholder data if no videos are available
  const placeholderVideo = {
    id: 1,
    title: "Sample Video",
    file_path: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "A sample video for testing purposes"
  };

  const currentVideo = videos && videos.length > 0 ? videos[currentVideoIndex] : placeholderVideo;
  const totalVideos = videos?.length || 0;
  const isLoading = categoriesLoading || videosLoading;

  console.log('Rendering with:', {
    currentVideo: currentVideo?.title,
    totalVideos,
    showNavigation: totalVideos > 1
  });

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
          <div className="text-center text-red-600 mb-4">
            Using placeholder video (Error: {error.message})
            <br />
            <small>Check console for detailed error information</small>
          </div>
        )}

        {!categoriesLoading && categories.length > 0 && (
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />
        )}

        <VideoCard 
          videoUrl={currentVideo.file_path}
          caption={currentVideo.title}
        />

        {/* Always show navigation for debugging, but disable buttons appropriately */}
        <VideoNavigation
          currentIndex={currentVideoIndex}
          totalVideos={Math.max(totalVideos, 1)} // Show at least 1 to make navigation visible
          onPrevious={handlePreviousVideo}
          onNext={handleNextVideo}
          category={selectedCategory}
        />

        {totalVideos === 0 && (
          <div className="text-center text-amber-600 bg-amber-50 p-4 rounded-lg">
            No videos found in database. Using placeholder video for demo.
            <br />
            <small>Check console logs for debugging information.</small>
          </div>
        )}

        <WritingPromptCard 
          onSubmit={handleSubmitWriting}
          isSubmitted={feedbackVisible}
          onTryAgain={handleTryAgain}
        />

        {feedbackVisible && (
          <FeedbackSection 
            userWriting={userWriting}
            videoDescription={currentVideo.description || 'Sample video description'}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
