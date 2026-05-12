const usps = [
  {
    icon: "🚚",
    title: "Gratis verzending",
    text: "Gratis thuisbezorgd in NL & BE",
  },
  {
    icon: "⚡",
    title: "Snel geleverd",
    text: "Vóór 23:00 besteld? Morgen in huis",
  },
  {
    icon: "🔒",
    title: "Veilig betalen",
    text: "Betaal veilig met iDEAL, creditcard en meer",
  },
  {
    icon: "↩️",
    title: "Eenvoudig retourneren",
    text: "30 dagen bedenktijd, geen gedoe",
  },
]

export default function UspBar() {
  return (
    <section className="bg-spd-green">
      <div className="content-container py-10">
        <div className="grid grid-cols-2 small:grid-cols-4 gap-6">
          {usps.map((usp) => (
            <div key={usp.title} className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">{usp.icon}</span>
              <div className="font-semibold text-white text-sm">{usp.title}</div>
              <div className="text-white/70 text-xs">{usp.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
