import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://thtiqavkmsgftlztikre.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodGlxYXZrbXNnZnRsenRpa3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDc5MDMsImV4cCI6MjA2MDU4MzkwM30.nLQCC5JGyUI6Yb2v1HNwaqqPCULJx9iXE-vRHkHdbA4' 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)