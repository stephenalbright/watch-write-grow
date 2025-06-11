
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// 🐛 DEBUG VERSION - Enhanced logging to identify the issue
export const useVideos = (category?: string) => {
  console.log('🔍 useVideos called with category:', category);
  
  return useQuery({
    queryKey: ['videos', category || 'all'],
    queryFn: async () => {
      console.log('🚀 Starting Supabase query...');
      
      let query = supabase
        .from('videos')
        .select('id, title, description, file_path, order_sequence, categories')
        .order('order_sequence', { ascending: true });

      // Filter by category if provided and not "all"
      if (category && category !== 'all') {
        console.log('🎯 Filtering by category:', category);
        query = query.eq('categories', category);
      }

      console.log('📡 Executing Supabase query...');
      const { data, error } = await query;

      // 🔥 DETAILED LOGGING - This will help us find the issue
      console.log('📊 Supabase Response:');
      console.log('  - Data:', data);
      console.log('  - Data type:', typeof data);
      console.log('  - Data length:', data?.length);
      console.log('  - Error:', error);
      console.log('  - Error details:', error ? JSON.stringify(error, null, 2) : 'No error');

      if (error) {
        console.error('❌ Supabase error occurred:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error hint:', error.hint);
        throw error;
      }

      console.log('✅ Query successful, returning data:', data || []);
      return data || [];
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    // 🔧 Add error and success callbacks for more debugging
    onError: (error) => {
      console.error('🚨 React Query Error:', error);
    },
    onSuccess: (data) => {
      console.log('🎉 React Query Success:', data);
      console.log('🎉 Number of videos loaded:', data?.length || 0);
    }
  });
};
