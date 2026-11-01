"use client"
import { useState } from "react"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import { Check } from "@medusajs/icons"
export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}
export default function LoginTemplate() {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)
  return (
    <div className="spd-auth-layout">
      <aside className="spd-auth-intro">
        <p className="spd-eyebrow">Mijn SmartPowerDeals</p>
        <p className="spd-auth-title">
          Alles voor je
          <br />
          volgende rit.
        </p>
        <p>
          Je bestellingen en gegevens op één plek. Handig voor nu én voor de
          volgende keer.
        </p>
        <ul>
          <li>
            <Check aria-hidden="true" />
            Bekijk je bestellingen
          </li>
          <li>
            <Check aria-hidden="true" />
            Bewaar je adressen
          </li>
          <li>
            <Check aria-hidden="true" />
            Houd je gegevens bij
          </li>
        </ul>
      </aside>
      <div className="spd-auth-form">
        {currentView === LOGIN_VIEW.SIGN_IN ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}
