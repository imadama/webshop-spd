import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function initial_data_seed({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  );

  const countries = ["nl", "be"];

  logger.info("Seeding store data...");
  const {
    result: [defaultSalesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "Default Sales Channel",
          description: "Created by Medusa",
        },
      ],
    },
  });

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Default Publishable API Key",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel.id],
    },
  });

  const {
    result: [store],
  } = await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "Default Store",
          supported_currencies: [
            {
              currency_code: "eur",
              is_default: true,
            },
            {
              currency_code: "usd",
              is_default: false,
            },
          ],
          default_sales_channel_id: defaultSalesChannel.id,
        },
      ],
    },
  });

  logger.info("Seeding region data...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Nederland & België",
          currency_code: "eur",
          countries,
          payment_providers: ["pp_system_default", "pp_mollie_mollie"],
        },
      ],
    },
  });
  const region = regionResult[0];
  logger.info("Finished seeding regions.");

  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });
  logger.info("Finished seeding tax regions.");

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "Werkplaats",
          address: {
            city: "Amsterdam",
            country_code: "NL",
            address_1: "",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  logger.info("Seeding fulfillment data...");
  // This is created by a migration script in core.
  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfileResult[0];

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Verzending NL & BE",
    type: "shipping",
    service_zones: [
      {
        name: "Nederland & België",
        geo_zones: countries.map((country_code) => ({
          country_code,
          type: "country" as const,
        })),
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Ship in 2-3 days.",
          code: "standard",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Ship in 24 hours.",
          code: "express",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  });
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel.id],
    },
  });
  logger.info("Finished seeding stock location data.");

  logger.info("Seeding product data...");

  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        {
          name: "Smart Home",
          is_active: true,
        },
        {
          name: "Power & Opladen",
          is_active: true,
        },
        {
          name: "Audio & Video",
          is_active: true,
        },
        {
          name: "Gadgets",
          is_active: true,
        },
      ],
    },
  });

  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Slimme Wifi Stekker",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Smart Home")!.id,
          ],
          description:
            "Bedien elk apparaat op afstand via de app. Meten van stroomverbruik, timer en schakelaar ingebouwd. Compatibel met Google Home en Amazon Alexa.",
          handle: "slimme-wifi-stekker",
          weight: 120,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [
            {
              title: "Uitvoering",
              values: ["Wit", "Zwart"],
            },
          ],
          variants: [
            {
              title: "Wit",
              sku: "SPD-SMARTPLUG-WIT",
              options: { Uitvoering: "Wit" },
              prices: [
                { amount: 1299, currency_code: "eur" },
              ],
            },
            {
              title: "Zwart",
              sku: "SPD-SMARTPLUG-ZWT",
              options: { Uitvoering: "Zwart" },
              prices: [
                { amount: 1299, currency_code: "eur" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
        {
          title: "65W GaN USB-C Lader",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Power & Opladen")!.id,
          ],
          description:
            "Laad laptop, tablet en telefoon tegelijk op met één compacte GaN-lader. 3 poorten: 2× USB-C (PD 65W) + 1× USB-A. Inclusief gevlochten kabel.",
          handle: "65w-gan-usb-c-lader",
          weight: 180,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [
            {
              title: "Kleur",
              values: ["Wit", "Zwart"],
            },
          ],
          variants: [
            {
              title: "Wit",
              sku: "SPD-GAN65-WIT",
              options: { Kleur: "Wit" },
              prices: [
                { amount: 2999, currency_code: "eur" },
              ],
            },
            {
              title: "Zwart",
              sku: "SPD-GAN65-ZWT",
              options: { Kleur: "Zwart" },
              prices: [
                { amount: 2999, currency_code: "eur" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
        {
          title: "15W Draadloze Oplader (Qi2)",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Power & Opladen")!.id,
          ],
          description:
            "Snelladen via Qi2-standaard. Geschikt voor iPhone en Android. Anti-slip voet, ingebouwde indicator-LED. Kabel inbegrepen.",
          handle: "15w-draadloze-oplader-qi2",
          weight: 90,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [
            {
              title: "Kleur",
              values: ["Wit", "Zwart"],
            },
          ],
          variants: [
            {
              title: "Wit",
              sku: "SPD-QI2-WIT",
              options: { Kleur: "Wit" },
              prices: [
                { amount: 1999, currency_code: "eur" },
              ],
            },
            {
              title: "Zwart",
              sku: "SPD-QI2-ZWT",
              options: { Kleur: "Zwart" },
              prices: [
                { amount: 1999, currency_code: "eur" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
        {
          title: "Slimme LED Lamp E27 (WiFi)",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Smart Home")!.id,
          ],
          description:
            "Dimbaar en volledig kleurinstelbaar (RGBW) via app of spraak. Past in elke standaard E27-fitting. Geen hub nodig. 2-pack.",
          handle: "slimme-led-lamp-e27-wifi",
          weight: 200,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          variants: [
            {
              title: "2-pack",
              sku: "SPD-LEDLAMP-E27-2PK",
              prices: [
                { amount: 2499, currency_code: "eur" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
      ],
    },
  });
  logger.info("Finished seeding product data.");

  logger.info("Seeding inventory levels.");

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item) => ({
        location_id: stockLocation.id,
        stocked_quantity: 1000000,
        inventory_item_id: item.id,
      })),
    },
  });

  logger.info("Finished seeding inventory levels data.");
}
