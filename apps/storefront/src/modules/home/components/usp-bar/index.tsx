import { ArrowRight, Envelope } from "@medusajs/icons"

const steps = [
  {
    title: "De aansluiting",
    text: "Controleer welke aansluiting je auto heeft én op welk laadpunt je de kabel wilt aansluiten.",
  },
  {
    title: "Het laadvermogen",
    text: "Vergelijk wat je auto en het laadpunt ondersteunen. Een hoger kabelvermogen betekent niet automatisch sneller laden.",
  },
  {
    title: "De lengte",
    text: "Meet de afstand van het laadpunt tot de auto. Houd rekening met de plek van de laadaansluiting.",
  },
]

export default function ChoiceGuide() {
  return (
    <section
      id="keuzehulp"
      className="spd-container spd-section spd-choice-guide"
      aria-labelledby="choice-title"
    >
      <div className="spd-choice-intro">
        <p className="spd-eyebrow">Even checken voor je kiest</p>
        <h2 id="choice-title">
          Welke laadkabel
          <br />
          past bij jou?
        </h2>
        <p>
          Drie dingen om op te letten. Zo vergelijk je de kabels op wat er voor
          jou toe doet.
        </p>
        <a className="spd-text-link" href="mailto:info@smartpowerdeals.nl">
          <Envelope aria-hidden="true" /> Vraag ons om advies{" "}
          <ArrowRight aria-hidden="true" />
        </a>
      </div>
      <ol className="spd-choice-steps">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="spd-step-number">0{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
