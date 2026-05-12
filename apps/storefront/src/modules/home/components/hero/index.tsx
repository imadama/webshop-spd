import LocalizedClientLink from "@modules/common/components/localized-client-link"

const HeroBanner = ({
  title,
  subtitle,
  cta,
  href,
  bg,
  emoji,
}: {
  title: string
  subtitle: string
  cta: string
  href: string
  bg: string
  emoji: string
}) => (
  <LocalizedClientLink href={href} className="group flex-1 min-h-[280px] small:min-h-[340px]">
    <div className={`relative h-full rounded-xl overflow-hidden ${bg} flex flex-col justify-end p-8 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="absolute top-6 right-8 text-7xl opacity-20 select-none">{emoji}</div>
      <div className="relative z-10">
        <h2 className="font-artico text-3xl small:text-4xl text-white uppercase tracking-wide leading-tight mb-2">
          {title}
        </h2>
        <p className="text-white/80 text-sm mb-5 max-w-xs">{subtitle}</p>
        <span className="inline-flex items-center gap-2 bg-white text-spd-green font-semibold text-sm px-5 py-2.5 rounded-full group-hover:bg-spd-cream transition-colors">
          {cta}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  </LocalizedClientLink>
)

const Hero = () => {
  return (
    <section className="content-container py-6">
      <div className="flex flex-col small:flex-row gap-4">
        <HeroBanner
          title="Laad slim, laad groen"
          subtitle="Vind de perfecte laadkabel of thuislader voor jouw elektrische auto."
          cta="Bekijk laadkabels"
          href="/categories/laadkabels"
          bg="bg-spd-green"
          emoji="🔌"
        />
        <HeroBanner
          title="Thuisladers op maat"
          subtitle="Laad je EV veilig en snel op bij jou thuis — dag en nacht."
          cta="Bekijk thuisladers"
          href="/categories/thuisladers"
          bg="bg-spd-green-dark"
          emoji="🏠"
        />
      </div>
    </section>
  )
}

export default Hero
