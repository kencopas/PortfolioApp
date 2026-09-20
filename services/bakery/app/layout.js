import "./globals.css";

const siteUrl = "https://velvetpawbakery.com";
const description = "Velvet Paw Bakery — coming soon.";
const logo = {
  "@type": "ImageObject",
  url: `${siteUrl}/logo-circle.png`,
  width: 1024,
  height: 1024,
};
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Velvet Paw Bakery",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Velvet Paw Bakery",
      url: siteUrl,
      logo,
    },
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Velvet Paw Bakery",
  description,
  alternates: { canonical: `${siteUrl}/` },
  icons: {
    icon: { url: "/favicon.png", type: "image/png", sizes: "96x96" },
    shortcut: "/favicon.png",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: "Velvet Paw Bakery",
    description,
    url: `${siteUrl}/`,
    siteName: "Velvet Paw Bakery",
    type: "website",
    images: [{ url: "/logo-circle.png", width: 1024, height: 1024, alt: "Velvet Paw Bakery logo" }],
  },
  twitter: {
    card: "summary",
    title: "Velvet Paw Bakery",
    description,
    images: ["/logo-circle.png"],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
