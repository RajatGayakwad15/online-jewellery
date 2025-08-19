import { useRef, useState } from 'react'

const MainImage = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  let zoomFactor = 2
  // const containerRef = useRef(null)
    const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false)
  const [transformOrigin, setTransformOrigin] = useState('center center')

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   const { left, top, width, height } =
  //     containerRef.current.getBoundingClientRect()
  //   const x = ((e.clientX - left) / width) * 100
  //   const y = ((e.clientY - top) / height) * 100
  //   setTransformOrigin(`${x}% ${y}%`)
  // }
   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return; // Guard against null

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setTransformOrigin(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTransformOrigin('center center')
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: 'zoom-in',
      }}
    >
      <img
        src={src}
        alt='Product'
        className={`block h-full w-full object-contain transition-transform duration-300`}
        style={{
          transform: isHovering ? `scale(${zoomFactor})` : 'scale(1)',
          transformOrigin: transformOrigin,
        }}
      />
    </div>
  )
}

export default MainImage
