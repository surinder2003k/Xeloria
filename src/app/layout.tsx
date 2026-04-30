import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const BASE_URL = "https://summitcv.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Xeloria | Architect Your Professional DNA",
    template: "%s | Xeloria",
  },
  description:
    "Xeloria lets you build a stunning, high-performance professional portfolio site in minutes. Synchronize your career narrative and deploy your legacy instantly with AI-powered tools.",
  keywords: [
    "portfolio builder",
    "resume builder",
    "professional portfolio",
    "AI resume",
    "career site",
    "personal website",
    "portfolio website",
    "Xeloria",
    "job seeker tools",
    "online resume",
    "developer portfolio",
    "free portfolio builder",
  ],
  authors: [{ name: "Xeloria", url: BASE_URL }],
  creator: "Xeloria",
  publisher: "Xeloria",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Xeloria",
    title: "Xeloria | Architect Your Professional DNA",
    description:
      "Build a stunning, AI-powered professional portfolio in minutes. Synchronize your career narrative and deploy your legacy instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xeloria — Architect Your Professional DNA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xeloria | Architect Your Professional DNA",
    description:
      "Build a stunning, AI-powered professional portfolio in minutes. Deploy your professional legacy instantly.",
    images: ["/og-image.png"],
    creator: "@xeloriaio",
    site: "@xeloriaio",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
  verification: {
    google: "7DDDhNUg6jYfqTlpcjhcRviMdzzUvxJd2Y-rKmNEqdk",
  },
  other: {
    "google-adsense-account": "ca-pub-XXXXXXXXXXXXXXXX", // The user will replace this with their actual Publisher ID
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#050505" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          id="match-media-polyfill"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                var originalMatchMedia = window.matchMedia;
                window.matchMedia = function(query) {
                  var mql = originalMatchMedia ? originalMatchMedia(query) : null;
                  
                  // Ensure mql is always an object with required methods
                  if (!mql || typeof mql !== 'object') {
                    mql = {
                      matches: false,
                      media: query,
                      onchange: null,
                      addListener: function() {},
                      removeListener: function() {},
                      addEventListener: function() {},
                      removeEventListener: function() {},
                      dispatchEvent: function() { return false; },
                    };
                  }

                  // Add legacy support if missing
                  if (!mql.addListener) {
                    mql.addListener = function(fn) { 
                      if (mql.addEventListener) mql.addEventListener('change', fn); 
                    };
                  }
                  if (!mql.removeListener) {
                    mql.removeListener = function(fn) { 
                      if (mql.removeEventListener) mql.removeEventListener('change', fn); 
                    };
                  }
                  
                  return mql;
                };
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans min-h-full flex flex-col bg-[#050505] text-white selection:bg-indigo-500 selection:text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "Xeloria",
                  description:
                    "AI-powered professional portfolio and resume builder.",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                  inLanguage: "en-US",
                },
                {
                  "@type": "SoftwareApplication",
                  name: "Xeloria",
                  url: BASE_URL,
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  description:
                    "Build a stunning, AI-powered professional portfolio and resume in minutes.",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  creator: {
                    "@type": "Organization",
                    name: "Xeloria",
                    url: BASE_URL,
                  },
                },
              ],
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
