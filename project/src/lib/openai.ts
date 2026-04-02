import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function generateWorkout(params: {
  goal: string
  experience: string
  equipment: string[]
  daysPerWeek: number
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a fitness expert. Generate structured workout plans in JSON format.',
      },
      {
        role: 'user',
        content: `Create a ${params.daysPerWeek}-day workout plan for ${params.goal} with ${params.experience} experience level using: ${params.equipment.join(', ')}.`,
      },
    ],
    temperature: 0.7,
  })

  return response.choices[0]?.message?.content
}

export async function analyzeProgress(workoutHistory: any[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a fitness coach. Analyze workout data and provide insights.',
      },
      {
        role: 'user',
        content: `Analyze this workout history and provide insights: ${JSON.stringify(workoutHistory)}`,
      },
    ],
    temperature: 0.5,
  })

  return response.choices[0]?.message?.content
}

export async function suggestImprovements(exercise: string, currentForm: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a fitness trainer. Provide form tips and safety advice.',
      },
      {
        role: 'user',
        content: `Provide form tips for ${exercise}. Current approach: ${currentForm}`,
      },
    ],
    temperature: 0.3,
  })

  return response.choices[0]?.message?.content
}
