import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Xeloria | Create Your Professional Portfolio Site in Minutes",
  description: "Xeloria lets you build a stunning, hosted personal portfolio website. Enter your profile, choose a beautiful theme, and share your live link instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window === 'undefined') return;
                  
                  // Standardize matchMedia implementation for all environments
                  const patchMQL = (mql) => {
                    if (!mql) return mql;
                    if (!mql.addListener) mql.addListener = function(cb) { if(this.onchange) this.onchange(cb); };
                    if (!mql.removeListener) mql.removeListener = function() {};
                    if (!mql.addEventListener) mql.addEventListener = function(type, cb) { if(type === 'change') this.onchange = cb; };
                    if (!mql.removeEventListener) mql.removeEventListener = function() {};
                    if (!mql.dispatchEvent) mql.dispatchEvent = () => true;
                    return mql;
                  };

                  const matchMediaPolyfill = function(query) {
                    return patchMQL({
                      matches: false,
                      media: query,
                      onchange: null,
                    });
                  };

                  try {
                    // Always ensure window.matchMedia exists and returns a patched MQL
                    const originalMatchMedia = window.matchMedia;
                    Object.defineProperty(window, 'matchMedia', {
                      value: function(query) {
                        let mql;
                        try {
                          mql = originalMatchMedia ? originalMatchMedia.call(window, query) : null;
                        } catch (e) {
                          mql = null;
                        }
                        if (!mql) return matchMediaPolyfill(query);
                        return patchMQL(mql);
                      },
                      writable: true,
                      configurable: true
                    });
                  } catch (e) {
                    // Fallback to direct assignment if defineProperty fails
                    window.matchMedia = window.matchMedia || matchMediaPolyfill;
                  }

                  if (window.MediaQueryList && window.MediaQueryList.prototype) {
                    patchMQL(window.MediaQueryList.prototype);
                  }
                } catch (e) {
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans min-h-full flex flex-col`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
