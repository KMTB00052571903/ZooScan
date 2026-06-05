import Boom from '@hapi/boom'
import { supabase } from '../../config/supabase'
import type { Animal } from './animals.types'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export const getAnimalsService = async (): Promise<Animal[]> => {
  console.log('[animals.service] SUPABASE_URL:', process.env.SUPABASE_URL?.slice(0, 40))
  console.log('[animals.service] SUPABASE_KEY exists:', !!process.env.SUPABASE_KEY)
  console.log('[animals.service] SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

  const { data, error } = await supabase.from('animals').select('*')
  console.log('[animals.service] getAnimalsService result:', data?.length ?? 0, 'error:', error?.message ?? 'ok')

  if (error) throw Boom.badImplementation(error.message)
  return (data ?? []) as Animal[]
}

export const getAnimalByIdService = async (id: string): Promise<Animal> => {
  const { data, error } = await supabase
    .from('animals')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) throw Boom.notFound('Animal not found')
  return data as Animal
}

export const getAnimalFunFactsService = async (id: string): Promise<string[]> => {
  const animal = await getAnimalByIdService(id)

  const response = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [
      {
        role: 'user',
        content: `Genera 3 datos curiosos sobre ${animal.name} (${animal.species}) en español, cada uno de máximo 20 palabras`,
      },
    ],
    max_tokens: 200,
  })

  const text = response.choices[0]?.message?.content ?? ''
  const facts = text
    .split('\n')
    .filter((line) => line.trim().match(/^\d+[.)]/))
    .map((line) => line.replace(/^\d+[.)]\s*/, '').trim())
    .filter(Boolean)

  return facts.length > 0 ? facts : ['No se pudieron generar datos curiosos']
}
