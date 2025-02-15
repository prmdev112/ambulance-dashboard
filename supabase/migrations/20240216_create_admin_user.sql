-- Admin kullanıcısı oluştur
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, role)
VALUES ('admin@example.com', crypt('güçlü_bir_şifre', gen_salt('bf')), now(), 'authenticated')
ON CONFLICT (email) DO NOTHING;

-- Kullanıcı profilini oluştur ve admin rolünü ata
INSERT INTO public.user_profiles (id, role, full_name)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@example.com'),
  'admin',
  'Admin User'
)
ON CONFLICT (id) DO UPDATE SET role = 'admin';

