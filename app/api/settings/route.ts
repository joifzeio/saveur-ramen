import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - Get all settings or specific category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase.from('settings').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    const { data: settings, error } = await query.order('key');

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      );
    }

    // Transform array to object for easier access
    const settingsObj: Record<string, string> = {};
    settings.forEach((setting) => {
      settingsObj[setting.key] = setting.value;
    });

    return NextResponse.json({ settings: settingsObj, raw: settings }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { error: 'Invalid settings format' },
        { status: 400 }
      );
    }

    const updates = [];

    // Update each setting
    for (const [key, value] of Object.entries(settings)) {
      const { error: updateError } = await supabase
        .from('settings')
        .update({
          value: value as string,
          updated_at: new Date().toISOString(),
        })
        .eq('key', key);

      if (updateError) {
        console.error(`Error updating setting ${key}:`, updateError);
        updates.push({ key, success: false, error: updateError.message });
      } else {
        updates.push({ key, success: true });
      }
    }

    const allSuccessful = updates.every((u) => u.success);

    if (!allSuccessful) {
      return NextResponse.json(
        {
          success: false,
          message: 'Some settings failed to update',
          updates,
        },
        { status: 207 } // Multi-Status
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'All settings updated successfully',
        updates,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// POST - Create new setting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, category, description } = body;

    if (!key || !value) {
      return NextResponse.json(
        { error: 'Key and value are required' },
        { status: 400 }
      );
    }

    // Check if setting already exists
    const { data: existing } = await supabase
      .from('settings')
      .select('key')
      .eq('key', key)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Setting with this key already exists' },
        { status: 400 }
      );
    }

    const { data: setting, error: insertError } = await supabase
      .from('settings')
      .insert([
        {
          key: key.trim(),
          value: value.trim(),
          category: category || 'general',
          description: description || null,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Database error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create setting' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, setting },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
