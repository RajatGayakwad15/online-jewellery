'use client'

import GeneralError from '@/features/errors/general-error'

export default function ErrorPage({
  error: _error,
  reset: _reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <GeneralError />
}
