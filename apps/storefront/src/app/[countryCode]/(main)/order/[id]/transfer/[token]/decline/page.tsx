import { declineTransferRequest } from "@lib/data/orders"
import { Heading, Text } from "@modules/common/components/ui"

export default async function TransferPage({
  params,
}: {
  params: Promise<{ id: string; token: string }>
}) {
  const { id, token } = await params

  const { success, error } = await declineTransferRequest(id, token)

  return (
    <div className="spd-transfer-page spd-page spd-container">
      <div className="spd-order-panel flex flex-col gap-y-6">
        {success && (
          <>
            <Heading level="h1" className="text-xl text-zinc-900">
              Overdracht geweigerd
            </Heading>
            <Text className="text-zinc-600">
              Het verzoek om bestelling {id} over te dragen is geweigerd.
            </Text>
          </>
        )}
        {!success && (
          <>
            <Text className="text-zinc-600">
              Het weigeren van de overdracht is niet gelukt. Probeer het
              opnieuw.
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
