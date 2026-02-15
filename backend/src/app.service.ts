import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://hepmiruoeannzshvxgqr.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlcG1pcnVvZWFubnpzaHZ4Z3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMjM4MTEsImV4cCI6MjA4NjY5OTgxMX0.wc0R2OXKXA9b9Oz4-4rS-7IY9VyeCcaNeqffXYHa_2Q'
    );
  }

  async getMessages() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data;
  }

  async createMessage(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, message }])
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteMessage(id: number) {
    const { error } = await this.supabase
      .from('guestbook')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return { message: 'Deleted successfully' };
  }
}