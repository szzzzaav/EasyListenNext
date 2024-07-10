import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ldggoeiltbtpogdzcfwa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZ2dvZWlsdGJ0cG9nZHpjZndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk3MTY5MTIsImV4cCI6MjAzNTI5MjkxMn0.3oNZsIQugC-t3PjYev77-4Z6dRDZoSRacmG4QDoWs40";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export { supabaseUrl };
