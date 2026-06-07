
CREATE TABLE public.inquiries (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  parent_name text not null,
  mobile text not null,
  email text,
  student_class text not null,
  target_exam text not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) can submit an inquiry
CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read: only service role (backend admin) can read/manage
CREATE INDEX inquiries_created_at_idx ON public.inquiries (created_at DESC);
