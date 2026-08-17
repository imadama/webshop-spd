import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    q?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { q } = await props.searchParams

  if (q) {
    return {
      title: `Zoekresultaten voor "${q}"`,
      description: `Producten bij SmartPowerDeals die passen bij "${q}".`,
      // Zoekresultaten horen niet in de index: ze leveren dunne, oneindig
      // variërende pagina's op die je eigen categoriepagina's verdringen.
      robots: { index: false, follow: true },
    }
  }

  return {
    title: "Alle producten",
    description:
      "Bekijk alle laadkabels, thuisladers en laadpalen van SmartPowerDeals. Gratis verzending in NL en BE.",
  }
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page, q } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      q={q}
      countryCode={params.countryCode}
    />
  )
}
