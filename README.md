# Xeloria (SummitCV)

Xeloria is a premium, AI-powered portfolio and resume builder platform built with Next.js, Tailwind CSS, Supabase, and Clerk.

## Features

- **Dynamic Resume Builder**: Craft professional resumes with a variety of premium, elegant, and minimal templates.
- **Automated AI Assistant**: Built-in AI generation for summaries, work experience, and blog articles using Groq/Grok.
- **Portfolio Hub**: Instantly generate a stunning public portfolio site (`summitcv.io/p/@username`) using customizable themes.
- **Secure Authentication**: User management handled securely by Clerk.
- **Database & Storage**: Powered by Supabase for real-time data persistence.
- **Asset Integration**: Pexels API integration for beautiful cover images and media.
- **Admin Dashboard**: Comprehensive super admin controls for monitoring users, blogs, and platform health.

## Getting Started

First, clone the repository and install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

To run the project locally or deploy it to Vercel, you need to configure the following environment variables in a `.env.local` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database & Auth
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# External APIs
NEXT_PUBLIC_PEXELS_API_KEY=your_pexels_api_key
RESEND_API_KEY=your_resend_api_key

# AI Providers
GROQ_API_KEY=your_groq_api_key
GROK_API_KEY=your_grok_api_key

# Security
CRON_SECRET=your_custom_cron_secret
```

### Running the Development Server

Start the application locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Make sure to add **all of the Environment Variables** listed above into your Vercel Project Settings -> Environment Variables section.
4. Click Deploy!
