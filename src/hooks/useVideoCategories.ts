
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useVideoCategories = () => {
  return useQuery({
    queryKey: ['video-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('categories')
        .not('categories', 'is', null);

      if (error) {
        throw error;
      }

      // Get unique categories and add "all" option
      const uniqueCategories = [...new Set(data?.map(item => item.categories).filter(Boolean))];
      const categories = ['all', ...uniqueCategories];
      
      return categories;
    },
  });
};
