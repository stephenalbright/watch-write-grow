
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeedbackCardProps {
  title: string;
  text: string;
  type: 'encouragement' | 'spelling' | 'detail' | 'structure' | 'tryAgain';
  delay?: number;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ 
  title, 
  text, 
  type, 
  delay = 0 
}) => {
  const getCardStyles = () => {
    switch (type) {
      case 'encouragement':
        return 'border-green-200 bg-green-50/50';
      case 'spelling':
        return 'border-blue-200 bg-blue-50/50';
      case 'detail':
        return 'border-purple-200 bg-purple-50/50';
      case 'structure':
        return 'border-orange-200 bg-orange-50/50';
      default:
        return 'border-gray-200 bg-gray-50/50';
    }
  };

  return (
    <Card 
      className={`shadow-md hover:shadow-lg transition-all duration-300 ${getCardStyles()} animate-scale-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">
          {text}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
