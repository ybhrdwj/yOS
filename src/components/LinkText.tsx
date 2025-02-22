import Image from 'next/image'

type ImageProps = {
  src: string
  alt: string
}

type LinkTextProps = {
  // Different possible variants
  variant: 'single-image-link' | 'image-stack' | 'single-image-text'
  // Main text content
  text: string
  // Optional link URL (for variants that need it)
  href?: string
  // Single image or array of images
  images: ImageProps | ImageProps[]
  // Optional className for custom styling
  className?: string
  // New prop for border
  withBorder?: boolean
}

export function LinkText({ variant, text, href, images, className = '', withBorder = false }: LinkTextProps) {
  const imageSize = 18 // Increased from 16px to 18px

  const renderImage = (image: ImageProps) => (
    <div className="flex h-4 items-center">
      <Image
        src={image.src}
        alt={image.alt}
        width={imageSize}
        height={imageSize}
        className={`rounded-full object-contain ${withBorder ? 'border border-gray-300' : ''}`}
      />
    </div>
  )

  switch (variant) {
    case 'single-image-link':
      return (
        <div className={`inline-flex items-center gap-1.5 ${className}`}>
          {renderImage((images as ImageProps))}
          <a href={href} className="group inline-flex items-center gap-0.5">
            <span className="border-b border-gray-300 leading-none group-hover:border-gray-400">{text}</span>
            <svg 
              className="relative h-4 w-4 text-gray-400 transition-all group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      )

    case 'image-stack':
      return (
        <div className={`inline-flex items-center gap-1.5 ${className}`}>
          <div className="flex -space-x-1">
            {(images as ImageProps[]).map((image, index) => (
              <div key={index} className="relative">
                {renderImage(image)}
              </div>
            ))}
          </div>
          <span>{text}</span>
        </div>
      )

    case 'single-image-text':
      return (
        <div className={`inline-flex items-center gap-1.5 ${className}`}>
          {renderImage((images as ImageProps))}
          <span>{text}</span>
        </div>
      )

    default:
      return null
  }
} 