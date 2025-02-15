CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  start TIMESTAMP WITH TIME ZONE NOT NULL,
  end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security (RLS) politikaları
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert organizations"
  ON organizations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view all organizations"
  ON organizations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update organizations"
  ON organizations FOR UPDATE
  TO authenticated
  USING (true);

