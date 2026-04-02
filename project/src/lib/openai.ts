import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function generateWorkout(params: {
  goal: string
  level: string
  equipment: string[]
  daysPerWeek: number
}) {
  const prompt = `Create a ${params.daysPerWeek}-day workout plan for a ${params.level} level person with goal: ${params.goal}. Available equipment: ${params.equipment.join(', ')}. Return as JSON with exercises, sets, reps, and rest periods.`
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1000,
  })
  
  return completion.choices[0]?.message?.content || ''
}

export async function analyzeProgress(workoutHistory: any[]) {
  const prompt = `Analyze this workout history and provide insights on progress, plateaus, and recommendations: ${JSON.stringify(workoutHistory)}`
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
  })
  
  return completion.choices[0]?.message?.content || ''
}

export async function suggestImprovements(exercise: string, currentForm: string) {
  const prompt = `Provide form tips and safety advice for ${exercise}. Current approach: ${currentForm}`
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
  })
  
  return completion.choices[0]?.message?.content || ''
}
