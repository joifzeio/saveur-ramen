require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials not found in .env.local');
  console.error('Please make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdminUser() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  Create Admin User - Illusion Cafe     ║');
  console.log('╚════════════════════════════════════════╝\n');

  try {
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password (min 8 characters): ');

    if (password.length < 8) {
      console.error('\n❌ Error: Password must be at least 8 characters long');
      rl.close();
      process.exit(1);
    }

    console.log('\n🔄 Creating admin user...');

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });

    if (error) {
      console.error('\n❌ Error creating admin user:', error.message);
      rl.close();
      process.exit(1);
    }

    console.log('\n✅ Admin user created successfully!');
    console.log('\n📧 Email:', email);
    console.log('🔗 Login at: http://localhost:3000/admin-x7k9p2/login');
    console.log('\n⚠️  IMPORTANT: Keep your credentials secure!');

    rl.close();
  } catch (err) {
    console.error('\n❌ Unexpected error:', err);
    rl.close();
    process.exit(1);
  }
}

createAdminUser();
