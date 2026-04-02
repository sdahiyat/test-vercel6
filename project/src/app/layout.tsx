import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitForge - AI-Powered Workout Planning & Social Fitness',
  description: 'Create personalized workout plans, track progress, and connect with a community of fitness enthusiasts. Get AI-powered coaching and achieve your fitness goals.',
  keywords: 'fitness, workout, AI, planning, social, tracking, exercise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
