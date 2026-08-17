import { Suspense } from "react"
import Image from "next/image"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import AnnouncementBar from "@modules/layout/components/announcement-bar"
import SideMenu from "@modules/layout/components/side-menu"

const SearchField = ({ className = "" }: { className?: string }) => (
  <form action="/store" method="get" className={className}>
    <div className="relative w-full">
      <input
        type="search"
        name="q"
        placeholder="Zoek naar producten..."
        aria-label="Zoek naar producten"
        className="w-full h-9 pl-4 pr-10 rounded-full text-sm text-grey-80 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-spd-cream"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-spd-green"
        aria-label="Zoeken"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </button>
    </div>
  </form>
)

export default async function Nav() {
  const [regions, locales, currentLocale, categories] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCategories().catch(() => []),
  ])

  const topLevelCategories = (categories ?? [])
    .filter((c) => !c.parent_category)
    .slice(0, 6)

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <AnnouncementBar />
      <header className="relative mx-auto border-b border-spd-green-dark duration-200 bg-spd-green">
        <nav className="content-container txt-xsmall-plus text-white flex items-center justify-between w-full h-16 text-small-regular gap-4">
          <div className="flex items-center h-full shrink-0 gap-x-3">
            <div className="small:hidden h-full flex items-center">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
                categories={categories ?? []}
              />
            </div>
            <LocalizedClientLink
              href="/"
              data-testid="nav-store-link"
              className="flex items-center"
            >
              <Image
                src="/images/logo.png"
                alt="SmartPowerDeals"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </LocalizedClientLink>
          </div>

          <SearchField className="hidden small:flex flex-1 max-w-md mx-4" />

          <div className="flex items-center gap-x-6 h-full shrink-0">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-spd-cream text-white transition-colors text-sm"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-spd-cream text-white flex gap-2 transition-colors text-sm"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Winkelwagen (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>

        <div className="small:hidden border-t border-spd-green-light bg-spd-green">
          <div className="content-container py-2">
            <SearchField />
          </div>
        </div>

        {topLevelCategories.length > 0 && (
          <div className="hidden small:block border-t border-spd-green-light bg-spd-green">
            <nav className="content-container flex items-center gap-6 h-10 text-xs text-white/90">
              <LocalizedClientLink
                href="/store"
                className="hover:text-spd-cream transition-colors"
              >
                Alle producten
              </LocalizedClientLink>
              {topLevelCategories.map((category) => (
                <LocalizedClientLink
                  key={category.id}
                  href={`/categories/${category.handle}`}
                  className="hover:text-spd-cream transition-colors"
                >
                  {category.name}
                </LocalizedClientLink>
              ))}
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}
