
-- Check if videos table has any data
SELECT COUNT(*) as video_count FROM videos;

-- Insert a test video with correct column name (Categories with capital C)
INSERT INTO videos (title, description, file_path, order_sequence, "Categories") 
VALUES (
  'Test Video', 
  'This is a test video description for debugging', 
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
  1, 
  'test'
) ON CONFLICT DO NOTHING;

-- Check what videos we have now
SELECT id, title, file_path, order_sequence, "Categories" FROM videos ORDER BY order_sequence LIMIT 5;
