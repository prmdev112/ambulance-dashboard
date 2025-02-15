CREATE TABLE cases (
  id SERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_tc TEXT NOT NULL,
  case_type TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security (RLS) politikaları
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert cases"
  ON cases FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view all cases"
  ON cases FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update cases"
  ON cases FOR UPDATE
  TO authenticated
  USING (true);

