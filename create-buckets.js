const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createBuckets() {
  console.log('Creating storage buckets...\n');

  const buckets = [
    { name: 'menu-images', description: 'Images for menu items' },
    { name: 'blog-images', description: 'Images for blog posts' },
    { name: 'event-images', description: 'Images for events' }
  ];

  for (const bucket of buckets) {
    console.log(`Creating bucket: ${bucket.name}...`);
    
    const { data, error } = await supabase.storage.createBucket(bucket.name, {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`✓ Bucket '${bucket.name}' already exists\n`);
      } else {
        console.error(`✗ Error creating '${bucket.name}':`, error.message, '\n');
      }
    } else {
      console.log(`✓ Bucket '${bucket.name}' created successfully\n`);
    }
  }

  console.log('Storage bucket setup complete!');
}

createBuckets().catch(console.error);
