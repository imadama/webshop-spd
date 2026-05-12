import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categoryConfig: Record<string, { emoji: string; description: string }> = {
  laadkabels: { emoji: "🔌", description: "Voor alle automodellen en laadsnelheden" },
  thuisladers: { emoji: "🏠", description: "Laad je auto veilig thuis op" },
  laadpalen: { emoji: "⚡", description: "Vaste installaties voor thuis en zakelijk" },
  verloopkabels: { emoji: "🔄", description: "Adapters voor elk stopcontact" },
}

export default async function Categories() {
  const categories = await listCategories()
  const topLevel = categories.filter((c) => !c.parent_category)

  if (!topLevel.length) return null

  return (
    <section className="bg-white border-t border-b border-spd-cream-dark">
      <div className="content-container py-12">
        <h2 className="font-artico text-2xl small:text-3xl text-spd-green uppercase tracking-wide mb-8 text-center">
          Vind het juiste product voor jouw auto
        </h2>
        <div className="grid grid-cols-2 small:grid-cols-4 gap-4">
          {topLevel.map((cat) => {
            const config = categoryConfig[cat.handle ?? ""] ?? { emoji: "⚡", description: "" }
            return (
              <LocalizedClientLink
                key={cat.id}
                href={`/categories/${cat.handle}`}
                className="group flex flex-col items-center text-center gap-3 bg-spd-cream rounded-xl p-6 hover:bg-spd-cream-dark transition-colors duration-200"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-shadow">
                  {config.emoji}
                </div>
                <div>
                  <div className="font-semibold text-spd-green text-sm mb-1">{cat.name}</div>
                  <div className="text-xs text-grey-50">{config.description}</div>
                </div>
                <span className="text-xs text-spd-green font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Bekijk producten
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
