'use client'

import { useEffect, useState } from 'react'

interface MDXContentProps {
  content: string
}

// Enhanced markdown-to-HTML converter matching original prose styles
function parseMarkdown(content: string): string {
  // Split content into paragraphs (double line breaks)
  const paragraphs = content.split('\n\n').filter(p => p.trim())
  
  return paragraphs.map(paragraph => {
    let html = paragraph.trim()
    
    // Convert headers
    if (html.startsWith('### ')) {
      return `<h3>${html.replace(/^### /, '')}</h3>`
    }
    if (html.startsWith('## ')) {
      return `<h2>${html.replace(/^## /, '')}</h2>`
    }
    if (html.startsWith('# ')) {
      return `<h1>${html.replace(/^# /, '')}</h1>`
    }
    
    // Convert bold and italic
    html = html
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    
    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Convert single line breaks to spaces (preserve paragraph flow)
    html = html.replace(/\n/g, ' ')
    
    // Wrap non-header content in paragraphs
    if (!html.startsWith('<h')) {
      html = `<p>${html}</p>`
    }
    
    return html
  }).join('\n')
}

export function MDXContent({ content }: MDXContentProps) {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    const parsed = parseMarkdown(content)
    setHtmlContent(parsed)
  }, [content])

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className="mdx-content w-full overflow-x-auto space-y-6 text-gray-600
        [&_p]:text-[16px] [&_p]:leading-[28px] [&_p]:text-gray-600 [&_p]:mb-6
        [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900
        [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold
        [&_ol]:pl-0 [&_ol]:my-6 [&_ol]:list-decimal
        [&_ol]:text-[16px] [&_ol]:leading-[28px]
        [&_ol]:list-decimal 
        [&_ol>li]:pl-2 [&_ol>li]:ml-4 [&_ol>li]:mb-2
        [&_ol>li::marker]:text-gray-600
        [&_strong]:font-medium [&_strong]:text-gray-900
        [&_pre]:overflow-x-auto [&_pre]:max-w-full
        [&_img]:max-w-full
        [&_table]:overflow-x-auto [&_table]:max-w-full
        [&_code]:break-words
        [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:underline"
    />
  )
}