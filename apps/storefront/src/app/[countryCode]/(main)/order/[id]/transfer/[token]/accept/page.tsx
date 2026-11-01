import { acceptTransferRequest } from "@lib/data/orders"
import { Heading, Text } from "@modules/common/components/ui"

export default async function TransferPage({
  params,
}: {
  params: Promise<{ id: string; token: string }>
}) {
  const { id, token } = await params

  const { success, error } = await acceptTransferRequest(id, token)

  return (
    <div className="spd-transfer-page spd-page spd-container">
      <div className="spd-order-panel flex flex-col gap-y-6">
        {success && (
          <>
            <Heading level="h1" className="text-xl text-zinc-900">
              Bestelling overgedragen
            </Heading>
            <Text className="text-zinc-600">
              Bestelling {id} is overgedragen aan de nieuwe eigenaar.
            </Text>
          </>
        )}
        {!success && (
          <>
            <Text className="text-zinc-600">
              De overdracht is niet gelukt. Probeer het opnieuw.
            </Text>
            {error && (
              <Text className="text-red-500">Foutmelding: {error}</Text>
            )}
          </>
        )}
      </div>
    </div>
  )
}
