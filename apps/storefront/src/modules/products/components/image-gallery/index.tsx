"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

export default function ImageGallery({
  images,
  title,
}: {
  images: HttpTypes.StoreProductImage[]
  title: string
}) {
  const [active, setActive] = useState(0)
  useEffect(
    () => setActive(0),
    [images.map((image) => image.id || image.url).join(",")],
  )
  const index = Math.min(active, Math.max(images.length - 1, 0))
  const image = images[index]
  return (
    <div className="spd-gallery">
      <div className="spd-gallery-main">
        {image?.url ? (
          <Image
            src={image.url}
            alt={`${title}${index ? ` — detail ${index + 1}` : ""}`}
            fill
            priority
            sizes="(max-width:767px) 90vw, (max-width:1023px) 80vw, 650px"
            className="object-contain"
          />
        ) : (
          <div className="spd-image-placeholder">
            <PlaceholderImage size={48} />
            <span>Er is nog geen productfoto beschikbaar.</span>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div
          className="spd-gallery-thumbnails"
          role="group"
          aria-label="Productfoto kiezen"
        >
          {images.map((image, i) => (
            <button
              type="button"
              key={image.id || image.url}
              onClick={() => setActive(i)}
              aria-label={`Bekijk productfoto ${i + 1}`}
              aria-pressed={index === i}
              className="spd-gallery-thumbnail"
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
