
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DescriptionCardProps {
  description: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ description }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-gray-800">
          🤔 What's happening?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed text-gray-700 text-left">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
