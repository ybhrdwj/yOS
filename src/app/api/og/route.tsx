import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const title = searchParams.get('title')
    const category = searchParams.get('category')
    const date = searchParams.get('date')

    // Get the base URL from the request
    const baseUrl = new URL(request.url).origin

    // Generate the text content that will use the font
    const textContent = `${title || 'Writing'}${category || ''}${date || ''}@ybhrdwj`

    // Load the fonts with the exact text content we'll use
    const [interRegular, interSemiBold] = await Promise.all([
      loadGoogleFont('Inter', textContent),
      loadGoogleFont('Inter:wght@600', textContent),
    ])

    // If no slug is provided, generate a default OG image
    if (!slug) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              padding: '80px',
              backgroundColor: 'white',
              position: 'relative',
              fontFamily: 'Inter',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${baseUrl}/logos/yb.jpg`}
                  alt="Yash Bhardwaj"
                  width={48}
                  height={48}
                  style={{
                    borderRadius: '50%',
                  }}
                />
                <span style={{ 
                  fontSize: '24px', 
                  color: '#6b7280',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                }}>@ybhrdwj</span>
              </div>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 600,
                  color: '#111827',
                  lineHeight: 1.2,
                  margin: 0,
                  maxWidth: '800px',
                  letterSpacing: '-0.02em',
                }}
              >
                Writing
              </h1>
            </div>
            {/* Dots pattern on the right */}
            <div
              style={{
                position: 'absolute',
                right: '40px',
                top: '40px',
                width: '200px',
                height: '200px',
                backgroundImage: 'radial-gradient(circle at 16px 16px, #e5e7eb 4px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>
        ),
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: 'Inter',
              data: interRegular,
              weight: 400,
              style: 'normal',
            },
            {
              name: 'Inter',
              data: interSemiBold,
              weight: 600,
              style: 'normal',
            },
          ],
        },
      )
    }

    // Generate OG image for a specific post
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '80px',
            backgroundColor: 'white',
            position: 'relative',
            fontFamily: 'Inter',
          }}
        >
          {/* Header with profile and arrow */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%',
          }}>
            {/* Profile and handle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${baseUrl}/logos/yb.jpg`}
                alt="Yash Bhardwaj"
                width={48}
                height={48}
                style={{
                  borderRadius: '50%',
                }}
              />
              <span style={{ 
                fontSize: '24px', 
                color: '#6b7280',
                fontFamily: 'Inter',
                fontWeight: 400,
              }}>@ybhrdwj</span>
            </div>

            {/* Arrow */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ transform: 'rotate(-45deg)', marginRight: '-20px' }}>
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            maxWidth: '700px',
          }}>
            {/* Pill with pen icon */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'white',
              border: '1px solid #e5e7eb', // gray-200
              borderRadius: '9999px',
              padding: '8px 16px',
              width: '120px',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ 
                fontSize: '24px',
                color: '#9ca3af', // gray-400
                fontWeight: 500,
              }}>Essay</span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 600,
                color: '#111827',
                lineHeight: 1.2,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>

            {/* Category and date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontSize: '20px', 
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                fontWeight: 400,
              }}>
                {category}
              </span>
              <span style={{ fontSize: '20px', color: '#6b7280' }}>•</span>
              <span style={{ 
                fontSize: '20px', 
                color: '#6b7280', 
                fontWeight: 400 
              }}>{date}</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: interSemiBold,
            weight: 600,
            style: 'normal',
          },
        ],
      },
    )
  } catch (e: unknown) {
    console.log(`${(e as Error).message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
} 