import Image from "next/image"
import { clx } from "@modules/common/components/ui"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
type Props = {
  thumbnail?: string | null
  images?: { url?: string }[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  alt?: string
  "data-testid"?: string
}
export default function Thumbnail({
  thumbnail,
  images,
  size = "small",
  className,
  alt = "Productfoto",
  "data-testid": testId,
}: Props) {
  const image = thumbnail || images?.[0]?.url
  return (
    <div className={clx("spd-thumbnail", className)} data-testid={testId}>
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          draggable={false}
          sizes={size === "square" ? "120px" : "(max-width:767px) 45vw, 300px"}
        />
      ) : (
        <div className="spd-image-placeholder">
          <PlaceholderImage size={24} />
        </div>
      )}
    </div>
  )
}
