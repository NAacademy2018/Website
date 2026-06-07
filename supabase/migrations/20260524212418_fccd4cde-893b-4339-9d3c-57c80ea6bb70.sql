
DROP POLICY "Anyone can submit inquiries" ON public.inquiries;

CREATE POLICY "Anyone can submit valid inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(student_name) BETWEEN 1 AND 120
  AND length(parent_name) BETWEEN 1 AND 120
  AND length(mobile) BETWEEN 7 AND 20
  AND (email IS NULL OR length(email) <= 200)
  AND length(student_class) BETWEEN 1 AND 40
  AND length(target_exam) BETWEEN 1 AND 40
  AND (message IS NULL OR length(message) <= 2000)
);
