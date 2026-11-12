// The public origin for canonical URLs, the sitemap and robots.txt. Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every
// build (preview builds too), so links always point at production, custom domain included.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const NAME = 'Ruben Costa'
export const EMAIL = 'rubencosta.dev.2004@gmail.com'
export const GITHUB = 'https://github.com/Ice-San'
export const LINKEDIN = 'https://www.linkedin.com/in/devrubencosta/'
