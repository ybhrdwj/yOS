# **yOS**

A simple personal website stack 

## Built With

1. [NextJS](https://nextjs.org/): React framework for building fast, SEO-friendly websites 
2. [Tailwind](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development
3. [Vercel](https://vercel.com/): Zero-configuration hosting platform with global edge network
4. [Posthog](https://posthog.com/): Open-source product analytics with privacy focus

## Getting Started

Clone the repository to get started:

```bash
git clone https://github.com/yourusername/yOS.git
cd yOS
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```
# OpenWeather API
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key_here
```

You'll need to:
1. Register for an [OpenWeather API key](https://openweathermap.org/api)
2. Create a [PostHog](https://posthog.com/) account and project to get your API key

## How It Works

This website doesn't have a backend despite having complex items like Projects and Blog, which are usually handled by a CMS. Everything is managed through files in the codebase:

### Content Management

#### Blog Posts
Add your posts under `src/content/posts/` as MDX files. Each post should include frontmatter with metadata such as:

```mdx
---
title: "Your Post Title"
date: "2023-04-20"
description: "A short description of your post"
category: "Technology" 
---

Your content here using Markdown and React components...
```

##### Dynamic OpenGraph Images

The site features automatic OpenGraph image generation for blog posts. When a blog post is viewed, a custom image is dynamically generated for social media sharing with the following features:

- Post title, category, and date displayed on a branded template
- Your profile picture and social handle included
- Custom styling and layout for optimal social media visibility

This functionality is implemented in:
- `src/app/api/og/route.tsx`: The OpenGraph image generation API endpoint
- `src/app/writing/[slug]/page.tsx`: Where the OpenGraph metadata is defined for each post

To customize the OpenGraph images:
1. Update your profile picture at `public/logos/yb.jpg`
2. Modify the design in `src/app/api/og/route.tsx` to match your branding
3. Ensure your posts have proper frontmatter with title, category, and date

The OpenGraph URL is dynamically generated with the format:
```
/api/og?slug=your-post-slug&title=Your+Post+Title&category=Technology&date=2023-04-20
```

#### Projects
Update `src/data/projects.json` to manage project information displayed on your website. The file structure is:

```json
{
  "title": "PROJECTS",
  "projects": [
    {
      "logo": "/logos/project.png",
      "name": "Project Name",
      "url": "project-url.com",
      "description": "Short description of the project"
    },
  ]
}
```

Simply add your projects to the `projects` array with the required information.

### Homepage and Data Management

The `src/data/` directory contains JSON files that manage content displayed throughout the site:
- `blog.json`: Configuration for the blog section
- Other data files can be added to manage different parts of the site

### Weather Widget

The weather widget pulls real-time weather data based on geographic coordinates. Customize it by modifying the latitude and longitude in `src/components/Weather.tsx`:

```typescript
// Mumbai coordinates (default)
const lat = 19.0760
const lon = 72.8777
```

Change these values to display weather for your preferred location.

### Analytics with PostHog

The site uses [PostHog](https://posthog.com/) for privacy-focused analytics:

- Events are automatically captured (page views, etc.)
- PostHog client is configured in `src/components/PostHogProvider.tsx`
- Analytics will be enabled when you provide your PostHog API key in `.env.local`

## Deployment

For the simplest deployment experience:

1. Push your repository to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Vercel will automatically deploy your site and update it on every push to your main branch 
