
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useVideoCategories = () => {
  return useQuery({
    queryKey: ['video-categories'],
    queryFn: async () => {
      console.log('Fetching video categories...');
      
      const { data, error } = await supabase
        .from('video')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        console.error('Error fetching categories:', error);
        console.error('Category error details:', JSON.stringify(error, null, 2));
        throw error;
      }

      console.log('Raw category data:', JSON.stringify(data, null, 2));

      // Get unique categories and add "all" option
      const uniqueCategories = [...new Set(data?.map(item => item.category).filter(Boolean))];
      const categories = ['all', ...uniqueCategories];
      
      console.log('Available categories:', categories);
      console.log('Unique categories found:', uniqueCategories);
      return categories;
    },
  });
};
