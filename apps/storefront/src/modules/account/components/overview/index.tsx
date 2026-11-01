import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
export default function Overview({
  customer,
  orders,
}: {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}) {
  const completion =
    [
      !!customer?.email,
      !!(customer?.first_name && customer?.last_name),
      !!customer?.phone,
      !!customer?.addresses?.some((address) => address.is_default_billing),
    ].filter(Boolean).length * 25
  return (
    <div data-testid="overview-page-wrapper">
      <div className="spd-page-intro">
        <p className="spd-eyebrow">Fijn dat je er bent</p>
        <h1 data-testid="welcome-message">Jouw overzicht</h1>
        <p>Beheer je gegevens en bekijk je bestellingen.</p>
      </div>
      <div className="spd-overview-stats">
        <div>
          <h2>Je profiel</h2>
          <strong data-testid="customer-profile-completion">
            {completion}%
          </strong>
          <p>Ingevuld</p>
        </div>
        <div>
          <h2>Je adressen</h2>
          <strong data-testid="addresses-count">
            {customer?.addresses?.length || 0}
          </strong>
          <p>Opgeslagen adressen</p>
        </div>
      </div>
      <section className="spd-overview-orders">
        <h2>Recente bestellingen</h2>
        {orders?.length ? (
          <ul data-testid="orders-wrapper">
            {orders.slice(0, 5).map((order) => (
              <li key={order.id}>
                <LocalizedClientLink
                  href={`/account/orders/details/${order.id}`}
                  className="spd-overview-order"
                >
                  <span>
                    Bestelling #{order.display_id}
                    <small>
                      {new Date(order.created_at).toLocaleDateString("nl-NL")}
                    </small>
                  </span>
                  <span>
                    {convertToLocale({
                      amount: order.total,
                      currency_code: order.currency_code,
                    })}
                  </span>
                  <span>Bekijk bestelling</span>
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        ) : (
          <p data-testid="no-orders-message">
            Je hebt nog geen bestellingen geplaatst.
          </p>
        )}
      </section>
    </div>
  )
}
