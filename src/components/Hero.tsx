import Image from 'next/image'
import { LinkText } from './LinkText'

export function Hero() {
  return (
    <div className="mx-auto grid w-[1084px] grid-cols-12 gap-5 py-16">
      {/* One column gap at start */}
      <div className="col-span-1" />
      
      {/* Main content - 7 columns */}
      <div className="col-span-7 space-y-12">
        {/* Welcome paragraph */}
        <p className="text-base text-gray-600 dark:text-gray-400">
          Hello! I&apos;m Yash and you&apos;re currently exploring my tiny <br />
          corner of the internet. I use this space to project my ideas <br />
          and express my obsessions.
        </p>

        {/* Summary section */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium uppercase text-gray-400">Summary</h2>
          <ul className="list-disc space-y-2 pl-4 text-gray-600 dark:text-gray-400 [&>li::marker]:text-gray-300">
            <li>
              Currently I&apos;m moving rectangles at{' '}
              <LinkText
                variant="single-image-link"
                text="Solana"
                href="https://solana.com"
                images={{ src: "/logos/solana.png", alt: "Solana" }}
                withBorder
              />
            </li>
            <li>
              Previously I was designing for{' '}
              <LinkText
                variant="single-image-link"
                text="Balaji"
                href="https://x.com/balajis"
                images={{ src: "/logos/balaji.png", alt: "Balaji" }}
                withBorder
              />
              {' '}&{' '}
              <LinkText
                variant="single-image-link"
                text="Network State"
                href="https://ns.com"
                images={{ src: "/logos/ns.png", alt: "Network State" }}
                withBorder
              />
            </li>
            <li>I&apos;ve worked for 220 companies since 2016</li>
            <li>25 years old, based in Bombay</li>
            <li>Built the first meme network of India to 16M followers</li>
            <li>I write a pretty smart newsletter called Product Hacks</li>
          </ul>
        </div>

        {/* Social and Music - placeholder icons for now */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-600">Email</a>
            <a href="#" className="text-gray-400 hover:text-gray-600">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-gray-600">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-gray-600">GitHub</a>
          </div>
          <button className="flex items-center gap-2 text-gray-400">
            <span>Listening to Dissolve</span>
          </button>
        </div>
      </div>

      {/* Image - 3 columns */}
      <div className="col-span-3">
        <Image
          src="/yb-hero.jpg"
          alt="Yash Bhardwaj"
          width={400}
          height={400}
          className="rounded-lg"
          priority
        />
      </div>

      {/* One column gap at end */}
      <div className="col-span-1" />
    </div>
  )
} 