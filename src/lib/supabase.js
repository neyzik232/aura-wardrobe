import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://lifmmqezkglfeoepwtvi.supabase.co'
const SUPABASE_KEY = 'sb_publishable_IPCgDZmAsQMI7uIhouTTKg_KpBL_dvY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)