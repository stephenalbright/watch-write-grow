
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAllVideos = () => {
  return useQuery({
    queryKey: ['all-videos'],
    queryFn: async () => {
      console.log('Fetching all videos...');
      
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('order_sequence', { ascending: true });

      if (error) {
        console.error('Error fetching videos:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw error;
      }

      console.log('All videos fetched:', data);
      console.log('Number of videos:', data?.length || 0);
      console.log('Raw video data:', JSON.stringify(data, null, 2));
      
      return data || [];
    },
  });
};
