
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      console.log('Fetching videos from Supabase...');
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('order_sequence', { ascending: true });

      if (error) {
        console.error('Error fetching videos:', error);
        throw error;
      }

      console.log('Videos fetched:', data);
      return data;
    },
  });
};
