CREATE TABLE ambulances (
  id SERIAL PRIMARY KEY,
  plate_number TEXT NOT NULL,
  status TEXT NOT NULL,
  last_maintenance TIMESTAMP WITH TIME ZONE NOT NULL,
  equipment TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security (RLS) politikaları
ALTER TABLE ambulances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view ambulances"
  ON ambulances FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert ambulances"
  ON ambulances FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can update ambulances"
  ON ambulances FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

