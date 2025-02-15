-- Admin kullanıcısı oluştur
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES (
  gen_random_uuid(), -- Yeni bir UUID oluştur
  'info@antwebsoft.com',
  crypt('Ali veli4950**', gen_salt('bf')),
  now(),
  'authenticated'
)
ON CONFLICT (email) DO NOTHING;

-- Kullanıcı profilini oluştur ve admin rolünü ata
INSERT INTO public.user_profiles (id, role, full_name)
SELECT id, 'admin', 'Admin User'
FROM auth.users
WHERE email = 'info@antwebsoft.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

