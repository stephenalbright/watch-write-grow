
import React, { useState, useEffect } from 'react';
import FeedbackCard from './FeedbackCard';
import { generateFeedback } from '../utils/aiService';

interface FeedbackSectionProps {
  userWriting: string;
  videoDescription: string;
}

interface FeedbackItem {
  title: string;
  text: string;
  type: 'encouragement' | 'spelling' | 'detail' | 'structure' | 'tryAgain';
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  userWriting,
  videoDescription
}) => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        setIsLoading(true);
        const aiResponse = await generateFeedback(userWriting, videoDescription);
        setFeedback(aiResponse);
      } catch (error) {
        console.error('Error generating feedback:', error);
        // Fallback to mock feedback
        setFeedback(getMockFeedback(userWriting));
      } finally {
        setIsLoading(false);
      }
    };

    getFeedback();
  }, [userWriting, videoDescription]);

  const getMockFeedback = (writing: string): FeedbackItem[] => {
    const feedbackItems: FeedbackItem[] = [
      {
        title: "You're doing great! 🌟",
        text: "You noticed important details from the video. Keep it up!",
        type: 'encouragement'
      }
    ];

    if (writing.length > 0) {
      feedbackItems.push({
        title: "Try fixing this ✏️",
        text: "Remember to use capital letters at the start of sentences.",
        type: 'spelling'
      });

      feedbackItems.push({
        title: "Add more details 📝",
        text: "You could mention what the people or animals were doing.",
        type: 'detail'
      });

      feedbackItems.push({
        title: "Here's another way to say it 💡",
        text: "Try using more describing words like 'happy dog' or 'sunny park'.",
        type: 'structure'
      });
    }

    return feedbackItems;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Getting your feedback... ✨
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-semibold text-gray-800 text-center">
        Here's your feedback! 🎉
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {feedback.map((item, index) => (
          <FeedbackCard
            key={index}
            title={item.title}
            text={item.text}
            type={item.type}
            delay={index * 200}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackSection;
