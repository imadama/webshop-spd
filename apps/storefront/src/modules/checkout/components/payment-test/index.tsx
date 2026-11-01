import { Badge } from "@modules/common/components/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">Let op:</span> Alleen voor testbetalingen.
    </Badge>
  )
}

export default PaymentTest
