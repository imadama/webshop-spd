import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: { absolute: "Mijn account — SmartPowerDeals" },
  description:
    "Log in bij SmartPowerDeals om je gegevens en bestellingen te bekijken.",
}

export default function Login() {
  return <LoginTemplate />
}
