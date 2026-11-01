import Image from "next/image"
import { ArrowRight } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import {
  getProductImage,
  getProductLabel,
} from "@lib/util/catalog-presentation"
import { getProductPrice } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Hero({
  products,
}: {
  products: HttpTypes.StoreProduct[]
}) {
  const featured =
    products.find((p) => p.handle === "zc-e-mini" && getProductImage(p)) ??
    products.find((p) => p.handle && getProductImage(p))
  const image = featured && getProductImage(featured)
  const price = featured && getProductPrice({ product: featured }).cheapestPrice

  return (
    <section className="spd-hero" aria-labelledby="home-title">
      <div className="spd-container spd-hero-grid">
        <div className="spd-hero-copy">
          <p className="spd-eyebrow">Laden & energie</p>
          <h1 id="home-title">
            De juiste kabel.
            <br />
            <span>De juiste lader.</span>
          </h1>
          <p className="spd-hero-description">
            Laadkabels, mobiele laders en laadpunten voor thuis en onderweg.
            Vind wat past bij jouw situatie.
          </p>
          <div className="spd-hero-actions">
            <a href="#assortiment" className="spd-button">
              Ontdek het assortiment <ArrowRight aria-hidden="true" />
            </a>
            <a href="#keuzehulp" className="spd-text-link">
              Hulp bij kiezen <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="spd-hero-note">
            <span aria-hidden="true" />
            Van losse laadkabel tot een laadpunt bij huis
          </div>
        </div>
        {featured && image ? (
          <LocalizedClientLink
            href={`/products/${featured.handle}`}
            className="spd-hero-product"
          >
            <span className="spd-product-tag">Uit ons assortiment</span>
            <div className="spd-hero-product-image">
              <Image
                src={image}
                alt={getProductLabel(featured.title)}
                fill
                priority
                sizes="(max-width: 767px) 85vw, 520px"
                className="object-contain"
              />
            </div>
            <div className="spd-hero-product-caption">
              <div>
                <span>Ontdek dit product</span>
                <h2>{getProductLabel(featured.title)}</h2>
              </div>
              <div className="spd-hero-product-price">
                {price &&
                  convertToLocale({
                    amount: price.calculated_price_number,
                    currency_code: price.currency_code,
                    locale: "nl-NL",
                  })}
                <ArrowRight aria-hidden="true" />
              </div>
            </div>
          </LocalizedClientLink>
        ) : (
          <div className="spd-hero-directory">
            <p className="spd-eyebrow">Waar wil je laden?</p>
            <h2>
              Thuis.
              <br />
              Onderweg.
              <br />
              Op jouw manier.
            </h2>
            <LocalizedClientLink href="/store" className="spd-text-link">
              Bekijk alle producten <ArrowRight aria-hidden="true" />
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </section>
  )
}
