import { Heading, Text } from "@modules/common/components/ui"
import TransferActions from "@modules/order/components/transfer-actions"

export default async function TransferPage({
  params,
}: {
  params: Promise<{ id: string; token: string }>
}) {
  const { id, token } = await params

  return (
    <div className="spd-transfer-page spd-page spd-container">
      <div className="spd-order-panel flex flex-col gap-y-6">
        <Heading level="h1" className="text-xl text-zinc-900">
          Bestelling overdragen
        </Heading>
        <Text className="text-zinc-600">
          Je hebt een verzoek ontvangen om bestelling {id} aan een ander account
          over te dragen. Met de knoppen hieronder kun je het verzoek accepteren
          of weigeren.
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <Text className="text-zinc-600">
          Als je accepteert, krijgt de nieuwe eigenaar de rechten en
          verantwoordelijkheden die bij deze bestelling horen.
        </Text>
        <Text className="text-zinc-600">
          Herken je dit verzoek niet of wil je de bestelling zelf behouden? Dan
          hoef je niets te doen.
        </Text>
        <div className="w-full h-px bg-zinc-200" />
        <TransferActions id={id} token={token} />
      </div>
    </div>
  )
}
