import { HttpTypes } from "@medusajs/types"

const categoryLabels: Record<string, { label: string; description: string }> = {
  laadkabels: {
    label: "Laadkabels",
    description: "Voor laden aan een laadpunt",
  },
  thuisladers: {
    label: "Mobiele laders",
    description: "Een lader om mee te nemen",
  },
  laadpaal: { label: "Laadpalen", description: "Een vast laadpunt bij huis" },
  laadpalen: { label: "Laadpalen", description: "Een vast laadpunt bij huis" },
  verloopkabels: {
    label: "Adapters",
    description: "Voor verschillende aansluitingen",
  },
  thuisbatterijen: {
    label: "Thuisbatterijen",
    description: "Energie opslaan voor thuis",
  },
}

export function getCategoryPresentation(category: {
  handle?: string | null
  name: string
}) {
  return (
    categoryLabels[category.handle ?? ""] ?? {
      label: category.name,
      description: "Bekijk het assortiment",
    }
  )
}

// Translate supplier wording without inferring specifications from an SKU.
export function getProductLabel(title: string) {
  return title
    .replace(/charging\s+cable/gi, "Laadkabel")
    .replace(/\bEVSE\b/g, "Mobiele lader")
    .replace(/\bcoiled\b/gi, "spiraal")
    .replace(/\b3\s*phase\b/gi, "3-fase")
    .replace(/\bto\b/gi, "naar")
    .replace(/\b(\d+(?:[.,]\d+)?)\s*m\b/gi, "$1 meter")
    .replace(/(\d)\s*kw\b/gi, "$1 kW")
}

export function getProductImage(product: HttpTypes.StoreProduct) {
  return product.thumbnail || product.images?.[0]?.url
}
