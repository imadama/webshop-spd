const items = [
  "⚡ Gratis verzending in NL & BE",
  "📦 Vóór 23:00 besteld? Morgen bezorgd!",
  "✅ Meer dan 500+ tevreden klanten",
  "🔌 Specialist in EV-laadoplossingen",
]

export default function AnnouncementBar() {
  return (
    <div className="bg-spd-green-dark text-white text-xs py-2 overflow-hidden">
      <div className="flex items-center justify-center gap-8 px-4 flex-wrap small:flex-nowrap">
        {items.map((item, i) => (
          <span key={i} className="whitespace-nowrap opacity-90">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
