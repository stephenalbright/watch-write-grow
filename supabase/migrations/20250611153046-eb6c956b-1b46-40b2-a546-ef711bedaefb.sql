
-- Insert some sample video data into the videos table
INSERT INTO public.videos (title, description, file_path, category, order_sequence) VALUES
('Sample Video 1', 'A sample video for testing', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'educational', 1),
('Sample Video 2', 'Another sample video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'educational', 2),
('Sample Video 3', 'Third sample video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'educational', 3);
