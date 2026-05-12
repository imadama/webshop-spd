import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

import ProductActions from "@modules/products/components/product-actions"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const displayImages = images?.length ? images : product.images ?? []

  return (
    <div className="bg-spd-cream min-h-screen">
      <div className="content-container py-8" data-testid="product-container">
        <div className="flex flex-col small:flex-row gap-8 small:gap-16">

          {/* LEFT — image */}
          <div className="small:w-[55%] shrink-0">
            <div className="sticky top-28">
              {displayImages.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-spd-cream-dark shadow-sm">
                    <Image
                      src={displayImages[0].url!}
                      alt={product.title ?? "Product"}
                      fill
                      className="object-contain p-6"
                      priority
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </div>
                  {displayImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {displayImages.slice(1).map((img, i) => (
                        <div
                          key={img.id ?? i}
                          className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-white border border-spd-cream-dark"
                        >
                          <Image
                            src={img.url!}
                            alt={`${product.title} ${i + 2}`}
                            fill
                            className="object-contain p-2"
                            sizes="80px"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square w-full rounded-2xl bg-white border border-spd-cream-dark flex items-center justify-center">
                  <PlaceholderImage size={64} />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — info + actions */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Category breadcrumb */}
            {product.categories && product.categories.length > 0 && (
              <p className="text-xs text-grey-50 uppercase tracking-wider">
                {product.categories.map(c => c.name).join(" › ")}
              </p>
            )}

            {/* Title */}
            <h1 className="font-artico text-3xl small:text-4xl text-spd-green uppercase tracking-wide leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="bg-white rounded-xl p-5 border border-spd-cream-dark">
              <Suspense fallback={<div className="h-10 bg-spd-cream-dark animate-pulse rounded" />}>
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>

            {/* USP micro-badges */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-grey-60">
                <span className="text-spd-green">✓</span>
                <span>Gratis verzending in NL & BE</span>
              </div>
              <div className="flex items-center gap-2 text-grey-60">
                <span className="text-spd-green">✓</span>
                <span>Vóór 23:00 besteld? Morgen in huis</span>
              </div>
              <div className="flex items-center gap-2 text-grey-60">
                <span className="text-spd-green">✓</span>
                <span>30 dagen retourrecht</span>
              </div>
              <div className="flex items-center gap-2 text-grey-60">
                <span className="text-spd-green">✓</span>
                <span>Veilig betalen met iDEAL, Mastercard & meer</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-spd-cream-dark pt-6">
                <h2 className="font-semibold text-spd-green text-sm uppercase tracking-wide mb-3">
                  Productomschrijving
                </h2>
                <p className="text-sm text-grey-60 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specs */}
            <ProductSpecs product={product} />

            {/* Shipping accordion */}
            <ShippingInfo />

          </div>
        </div>

        {/* Related products */}
        <div className="mt-20" data-testid="related-products-container">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProductSpecs({ product }: { product: HttpTypes.StoreProduct }) {
  const specs = [
    product.material && { label: "Materiaal", value: product.material },
    product.weight && { label: "Gewicht", value: `${product.weight} g` },
    product.origin_country && { label: "Herkomst", value: product.origin_country },
    product.length && product.width && product.height && {
      label: "Afmetingen",
      value: `${product.length} × ${product.width} × ${product.height} cm`,
    },
  ].filter(Boolean) as { label: string; value: string }[]

  if (!specs.length) return null

  return (
    <div className="border-t border-spd-cream-dark pt-6">
      <h2 className="font-semibold text-spd-green text-sm uppercase tracking-wide mb-3">
        Specificaties
      </h2>
      <div className="divide-y divide-spd-cream-dark">
        {specs.map((s) => (
          <div key={s.label} className="flex justify-between py-2 text-sm">
            <span className="text-grey-50">{s.label}</span>
            <span className="text-grey-80 font-medium">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ShippingInfo() {
  return (
    <div className="border-t border-spd-cream-dark pt-6">
      <h2 className="font-semibold text-spd-green text-sm uppercase tracking-wide mb-4">
        Bezorging & retourneren
      </h2>
      <div className="flex flex-col gap-4 text-sm text-grey-60">
        <div className="flex gap-3">
          <span className="text-xl">🚚</span>
          <div>
            <div className="font-semibold text-grey-80">Snelle bezorging</div>
            <div>Vóór 23:00 besteld, morgen bezorgd via DHL of PostNL.</div>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-xl">↩️</span>
          <div>
            <div className="font-semibold text-grey-80">30 dagen retourrecht</div>
            <div>Niet tevreden? Stuur het product gratis retour binnen 30 dagen.</div>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-xl">🔒</span>
          <div>
            <div className="font-semibold text-grey-80">Veilig betalen</div>
            <div>Betaal via iDEAL, Mastercard, Visa of Bancontact.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
