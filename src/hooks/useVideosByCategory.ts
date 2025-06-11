
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useVideosByCategory = (category: string) => {
  return useQuery({
    queryKey: ['videos', category],
    queryFn: async () => {
      console.log(`Fetching videos for category: ${category}`);
      
      let query = supabase
        .from('video')
        .select('*')
        .order('order_sequence', { ascending: true });

      // Filter by category if not "all"
      if (category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching videos by category:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw error;
      }

      console.log(`Videos fetched for ${category}:`, data);
      console.log(`Number of videos in ${category}:`, data?.length || 0);
      console.log('Raw video data:', JSON.stringify(data, null, 2));
      
      return data || [];
    },
    enabled: !!category,
  });
};
