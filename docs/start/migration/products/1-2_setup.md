---
title: Prepare Your Migration Data
keywords: bigcommerce migration, product data import, category mapping, data transformation, api data migration, product variants, ecommerce data prep, csv import, product images migration, custom fields, taxonomy mapping, product schema, data validation, storefront visibility, bulk product upload
---

## Prepare Your Migration Data

While some systems may allow a direct or near-direct connection between your current store and BigCommerce, using such a connection will likely cause unforeseen errors. For best results, some preparation will help reduce migration time and roadblocks.

### Identify Source Data

<Callout type="info">  
If your primary data source is an ERP, product CMS, or other external system (not your ecommerce platform), proceed directly to [Create a Data Mapping](#create-a-data-mapping).  
</Callout>  

Export all data from your current platform. This will look different for all ecommerce solutions, so refer to your documentation for specific steps.

* For best results, use either a spreadsheet (`CSV` format is sufficient) or a SQL database if possible to ensure straightforward data mapping.  
* Carefully review headers and data for accuracy and completeness after export. This will provide a higher level of familiarity with the data, informing next steps when mapping from your current data to BigCommerce.

Review the following BigCommerce API resources before starting your migration:

* [Catalog API](https://developer.bigcommerce.com/docs/rest-catalog) - the family of endpoints related to adding, updating, and deleting products and product data.  
* [API Best Practices](https://developer.bigcommerce.com/docs/start/best-practices) - information on recommended usage.  
* [API Rate Limits](https://developer.bigcommerce.com/docs/start/best-practices/api-rate-limits) - information on platform limits that will affect your migration.

<Callout type="info">  
Some Catalog API endpoints have limitations beyond those outlined in our broadly documented rate limits.

To avoid potential issues and errors, verify each endpoint’s limitations prior to your active migration.  
</Callout>  

<Callout type="warning">  
Some special characters may cause inaccuracies in export data or the import process. If you're using CSV for data export, ensure your file is encoded using UTF-8 characters.
</Callout>  

Before migration, remove any data you don’t want transferred to BigCommerce. Filtering this data before migration reduces complexity and saves time.

* Document the filtering criteria and back up any removed data. This minimizes the risk of accidental data loss and ensures you can replicate the process for future syncs.
* Examples of products that may need to be excluded: disabled, permanently out-of-stock, and products that don’t easily map to BigCommerce automatically.

### Create a Mapping Plan

<Callout type="info">
Ensure you understand the BigCommerce product schema and taxonomy before mapping your data.
</Callout>

Some BigCommerce fields may map differently than in your current system, especially for large catalogs or simpler data models.

* The following fields are required for [product creation](https://developer.bigcommerce.com/docs/rest-catalog/products#create-a-product):  
  * Name - the name of the product as displayed on the storefront  
  * Type - whether the product is physical or digital  
  * Weight - the shipping weight of the product (set to `0` for digital products)  
  * Price - the base price of the product in the store’s default currency  
* The following product fields are read-only, unavailable for direct editing:  
  * ID - the server-assigned product ID used in all automated BigCommerce operations  
  * Date Created - the timestamp saved when the product was created in BigCommerce, regardless of the method used  
  * Date Modified - the timestamp saved during the most recent product update  
  * Calculated Price - the price of the product once set adjustments are applied based on options and other features  
  * Base Variant ID - the server-assigned variant ID treated as default for the product

Some data fields will likely function differently in BigCommerce than in your current ecommerce solution or source of truth. A few examples include

* [**Custom Fields**](https://developer.bigcommerce.com/docs/rest-catalog/products/custom-fields)  
  * In BigCommerce, custom fields serve as static filterable data for products.  
  * Each custom field requires a field name and a specific value, both of which are text information.  
  * Custom fields are displayed by default. Data not intended to display should be implemented with [Metafields](https://developer.bigcommerce.com/docs/rest-catalog/products/metafields) instead.  
  * Some unstructured data such as notes, extra attributes, and non-native fields will need to be transformed into either custom fields or metafields prior to migration if they are to be preserved in BigCommerce.
* **Related Products**  
  * Related products are assigned to a given product by product ID  
  * Explicitly setting products as related requires direct assignment of IDs  
* [**URLs and 301 Redirects**](https://developer.bigcommerce.com/docs/rest-management/redirects)  
  * By default, BigCommerce creates [SEO Optimized, short](https://support.bigcommerce.com/s/article/Store-Settings?language=en_US#url-structure) URLs for new products and categories.  
  * If you prefer to maintain your existing URLs, you can migrate them directly using the `custom_url` field during product creation.  
* Price Mapping  
  * BigCommerce supports several distinct price fields, which may differ from your current source of truth:  
    * Price - the price you normally charge for a single unit of the product  
    * Retail Price - the product’s manufacturer suggested retail price  
    * Map Price - the minimum advertised price of the product  
    * Sale Price - the price you are charging for the product while it’s on sale  
    * Cost Price - the price required for keeping a single unit of the product in stock  
    * Calculated Price - the price of the product once set adjustments are applied based on options and other features  
  * Carefully analyze your product pricing fields prior to migration to ensure correct mapping.

#### Field Mapping Reference

Product options and channel assignments are not managed in the main products API.

* To assign channels, use [Channel Assignments](https://developer.bigcommerce.com/docs/rest-catalog/products/channel-assignments).  
* For information on product options, see [Product Modifiers](https://developer.bigcommerce.com/docs/rest-catalog/product-modifiers), [Product Variants](https://developer.bigcommerce.com/docs/rest-catalog/product-variants), and [Product Variant Options](https://developer.bigcommerce.com/docs/rest-catalog/product-variant-options).

A list of the most commonly needed fields is provided in the following table.

<Callout type="info">
Some fields in the list below are required to be unique. For complete information on unique fields, refer to the Catalog API specification.
</Callout>

| Field Name | API Field Identifier | Data Type | Description |
| :---- | :---- | :---- | :---- |
| Name (required) | `name` | `string` | The name of the product, as displayed on the storefront. |
| Type (required) | `type` | `string` | The type of the product, either `"physical"` or `"digital"`. |
| SKU | `sku` | `string` | The stock keeping unit. Only accepts numbers, letters, hyphens, underscores, and spaces. |
| Description | `description` | `string` | The product description as shown on product detail pages. |
| Weight (required) | `weight` | `number` | The shipping weight of the product, in the units configured in your store settings. |
| Width | `width` | `number` | The shipping width of the product, in the units configured in your store settings. |
| Depth | `depth` | `number` | The shipping depth of the product, in the units configured in your store settings. |
| Height | `height` | `number` | The shipping height of the product, in the units configured in your store settings. |
| Price (required) | `price` | `number` | The product’s default price, provided in the store’s default currency, with taxes included or excluded based on your store settings. |
| Cost Price | `cost_price` | `number` | The product’s cost price, provided in the store’s default currency. |
| Retail Price | `retail_price` | `number` | The manufacturer suggested retail price, provided in the store’s default currency, with taxes included or excluded based on your store settings. |
| Sale Price | `sale_price` | `number` | The product’s current sale price, provided in the store’s default currency, with taxes included or excluded based on your store settings. |
| Tax Class | `tax_class_id` | `integer` | The ID of the tax class assigned to the product. Tax classes are configured in your store settings. If you’re using an automated tax provider, you may also need the `product_tax_code`. |
| Categories | `categories` | `array` | An array of the category IDs to which the product is assigned. |
| Brand ID | `brand_id` | `integer` | The brand to which the product is assigned. |
| Current Stock | `inventory_level` | `integer` | The current number of product units in stock, if tracked. |
| Low Stock | `inventory_warning_level` | `integer` | The stock level at which restocking becomes necessary. |
| Inventory Tracking | `inventory_tracking` | `string` | One of `"product"`, `"variant"`, or `"none"`, indicating how or if inventory is tracked on the product. |
| Fixed Shipping Cost | `fixed_cost_shipping_price` | `number` | The per-unit shipping cost, if the product uses it. Set to `0` if the feature is not used. |
| Free Shipping | `is_free_shipping` | `boolean` | Indicates whether the product is excluded from other shipping calculations. If `true` the product will ship for free and be excluded from other calculations unless your shipping settings explicitly ignore this field. |
| Is Visible | `is_visible` | `boolean` | Indicates whether the product is visible on the storefront. If `false`, the product will be inaccessible, even if it is assigned to a specific channel. |
| Is Featured | `is_featured` | `boolean` | Indicates whether the product will be included in the Featured Products section on your storefront. |
| Warranty | `warranty` | `string` | Warranty terms and conditions to be displayed on the product detail page. If no warranty is provided, the section will not display by default. |
| Bin Picking Number | `bin_picking_number` | `string` | The bin picking number used in a fulfillment workflow. If you don’t use bin picking as a fulfillment process, this may be omitted. |
| UPC/EAN | `upc` | `string` | The UPC or other related product identifier. |
| Search Keywords | `search_keywords` | `string` | Comma separated search keywords that can be used by the built-in BigCommerce storefront search to find the product. This field may be ineffective if you’re using a [headless commerce solution](https://developer.bigcommerce.com/docs/storefront/headless) or a custom search tool. |
| Sort Order | `sort_order` | `integer` | A 32-bit integer indicating the product’s relative position on product listing pages when the Featured sort option is selected. Negative values place the product closer to the front, while positive values place the product closer to the back. |
| Product Condition | `condition` | `string` | One of `"New"`, `"Used"`, or `"Refurbished"`, indicating the condition of the product |
| Show Product Condition | `is_condition_shown` | `boolean` | Indicates whether the product condition is displayed on the storefront. |
| Page Title | `page_title` | `string` | The SEO title for the product detail page. |
| Meta Keywords | `meta_keywords` | `array` | An array of SEO keywords used for page ranking on some search engines. |
| Meta Description | `meta_description` | `string` | The SEO description for the product detail page. |
| Product URL | `custom_url` | `object` | An object indicating the state of the product’s custom URL and whether a redirect is necessary. |
| Global Trade Number | `gtin` | `string` | The [Global Trade Item Number](https://www.gs1us.org/upcs-barcodes-prefixes/what-is-a-gtin) of the product used by some sales channels for proper tracking and identification. |
| Manufacturer Part Number | `mpn` | `string` | The manufacturer part number of the product, used to guarantee that customers are viewing the correct item. |
| [Custom Fields](https://support.bigcommerce.com/s/article/Custom-Fields) | `custom_fields` | `array` | An array of objects that include the `name` and `value` of each custom field associated with the object. |
| [Images](https://developer.bigcommerce.com/docs/rest-catalog/products/images) | `images` | `array` | An array of objects containing image data. |
| [Videos](https://developer.bigcommerce.com/docs/rest-catalog/products/videos) | `videos` | `array` | An array of objects containing video data. |
| Variants | `variants` | `array` | An array of objects containing variant data. |
| [Bulk Pricing](https://developer.bigcommerce.com/docs/rest-catalog/products/bulk-pricing-rules) | `bulk_pricing_rules` | `array` | An array of objects containing bulk pricing data. |
| Related Products | `related_products` | `array` | An array of numeric product IDs for related products. |

### FAQ
1. **What are the most efficient ways to export product data from my legacy store for migration into BigCommerce?**

Use your source platform’s native export tools to generate CSV or SQL files, or leverage its API if available for direct data extraction. Choose the format that best matches your mapping and transformation needs. Always verify data accuracy post-export.

2. **How do I map complex or custom product fields from my source system to BigCommerce’s schema?**

Identify all custom fields in your source data and review BigCommerce’s [custom fields](https://developer.bigcommerce.com/docs/rest-catalog/products/custom-fields) and [metafields](https://developer.bigcommerce.com/docs/rest-catalog/products/metafields). Map each source field to the most appropriate BigCommerce field, transforming formats or structures as needed. Document your mappings for consistency.

3. **What is the best way to handle images and digital assets during product migration?**

Ensure all product images and files are organized and accessible, with URLs or file names correctly referenced in your data. Upload images via the BigCommerce API or through bulk import features, and validate that each product record correctly links to its images after migration.

4. **How do I handle product variants, options, or bundles when the source and target systems structure them differently?**

Analyze how your source platform represents variants, options, and bundles. In BigCommerce, use the [variants](https://developer.bigcommerce.com/docs/rest-catalog/product-variants), [modifiers](https://developer.bigcommerce.com/docs/rest-catalog/product-modifiers), and related APIs to recreate these relationships.

5. **How should I document and track my data mapping and transformation rules for future reference or audits?**

Maintain a mapping spreadsheet or document that clearly records each source field, its transformation logic, and the target BigCommerce field. Include examples and version your mapping documentation to track changes over time.

6. **What are common issues encountered during product data migration to BigCommerce, and how can I troubleshoot them?**

Common issues include data validation errors, missing required fields, mismatched categories, or broken image links.

Troubleshoot by reviewing error logs, running validation scripts pre-import, and performing test imports with small data batches to catch issues early.

7. **How do I ensure SEO continuity, including URLs and redirects, during migration?**

Map your legacy URLs to BigCommerce’s structure using the `custom_url` field for products and categories. Set up 301 redirects for any changed URLs using the [Redirects API](https://developer.bigcommerce.com/docs/rest-management/redirects) or admin tools to preserve SEO rankings and avoid broken links.
### Resources
- [BigCommerce Catalog API Documentation](https://developer.bigcommerce.com/docs/rest-catalog) — Reference for all endpoints related to product data  
- [API Best Practices](https://developer.bigcommerce.com/docs/start/best-practices) — Recommended approaches for robust API use  
- [API Rate Limits](https://developer.bigcommerce.com/docs/start/best-practices/api-rate-limits) — How to avoid and handle API rate limiting  
