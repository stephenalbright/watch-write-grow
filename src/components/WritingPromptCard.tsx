
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface WritingPromptCardProps {
  onSubmit: (writing: string) => void;
  isSubmitted: boolean;
  onTryAgain: () => void;
}

const WritingPromptCard: React.FC<WritingPromptCardProps> = ({ 
  onSubmit, 
  isSubmitted, 
  onTryAgain 
}) => {
  const [writing, setWriting] = useState('');

  const handleSubmit = () => {
    if (writing.trim()) {
      onSubmit(writing);
    }
  };

  const handleTryAgain = () => {
    setWriting('');
    onTryAgain();
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-gray-800">
          ✍️ Try to describe what happened
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={writing}
          onChange={(e) => setWriting(e.target.value)}
          placeholder="Be specific! What did you see in the video?"
          className="min-h-32 text-lg p-4 resize-none border-2 border-gray-200 focus:border-blue-400 transition-colors"
          disabled={isSubmitted}
        />
        
        <div className="flex gap-3 justify-end">
          {isSubmitted ? (
            <Button 
              onClick={handleTryAgain}
              variant="outline"
              size="lg"
              className="px-6"
            >
              🔄 Try Again
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!writing.trim()}
              size="lg"
              className="px-6 bg-green-600 hover:bg-green-700 text-white"
            >
              ✅ Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WritingPromptCard;
