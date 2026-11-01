import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <nav aria-label="Broodkruimelpad" className="spd-breadcrumbs">
      <ol>
        <li>
          <LocalizedClientLink href="/">Home</LocalizedClientLink>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            <span aria-hidden="true">/</span>
            {item.href ? (
              <LocalizedClientLink href={item.href}>
                {item.label}
              </LocalizedClientLink>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
