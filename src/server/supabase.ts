import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://huzrvybpywrzelmhlvlh.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_GKzkYbXl8wAcBnxYtCJDTA_iXmGUqNt';
export const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID || 'huzrvybpywrzelmhlvlh';

let supabaseClient: SupabaseClient | null = null;

try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false
      }
    });
    console.log('[Brain The Next Devs] Supabase client initialized for project:', SUPABASE_PROJECT_ID);
  }
} catch (err) {
  console.error('[Brain The Next Devs] Failed to initialize Supabase client:', err);
}

export interface BookingAppointmentRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  projectDetails: string;
  status: string;
  createdAt?: string;
}

/**
 * Saves a booking / appointment inquiry into Supabase
 */
export async function saveBookingToSupabase(record: BookingAppointmentRecord): Promise<{ success: boolean; error?: string }> {
  if (!supabaseClient) {
    return { success: false, error: 'Supabase client not initialized' };
  }

  // Format record for standard snake_case schema
  const payload = {
    id: record.id,
    full_name: record.fullName,
    email: record.email,
    phone: record.phone,
    service: record.service,
    budget: record.budget,
    project_details: record.projectDetails,
    status: record.status || 'New',
    created_at: record.createdAt || new Date().toISOString()
  };

  try {
    // Attempt insert into 'bookings' table
    const { error: bookingError } = await supabaseClient
      .from('bookings')
      .insert([payload]);

    if (!bookingError) {
      console.log('[Supabase] Successfully stored booking record:', record.id);
      return { success: true };
    }

    console.warn('[Supabase] Insert to bookings returned:', bookingError.message);

    // If bookings table doesn't exist, try inquiries table
    const { error: inqError } = await supabaseClient
      .from('inquiries')
      .insert([payload]);

    if (!inqError) {
      console.log('[Supabase] Successfully stored in inquiries table:', record.id);
      return { success: true };
    }

    return { success: false, error: bookingError.message || inqError.message };
  } catch (err: any) {
    console.error('[Supabase] Unexpected error saving booking:', err);
    return { success: false, error: err?.message || 'Unknown network error' };
  }
}

/**
 * Checks connection and table presence in Supabase
 */
export async function checkSupabaseStatus(): Promise<{
  connected: boolean;
  projectUrl: string;
  projectId: string;
  tableFound: boolean;
  error?: string;
}> {
  if (!supabaseClient) {
    return {
      connected: false,
      projectUrl: SUPABASE_URL,
      projectId: SUPABASE_PROJECT_ID,
      tableFound: false,
      error: 'Client initialization failed'
    };
  }

  try {
    const { data, error } = await supabaseClient
      .from('bookings')
      .select('id')
      .limit(1);

    if (error) {
      // Table might not exist yet
      if (error.code === 'PGRST205' || error.message.includes('schema cache') || error.message.includes('not find')) {
        return {
          connected: true,
          projectUrl: SUPABASE_URL,
          projectId: SUPABASE_PROJECT_ID,
          tableFound: false,
          error: "Connected to Supabase, but 'bookings' table needs to be created in SQL Editor."
        };
      }
      return {
        connected: true,
        projectUrl: SUPABASE_URL,
        projectId: SUPABASE_PROJECT_ID,
        tableFound: false,
        error: error.message
      };
    }

    return {
      connected: true,
      projectUrl: SUPABASE_URL,
      projectId: SUPABASE_PROJECT_ID,
      tableFound: true
    };
  } catch (err: any) {
    return {
      connected: false,
      projectUrl: SUPABASE_URL,
      projectId: SUPABASE_PROJECT_ID,
      tableFound: false,
      error: err?.message || 'Connection timeout'
    };
  }
}

export { supabaseClient };
