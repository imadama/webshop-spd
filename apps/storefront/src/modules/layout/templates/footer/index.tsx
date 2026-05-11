import Image from "next/image"
import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { Text, clx } from "@modules/common/components/ui";

import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="border-t border-spd-green-dark w-full bg-spd-green">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink href="/">
              <Image
                src="/images/logo.png"
                alt="SmartPowerDeals"
                width={160}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-spd-cream font-semibold">
                  Categorieën
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-white/80 txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-spd-cream transition-colors",
                            children && "txt-small-plus font-semibold"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-spd-cream transition-colors"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-spd-cream font-semibold">
                  Collecties
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-white/80 txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-spd-cream transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-spd-cream font-semibold">SmartPowerDeals</span>
              <ul className="grid grid-cols-1 gap-y-2 text-white/80 txt-small">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="hover:text-spd-cream transition-colors"
                  >
                    Alle producten
                  </LocalizedClientLink>
                </li>
                <li>
                  <a
                    href="mailto:info@smartpowerdeals.nl"
                    className="hover:text-spd-cream transition-colors"
                  >
                    info@smartpowerdeals.nl
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-white/50">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} SmartPowerDeals. Alle rechten voorbehouden.
          </Text>
        </div>
      </div>
    </footer>
  );
}
