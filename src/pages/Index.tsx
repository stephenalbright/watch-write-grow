
import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';
import WritingPromptCard from '../components/WritingPromptCard';
import FeedbackSection from '../components/FeedbackSection';
import VideoNavigation from '../components/VideoNavigation';
import { useVideos } from '../hooks/useVideos';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [userWriting, setUserWriting] = useState('');
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const { data: videos, isLoading, error, refetch } = useVideos();

  // 🔍 DEBUG LOGGING
  console.log('🎬 Index Component Debug:');
  console.log('  - videos:', videos);
  console.log('  - videos length:', videos?.length);
  console.log('  - isLoading:', isLoading);
  console.log('  - error:', error);
  console.log('  - currentVideoIndex:', currentVideoIndex);

  // 🧪 TEST BUTTON - Direct Supabase connection test
  const testSupabaseConnection = async () => {
    console.log('🧪 Testing direct Supabase connection...');
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .limit(1);
      
      console.log('🧪 Direct test result:', { data, error });
      alert(`Test result: ${data?.length || 0} videos found. Check console for details.`);
    } catch (err) {
      console.error('🧪 Direct test failed:', err);
      alert('Direct test failed. Check console for details.');
    }
  };

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

  // 🎯 ENHANCED CONDITIONAL RENDERING DEBUG
  console.log('🎯 Rendering conditions:');
  console.log('  - videos exists:', !!videos);
  console.log('  - videos is array:', Array.isArray(videos));
  console.log('  - videos length > 0:', videos && videos.length > 0);
  console.log('  - currentVideo:', currentVideo);
  console.log('  - will show "no videos":', !videos || videos.length === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Watch & Write</h1>
          <p className="text-gray-600">Watch the video, then describe what you saw</p>
          
          {/* 🧪 TEMPORARY DEBUG BUTTON - Remove this once fixed */}
          <button
            onClick={testSupabaseConnection}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            🧪 Test Supabase Connection
          </button>
        </div>

        {/* 🔍 ENHANCED DEBUG INFO DISPLAY */}
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
          <h3 className="font-bold">🐛 Debug Info:</h3>
          <p>Loading: {isLoading ? 'YES' : 'NO'}</p>
          <p>Error: {error ? error.message : 'None'}</p>
          <p>Videos found: {videos?.length || 0}</p>
          <p>Current video index: {currentVideoIndex}</p>
          <p>Current video exists: {currentVideo ? 'YES' : 'NO'}</p>
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
            <p className="text-green-600 text-center mb-4">
              ✅ {videos.length} videos loaded successfully!
            </p>
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
