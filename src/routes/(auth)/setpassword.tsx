import Setpassword from '@/features/auth/setpassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/setpassword')({
  component: Setpassword,
})


