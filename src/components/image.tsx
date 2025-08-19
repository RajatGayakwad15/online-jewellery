import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  fallbackSrc?: string
  className?: string
  imgClassName?: string
  alt?: string
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

const Image: React.FC<ImageProps> = ({
  src,
  fallbackSrc,
  className = '',
  imgClassName = '',
  alt = '',
  fit = 'cover',
  ...props
}) => {
  const [loading, setLoading] = useState(true)
  const [srcError, setSrcError] = useState(false)
  const [fallbackError, setFallbackError] = useState(false)

  const currentSrc = srcError
    ? fallbackError
      ? null
      : fallbackSrc
    : src || fallbackSrc

  const handleError = () => {
    if (!srcError) {
      setSrcError(true)
    } else {
      setFallbackError(true)
    }
    setLoading(false)
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Skeleton loader */}
      {loading && !srcError && !fallbackError && (
        <div className='absolute inset-0 animate-pulse rounded bg-zinc-300/60 dark:bg-zinc-700/60' />
      )}

      {currentSrc ? (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            'h-full w-full transition-opacity',
            loading ? 'opacity-0' : 'opacity-100',
            imgClassName
          )}
          style={{ objectFit: fit }}
          onLoad={() => setLoading(false)}
          onError={handleError}
          {...props}
        />
      ) : (
        <div className='bg-color-95 border-color-97 absolute inset-0 rounded-lg border' />
      )}
    </div>
  )
}

export default Image
