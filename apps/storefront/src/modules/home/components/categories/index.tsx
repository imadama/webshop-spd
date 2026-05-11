import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categoryIcons: Record<string, string> = {
  laadkabels: "🔌",
  thuisladers: "🏠",
  laadpalen: "⚡",
  verloopkabels: "🔄",
}

export default async function Categories() {
  const categories = await listCategories()
  const topLevel = categories.filter((c) => !c.parent_category)

  if (!topLevel.length) return null

  return (
    <section className="content-container py-16">
      <h2 className="font-artico text-3xl text-spd-green uppercase tracking-wide mb-10 text-center">
        Shop per categorie
      </h2>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4">
        {topLevel.map((cat) => {
          const icon = categoryIcons[cat.handle ?? ""] ?? "⚡"
          return (
            <LocalizedClientLink
              key={cat.id}
              href={`/categories/${cat.handle}`}
              className="group flex flex-col items-center justify-center gap-3 bg-white border border-spd-cream-dark rounded-lg p-8 hover:border-spd-green hover:shadow-md transition-all duration-200"
            >
              <span className="text-4xl">{icon}</span>
              <span className="text-spd-green font-semibold text-sm text-center group-hover:text-spd-green-dark">
                {cat.name}
              </span>
            </LocalizedClientLink>
          )
        })}
      </div>
    </section>
  )
}
