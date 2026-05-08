
-- Stricter INSERT policy for appointments (no longer "true")
DROP POLICY "Anyone can create appointments" ON public.appointments;

CREATE POLICY "Anyone can submit valid appointment"
  ON public.appointments FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(patient_name) BETWEEN 2 AND 80
    AND patient_phone ~ '^(\+?254|0)?[17][0-9]{8}$'
    AND appointment_date >= CURRENT_DATE
    AND payment_method IN ('mpesa','cash','insurance')
    AND status = 'pending'
  );

-- Lock down has_role execution
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

-- Set search_path on trigger function
ALTER FUNCTION public.set_updated_at() SET search_path = public;
