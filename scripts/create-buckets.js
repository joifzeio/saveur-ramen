require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createBuckets() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  Create Storage Buckets - Illusion     ║');
  console.log('╚════════════════════════════════════════╝\n');

  const buckets = [
    { name: 'menu-images', description: 'Images for menu items' },
    { name: 'blog-images', description: 'Images for blog posts' },
    { name: 'event-images', description: 'Images for events' }
  ];

  let successCount = 0;
  let existsCount = 0;
  let errorCount = 0;

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
        existsCount++;
      } else {
        console.error(`✗ Error creating '${bucket.name}':`, error.message, '\n');
        errorCount++;
      }
    } else {
      console.log(`✓ Bucket '${bucket.name}' created successfully\n`);
      successCount++;
    }
  }

  console.log('════════════════════════════════════════');
  console.log(`✓ Created: ${successCount}`);
  console.log(`✓ Already Exists: ${existsCount}`);
  if (errorCount > 0) {
    console.log(`✗ Errors: ${errorCount}`);
  }
  console.log('════════════════════════════════════════');
  console.log('\n✅ Storage bucket setup complete!');
}

createBuckets().catch((err) => {
  console.error('\n❌ Unexpected error:', err);
  process.exit(1);
});
