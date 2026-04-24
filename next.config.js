/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';

    // ─── Trusted external domains ─────────────────────────────────────────────
    // Keep this list minimal. Add a domain only when it is strictly needed.
    const CLOUDFLARE_TURNSTILE = 'https://challenges.cloudflare.com';
    const VERCEL_ANALYTICS_SCRIPT = 'https://va.vercel-scripts.com';
    const VERCEL_ANALYTICS_BEACON = 'https://vitals.vercel-insights.com';
    const UPSTASH = 'https://*.upstash.io';

    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      // Images: self + inline data URIs only (no wildcard https:).
      "img-src 'self' data:",
      // Scripts: self + inline (required by Next.js SSR) + Turnstile + Vercel Analytics.
      // unsafe-eval is kept only in development for hot-reload.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} ${CLOUDFLARE_TURNSTILE} ${VERCEL_ANALYTICS_SCRIPT}`,
      // Styles: self + inline (Tailwind/framer-motion inject inline styles).
      "style-src 'self' 'unsafe-inline'",
      // Fonts: Next.js self-hosts Google Fonts at build time → no external domain needed.
      "font-src 'self' data:",
      // Connections: self + bot-check + analytics + Upstash Redis.
      `connect-src 'self' ${CLOUDFLARE_TURNSTILE} ${VERCEL_ANALYTICS_BEACON} ${UPSTASH}`,
      // Frames: Turnstile renders in an iframe.
      `frame-src ${CLOUDFLARE_TURNSTILE}`,
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
