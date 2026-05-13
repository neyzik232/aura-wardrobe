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

// Скидання пароля
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://neyzik232.github.io/aura-wardrobe',
  })
  return { data, error }
}

// Google OAuth
export async function signInWithGoogle() {
  const isProd = window.location.hostname !== 'localhost'
  const redirectTo = isProd
    ? 'https://neyzik232.github.io/aura-wardrobe'
    : `${window.location.origin}/aura-wardrobe`
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })
  return { data, error }
}