"use client"

import { useState } from "react"

const faqs = [
  {
    category: "Bezorgen & Afhalen",
    items: [
      {
        q: "Hoe snel wordt mijn bestelling geleverd?",
        a: "Bestellingen geplaatst vóór 23:00 worden de volgende werkdag bezorgd. Je ontvangt een track & trace per e-mail.",
      },
      {
        q: "Wat zijn de verzendkosten?",
        a: "Verzending is gratis voor alle bestellingen in Nederland en België.",
      },
    ],
  },
  {
    category: "Producten",
    items: [
      {
        q: "Welke laadkabel heb ik nodig voor mijn auto?",
        a: "Dit hangt af van jouw auto en het type laadpunt. De meeste elektrische auto's in Europa gebruiken Type 2. Bekijk onze categorieën voor het juiste type.",
      },
      {
        q: "Wat is het verschil tussen 1-fase en 3-fase laden?",
        a: "1-fase laden levert maximaal 7,4 kW, 3-fase laden tot 22 kW. Welke je nodig hebt hangt af van je auto en thuislader.",
      },
      {
        q: "Zijn jullie producten geschikt voor alle auto's?",
        a: "Ja, onze producten zijn universeel en geschikt voor alle gangbare EV-merken zoals Tesla, Volkswagen, Hyundai, Kia, BMW en meer.",
      },
    ],
  },
  {
    category: "Retouren & Betalen",
    items: [
      {
        q: "Kan ik mijn product ruilen of retourneren?",
        a: "Ja, je hebt 30 dagen bedenktijd. Stuur ons een e-mail op info@smartpowerdeals.nl en we regelen het verder.",
      },
      {
        q: "Welke betaalmethoden accepteren jullie?",
        a: "Je kunt betalen met iDEAL, creditcard, Bancontact en meer. Veilig en eenvoudig via Mollie.",
      },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-spd-cream-dark last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 text-sm font-medium text-grey-80 hover:text-spd-green transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 shrink-0 text-spd-green transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 text-sm text-grey-50 leading-relaxed">{a}</div>
      )}
    </div>
  )
}

export default function Faq() {
  return (
    <section className="bg-white border-t border-spd-cream-dark">
      <div className="content-container py-12 small:py-16">
        <h2 className="font-artico text-2xl small:text-3xl text-spd-green uppercase tracking-wide mb-10 text-center">
          Veelgestelde vragen
        </h2>
        <div className="grid small:grid-cols-2 gap-x-16 gap-y-2 max-w-4xl mx-auto">
          {faqs.map((section) => (
            <div key={section.category}>
              <h3 className="font-semibold text-spd-green text-sm mb-3 pb-2 border-b-2 border-spd-green">
                {section.category}
              </h3>
              {section.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
