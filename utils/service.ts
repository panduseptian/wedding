import { createClient } from "@supabase/supabase-js";

export const client = createClient(
  "https://svofwaehgahoiwfadvkp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2b2Z3YWVoZ2Fob2l3ZmFkdmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwMjE3MTYsImV4cCI6MjAwMDU5NzcxNn0.y1aroIfdiNF9ZwJEwVl9CFSuBNqArcIgI6JdZSqeMxc"
);
