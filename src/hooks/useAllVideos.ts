
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAllVideos = () => {
  return useQuery({
    queryKey: ['all-videos'],
    queryFn: async () => {
      console.log('Fetching all videos...');
      
      // First, let's try to get a count of videos
      const { count, error: countError } = await supabase
        .from('videos')
        .select('*', { count: 'exact', head: true });
      
      console.log('Video count query result:', { count, countError });
      
      // Now fetch the actual data with the correct column name
      const { data, error } = await supabase
        .from('videos')
        .select('id, title, description, file_path, order_sequence, Categories')
        .order('order_sequence', { ascending: true });

      console.log('Query executed successfully');
      console.log('Supabase response - data:', data);
      console.log('Supabase response - error:', error);
      console.log('Data type:', typeof data);
      console.log('Is data an array?', Array.isArray(data));

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
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
