import { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { ArrowRight, Envelope } from "@medusajs/icons"
import {
  getCategoryPresentation,
  getProductLabel,
} from "@lib/util/catalog-presentation"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ImageGallery from "@modules/products/components/image-gallery"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"

type Props = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}
export default function ProductTemplate({
  product,
  region,
  countryCode,
  images,
}: Props) {
  if (!product?.id) notFound()
  const title = getProductLabel(product.title),
    category = product.categories?.[0]
  const photos = images?.length
    ? images
    : product.images?.length
      ? product.images
      : product.thumbnail
        ? [
            {
              id: product.id,
              url: product.thumbnail,
            } as HttpTypes.StoreProductImage,
          ]
        : []
  const categoryLabel = category
    ? getCategoryPresentation(category).label
    : "Product"
  return (
    <div
      className="spd-product-page spd-page spd-container"
      data-testid="product-container"
    >
      <Breadcrumbs
        items={[
          { label: "Alle producten", href: "/store" },
          ...(category
            ? [{ label: categoryLabel, href: `/categories/${category.handle}` }]
            : []),
          { label: title },
        ]}
      />
      <div className="spd-product-layout">
        <ImageGallery images={photos} title={title} />
        <div className="spd-product-info">
          <p className="spd-eyebrow">{categoryLabel}</p>
          <h1>{title}</h1>
          {product.subtitle && (
            <p className="spd-product-subtitle">{product.subtitle}</p>
          )}
          <div className="spd-buy-panel">
            <Suspense
              fallback={
                <div
                  className="spd-action-skeleton"
                  aria-label="Prijs en uitvoeringen laden"
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
          <div className="spd-product-support">
            <Envelope aria-hidden="true" />
            <div>
              <h2>Past dit product bij jouw situatie?</h2>
              <p>We helpen je graag met je keuze.</p>
              <a
                href={`mailto:info@smartpowerdeals.nl?subject=${encodeURIComponent(`Vraag over ${title}`)}`}
              >
                Vraag advies <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <LocalizedClientLink href="/#keuzehulp" className="spd-text-link">
            Waar moet je op letten? <ArrowRight aria-hidden="true" />
          </LocalizedClientLink>
        </div>
      </div>
      <div className="spd-product-details">
        <section>
          <p className="spd-eyebrow">Over dit product</p>
          <h2>Productinformatie</h2>
          {product.description ? (
            <p className="spd-product-description">{product.description}</p>
          ) : (
            <p>
              Wil je meer weten over de toepassing of geschiktheid van dit
              product? Mail ons met de productnaam, dan kijken we met je mee.
            </p>
          )}
          <ProductSpecs product={product} />
        </section>
        <aside className="spd-product-service">
          <h2>Een vraag over je bestelling?</h2>
          <p>
            Voor informatie over levering, retourneren of een bestaand
            bestelnummer kun je contact met ons opnemen.
          </p>
          <a href="mailto:info@smartpowerdeals.nl">
            info@smartpowerdeals.nl <ArrowRight aria-hidden="true" />
          </a>
        </aside>
      </div>
      <div className="spd-related" data-testid="related-products-container">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

function ProductSpecs({ product }: { product: HttpTypes.StoreProduct }) {
  const sku =
    product.variants?.length === 1 ? product.variants[0].sku : undefined
  const specs = [
    sku && { label: "Artikelnummer", value: sku },
    product.material && { label: "Materiaal", value: product.material },
    product.weight && { label: "Gewicht", value: `${product.weight} g` },
    product.origin_country && {
      label: "Land van herkomst",
      value: product.origin_country,
    },
  ].filter(Boolean) as { label: string; value: string }[]
  if (!specs.length) return null
  return (
    <div className="spd-specifications">
      <h3>Specificaties</h3>
      <dl>
        {specs.map((spec) => (
          <div key={spec.label}>
            <dt>{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
