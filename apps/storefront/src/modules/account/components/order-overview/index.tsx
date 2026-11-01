"use client"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-gray-200 pb-6 last:pb-0 last:border-none"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-4"
      data-testid="no-orders-container"
    >
      <h2 className="text-large-semi">Je hebt nog geen bestellingen.</h2>
      <p className="text-base-regular">
        Hier verschijnen je bestellingen zodra je iets hebt besteld.
      </p>
      <div className="mt-4">
        <LocalizedClientLink
          href="/store"
          className="spd-button"
          data-testid="continue-shopping-button"
        >
          Verder winkelen
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
