import Link from "next/link"
import { ArrowRight } from "@medusajs/icons"
export default function NotFoundMessage() {
  return (
    <div className="spd-container spd-empty-state">
      <p className="spd-eyebrow">Pagina niet gevonden</p>
      <h1>Hier loopt de weg even dood.</h1>
      <p>
        De pagina bestaat niet of is verplaatst. In de winkel helpen we je weer
        op weg.
      </p>
      <Link href="/" className="spd-button">
        Terug naar de winkel <ArrowRight aria-hidden="true" />
      </Link>
    </div>
  )
}
