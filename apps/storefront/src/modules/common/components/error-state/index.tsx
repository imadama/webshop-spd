"use client"
export default function ErrorState({ reset }: { reset: () => void }) {
  return (
    <div className="spd-container spd-empty-state">
      <p className="spd-eyebrow">Er ging iets mis</p>
      <h1>Deze pagina kon niet laden.</h1>
      <p>
        Probeer het opnieuw. Blijft het probleem bestaan? Mail ons op
        info@smartpowerdeals.nl.
      </p>
      <button type="button" className="spd-button" onClick={reset}>
        Opnieuw proberen
      </button>
    </div>
  )
}
