import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight } from "@medusajs/icons"
export default function SignInPrompt() {
  return (
    <div className="spd-signin-prompt">
      <p>
        Al een account? <span>Log in om je gegevens te gebruiken.</span>
      </p>
      <LocalizedClientLink href="/account">
        Inloggen <ArrowRight aria-hidden="true" />
      </LocalizedClientLink>
    </div>
  )
}
