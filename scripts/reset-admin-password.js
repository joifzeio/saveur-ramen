require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function resetPassword() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   Reset Admin Password - Illusion      ║');
  console.log('╚════════════════════════════════════════╝\n');

  const email = 'admin@illusioncafe.com';

  console.log(`Sending password reset email to: ${email}`);
  console.log('Please wait...\n');

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/admin-x7k9p2/reset-password',
  });

  if (error) {
    console.error('\n❌ Error sending reset email:', error.message);
    process.exit(1);
  }

  console.log('✅ Password reset email sent successfully!');
  console.log('\n📧 Check your email inbox for the reset link.');
  console.log('🔗 Click the link to set a new password.');
  console.log('\n⚠️  Note: The email may take a few minutes to arrive.');
  console.log('    Check your spam folder if you don\'t see it.\n');
}

resetPassword().catch((err) => {
  console.error('\n❌ Unexpected error:', err);
  process.exit(1);
});
