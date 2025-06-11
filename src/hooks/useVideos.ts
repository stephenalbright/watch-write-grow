
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useVideos = (category?: string) => {
  return useQuery({
    queryKey: ['videos', category || 'all'],
    queryFn: async () => {
      let query = supabase
        .from('videos')
        .select('id, title, description, file_path, order_sequence, categories')
        .order('order_sequence', { ascending: true });

      if (category && category !== 'all') {
        query = query.eq('categories', category);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data || [];
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
