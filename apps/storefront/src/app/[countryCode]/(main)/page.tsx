import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import Categories from "@modules/home/components/categories"
import ProductsPreview from "@modules/home/components/products-preview"
import UspBar from "@modules/home/components/usp-bar"
import Faq from "@modules/home/components/faq"
import { listProducts } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: {
    absolute: "Laadkabels, mobiele laders & laadpunten — SmartPowerDeals",
  },
  description:
    "Bekijk laadkabels, mobiele laders, laadpunten en thuisbatterijen bij SmartPowerDeals. Vergelijk het assortiment en krijg hulp bij het kiezen.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const [categories, region] = await Promise.all([
    listCategories(),
    getRegion(countryCode),
  ])
  const products = region
    ? (
        await listProducts({
          regionId: region.id,
          queryParams: {
            limit: 100,
            fields: "*variants.calculated_price,*images,*categories",
          },
        })
      ).response.products
    : []

  return (
    <div className="spd-home">
      <Hero products={products} />
      <Categories categories={categories} products={products} />
      <ProductsPreview products={products} />
      <UspBar />
      <Faq />
    </div>
  )
}
