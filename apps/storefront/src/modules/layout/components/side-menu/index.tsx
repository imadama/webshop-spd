"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"

const generalLinks = [
  { label: "Alle producten", href: "/store" },
  { label: "Mijn account", href: "/account" },
  { label: "Winkelwagen", href: "/cart" },
]

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  categories: HttpTypes.StoreProductCategory[] | null
}

const SideMenu = ({
  regions,
  locales,
  currentLocale,
  categories,
}: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  const topLevelCategories =
    categories?.filter((c) => !c.parent_category) ?? []

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center gap-x-2 transition-colors ease-out duration-200 focus:outline-none text-white hover:text-spd-cream"
                  aria-label="Menu openen"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-black/40"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-x-4"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-4"
              >
                <PopoverPanel className="flex flex-col fixed inset-y-0 left-0 w-[85vw] max-w-sm z-[51] text-sm">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-spd-green overflow-y-auto"
                  >
                    <div className="flex items-center justify-between px-6 h-16 border-b border-spd-green-dark shrink-0">
                      <span className="text-white font-semibold">Menu</span>
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="text-white hover:text-spd-cream transition-colors"
                        aria-label="Menu sluiten"
                      >
                        <XMark />
                      </button>
                    </div>

                    <div className="px-6 py-5 border-b border-spd-green-dark">
                      <form action="/store" method="get">
                        <div className="relative w-full">
                          <input
                            type="search"
                            name="q"
                            placeholder="Zoek naar producten..."
                            aria-label="Zoek naar producten"
                            className="w-full h-10 pl-4 pr-10 rounded-full text-sm text-grey-80 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-spd-cream"
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
                    </div>

                    {topLevelCategories.length > 0 && (
                      <div className="px-6 py-5 border-b border-spd-green-dark">
                        <span className="text-spd-cream text-xs font-semibold uppercase tracking-wide">
                          Categorieën
                        </span>
                        <ul className="flex flex-col mt-3">
                          {topLevelCategories.map((category) => (
                            <li key={category.id}>
                              <LocalizedClientLink
                                href={`/categories/${category.handle}`}
                                className="block py-2 text-lg text-white hover:text-spd-cream transition-colors"
                                onClick={close}
                                data-testid="category-link"
                              >
                                {category.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="px-6 py-5">
                      <ul className="flex flex-col">
                        {generalLinks.map((link) => (
                          <li key={link.href}>
                            <LocalizedClientLink
                              href={link.href}
                              className="block py-2 text-lg text-white hover:text-spd-cream transition-colors"
                              onClick={close}
                            >
                              {link.label}
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto flex flex-col gap-y-4 px-6 py-6 border-t border-spd-green-dark text-white">
                      {!!locales?.length && (
                        <div
                          className="flex justify-between"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <LanguageSelect
                            toggleState={languageToggleState}
                            locales={locales}
                            currentLocale={currentLocale}
                          />
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              languageToggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      )}
                      <div
                        className="flex justify-between"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={countryToggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="txt-compact-small text-white/50">
                        © {new Date().getFullYear()} SmartPowerDeals
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
