import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import "styles/storefront.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "SmartPowerDeals",
    template: "%s — SmartPowerDeals",
  },
  description:
    "Laadkabels, mobiele laders, laadpunten en energie voor thuis. Ontdek het assortiment van SmartPowerDeals.",
  openGraph: {
    siteName: "SmartPowerDeals",
    type: "website",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="nl" data-mode="light">
      <body className="spd-app">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
