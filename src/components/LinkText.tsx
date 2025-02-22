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
  const imageSize = 18

  const renderImage = (image: ImageProps) => (
    <div className="flex h-[18px] items-center">
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
        <div className={`inline-flex items-center ${className}`}>
          {renderImage((images as ImageProps))}
          <a 
            href={href} 
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-0.5 ml-1.5"
          >
            <span className="inline-block border-b border-gray-300 leading-[1.15] group-hover:border-gray-400">{text}</span>
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
        <div className={`inline-flex items-center ${className}`}>
          <div className="flex -space-x-1.5">
            {(images as ImageProps[]).map((image, index) => (
              <div key={index} className="group relative flex h-[18px] items-center">
                <div className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 transform whitespace-nowrap rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white group-hover:block">
                  {image.alt}
                </div>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={imageSize}
                  height={imageSize}
                  className="rounded-full object-contain ring-1 ring-white"
                />
              </div>
            ))}
          </div>
          <span className="ml-1.5 leading-tight">{text}</span>
        </div>
      )

    case 'single-image-text':
      return (
        <div className={`inline-flex items-center ${className}`}>
          {renderImage((images as ImageProps))}
          <span className="ml-1.5 leading-tight">{text}</span>
        </div>
      )

    default:
      return null
  }
} 