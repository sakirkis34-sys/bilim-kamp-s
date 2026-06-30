
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  ad_soyad text NOT NULL,
  tc_no text NOT NULL,
  dogum_tarihi text NOT NULL,
  dogum_yeri text NOT NULL,
  cinsiyet text NOT NULL,
  telefon text NOT NULL,
  veli_ad_soyad text NOT NULL,
  veli_telefon text NOT NULL,
  email text NOT NULL,
  ev_adresi text NOT NULL,
  sinif text NOT NULL,
  okul_giris_puani text NOT NULL,
  not_ortalamasi text NOT NULL,
  brans text NOT NULL,
  not_metni text,
  status text NOT NULL DEFAULT 'yeni'
);

GRANT INSERT ON public.applications TO anon;
GRANT INSERT ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
  ON public.applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX applications_created_at_idx ON public.applications (created_at DESC);
