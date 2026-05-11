import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import Categories from "@modules/home/components/categories"
import ProductsPreview from "@modules/home/components/products-preview"

export const metadata: Metadata = {
  title: {
    absolute: "SmartPowerDeals — slimme deals voor smart living",
  },
  description:
    "SmartPowerDeals — slimme deals voor smart living. Bestel online, betaal met iDEAL, geleverd in heel NL en BE.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  return (
    <>
      <Hero />
      <Categories />
      <ProductsPreview countryCode={countryCode} />
    </>
  )
}
