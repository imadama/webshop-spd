import { Plus } from "@medusajs/icons"

const questions = [
  {
    question: "Wat is het verschil tussen een laadkabel en een mobiele lader?",
    answer:
      "Een losse laadkabel verbindt je auto met een geschikt laadpunt. Een mobiele lader heeft een eigen regelunit en een aansluiting voor een stroompunt. Controleer bij het product welke aansluiting nodig is.",
  },
  {
    question: "Hoe weet ik of een product bij mijn auto past?",
    answer:
      "Vergelijk de aansluiting en het ondersteunde laadvermogen met de gegevens van je auto en je laadpunt. Twijfel je? Mail ons de auto, het bouwjaar en het laadpunt dat je gebruikt via info@smartpowerdeals.nl.",
  },
  {
    question: "Waar kan ik terecht met een vraag over mijn bestelling?",
    answer:
      "Mail naar info@smartpowerdeals.nl en vermeld je bestelnummer. Ook voor vragen over levering, een retour of een product kun je ons op dit adres bereiken.",
  },
]

export default function Faq() {
  return (
    <section className="spd-faq-section" aria-labelledby="faq-title">
      <div className="spd-container spd-section spd-faq-grid">
        <div>
          <p className="spd-eyebrow">Goed om te weten</p>
          <h2 id="faq-title">Nog een vraag?</h2>
          <p>We helpen je graag verder.</p>
          <a href="mailto:info@smartpowerdeals.nl" className="spd-text-link">
            info@smartpowerdeals.nl
          </a>
        </div>
        <div>
          {questions.map(({ question, answer }) => (
            <details key={question} className="spd-faq-item">
              <summary>
                {question}
                <Plus aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
