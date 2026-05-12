import { supabase } from './supabase'

// Реєстрація
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

// Вхід
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

// Вихід
export async function signOut() {
  await supabase.auth.signOut()
}

// Поточний юзер
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}