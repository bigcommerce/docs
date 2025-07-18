---    
title: Test a Limited Dataset    
keywords: bigcommerce, data migration, api testing, catalog import, product data, sandbox environment, test automation, edge case validation, data integrity, partial migration, data cleanup, api rate limits, product relationships, scripting, data validation  
---

## Test a Limited Dataset

In order to properly prepare data for migration, data validation and testing are essential steps to provide improved efficiency during the full implementation.

### Prepare a Representative Sample

Before attempting to load any data, be sure to familiarize yourself with the [BigCommerce API Best Practices and Rate Limits](https://developer.bigcommerce.com/resource-hub/navigating-bigcommerces-api-rate-limits-update).

To ensure a smooth execution during migration, prepare a subset of your catalog to perform a partial migration as a test. This should be around `50` to `1000` data records, depending on the size and complexity of of your catalog, that cover a broad range of potential product configurations

If your catalog contains any of the following, ensure that your representative sample contains at least one product with each to test the associated BigCommerce APIs.

* SKU modifying product options - Product Variants and Product Variant Options  
* Non-SKU modifying product options - Product Modifiers  
* Static data visible to customers - Custom Fields  
* Static data **not** visible to customers - Metafields

Select a mix of data for testing, intentionally including records with inconsistencies, missing fields, edge-case values, or legacy formatting, as these samples are most likely to surface real-world migration issues.

<Callout type="info">    
If you haven't yet, configure your complete category tree and brands prior to loading your representative sample to ensure accurate assignments to each.  
</Callout>

<Callout type="important">    
Understand that BigCommerce handles data deletion and archiving differently. [Products](https://developer.bigcommerce.com/docs/rest-catalog/products) and [Customers](https://developer.bigcommerce.com/docs/rest-management/customers) can be deleted, but [Orders](https://developer.bigcommerce.com/docs/rest-management/orders) can only be archived.

As incorrect order migration can directly impact billing, it is imperative to fully understand these distinctions and their migration implications.

Conduct all initial data migration tests in a sandbox environment if possible.  
</Callout>

Once you've identified a representative sample, begin the partial migration.  
<Callout type="info">    
If you use Postman as your primary API client, you can use the [BigCommerce V3 API library](https://www.postman.com/api-evangelist/bigcommerce/documentation/37xvhum/bigcommerce-api-v3).   
</Callout>

1. Create one or more API accounts with [appropriate scopes](https://developer.bigcommerce.com/docs/start/authentication/api-accounts#oauth-scopes) to make requests to the Catalog API.  
   * Product creation requires API authentication keys to ensure secure data management.  
2. Create base products.  
   * Use the "Create a Product" endpoint to establish individual product records, making sure to associate the product ID with your representative dataset.  
   * For optimal error handling during large-scale operations, the best practice is to create individual products rather than using batch creation, even though it is supported.  
   * Product variants created simultaneously with the base product will default to display as rectangle lists. For more information on variant display options, see [Variants and Modifiers (Help Center)](https://support.bigcommerce.com/s/article/Variants-and-Modifiers).  
3. After base product creation, add additional attributes, images, and other data.  
   * While some data may be loaded simultaneously with the base product, performing the operation in multiple steps ensures clear error logging and a more consistent product creation experience.

Each Catalog API endpoint’s specification is accompanied by one or more example request bodies to clarify format and structure. For more information, review the [Catalog API Reference](https://developer.bigcommerce.com/docs/rest-catalog).

### Performing Data Validation and User Acceptance Testing (UAT)

Given potential datatype mismatches and platform limitations, data validation is a key step in ensuring a successful migration. After migrating your representative dataset, you should

* Manually verify a small subset of records against your source of truth to catch any discrepancies; and  
* Automate data validation by retrieving migrated data using the `Get All Products` endpoint and comparing it programmatically to your source dataset.

By combining manual and automated validation methods, you ensure that your data is complete, accurate, mapped as intended, and behaves as expected.

* Consider using [jsonschema](https://pypi.org/project/jsonschema/) (Python) or [deep-diff](https://www.npmjs.com/package/deep-diff) (Node.js) for schema validation and record comparison.  
* Leverage CSV/JSON diff tools to automate dataset checks. Some such applications include the following:
  * [json-diff](https://github.com/andreyvit/json-diff): A widely-used command-line tool and library for comparing JSON files, highlights structural and value differences.  
  * [csvdiff](https://pypi.org/project/csvdiff/): A Python library and CLI tool that compares CSV files and highlights row and cell-level differences for tabular data.  
  * [daff](https://github.com/paulfitz/daff): A versatile data diff tool supporting CSV/TSV formats, available as a command-line tool and with a web interface, ideal for comparing tables and spreadsheets.

#### User Acceptance Testing Resource Checklist

Once you’ve finished data validation on your sample dataset, user acceptance testing (UAT) is critical. This step ensures your data migration mapping is accurate and functions as expected in both the BigCommerce control panel and storefront.

As part of the UAT process, review the following product fields and storefront behaviors:

| Field/Area | What to Review |
| :---- | :---- |
| **Product Name and SKU** | Ensure product names and SKUs are accurate and mapped correctly. |
| **Product Prices** | Confirm product, MSRP, and sale prices are correct in the control panel and storefront. Check price change rules if applicable. |
| **Product/Variant Visibility** | Verify visibility settings (hidden/visible) and purchasing behavior (purchasable/not purchasable) for both products and variants. |
| **Inventory Tracking** | Check inventory tracking settings and inventory levels for accuracy. |
| **Options & Variants** | Confirm product options, variant SKUs, and option types (swatch, dropdown, etc.) are structured and displayed as intended. |
| **Custom Fields** | Ensure custom fields are present, correctly populated, and that no unwanted fields have been migrated. |
| **Descriptions** | Review product descriptions for correct formatting, including HTML, images, videos, PDFs, and links. Ensure links resolve to the correct BigCommerce URLs. |
| **Images / Videos** | Check that all product and variant images and videos appear properly in both the control panel and storefront. |
| **Metadata** | Review SEO metadata for completeness and correctness. |
| **Product URL Links** | Confirm product URLs are formatted according to your migration and cut-over plan. |
| **Recommended Products** | If used, verify recommended/related products are set up as expected. [See Product Panels documentation](https://support.bigcommerce.com/s/article/Product-Panels?language=en_US#related) |
| **Categories** | Ensure categories are created, named, visible, and assigned to the correct channels or storefronts. |

Record your findings and any issues in a tracking sheet or ticketing system. Plan for iterative corrections and re-tests as needed before migrating your full catalog. 

### Special Considerations

To improve the overall migration experience, the following optional steps will allow more flexibility in automation.

* **Proactively Managing API Traffic**  
  * During peak platform usage times, the BigCommerce API may return `HTTP 429` responses. Implement rest-and-retry logic to handle rate limiting effectively.  
  * To reduce the likelihood of `HTTP 429` responses, disable any third-party API applications on your store during migration, as the BigCommerce API does not distinguish between individual clients when managing rate limits on a single store.

<Callout type="warning">  
Be aware of account-level and store-level API quotas (such as product, image, or request limits). Exceeding these can cause partial migrations or silent failures.  
</Callout>

* **Error Handling and Reporting**  
  * Implement comprehensive error reporting to track failed resource transfers.  
  * Save all API requests during testing to aid in building clarity when unexpected outcomes occur.  
  * Follow error handling guidance based on specific error types. See Error Handling for more information.  
* **Pre-Plan for Data Integrity and Availability**  
  * Begin with a smaller dataset to verify functionality and data quality while limiting API requests and retries in testing.  
  * External resources that are unavailable via public HTTP requests cannot be fetched via the BigCommerce API. Upload images and other resources via WebDAV, using resource links local to BigCommerce during product creation.  
  * Ensure your test dataset includes edge cases such as products with maximum/minimum field values, missing optional data, special characters, and legacy formats to reveal potential issues early.

<Callout type="info">  
After migrating your test data, verify storefront display, search, filtering, checkout, and reporting to ensure all features work as expected.  
</Callout>

### FAQ

1. **How can I automate the generation of representative and edge-case test datasets for my catalog?**

Use scripting languages (such as Python or Node.js) to extract real records from your source system, and programmatically mutate copies to include edge cases (e.g., missing fields, maximum/minimum values, special characters). Consider sampling actual problematic records from production logs or validation failures.

2. **What are the best practices for scripting API calls to validate data integrity post-migration?**

Automate GET requests to retrieve migrated data from BigCommerce, then compare the results field-by-field with your source dataset. Log differences and use schema validation to catch datatype or structure mismatches.

3. **How do I programmatically compare source and destination data for consistency after a partial migration?**

Export both source and destination datasets as structured data (JSON/CSV), normalize formats, and use diff tools or custom scripts to check for field-level matches and missing/extra records.

4. **How can I handle and retry failed API requests efficiently when rate limits or transient errors occur during test runs?**

Implement exponential backoff and retry logic in your scripts for HTTP 429 (rate limit) or 5xx errors, and monitor response headers for rate limit information to throttle requests as needed.

5. **What is the recommended approach for cleaning up test data (including products, images, and related resources) after validation in a sandbox or production environment?**

Track IDs of all created test resources during migration, and use API DELETE calls or batch operations to remove them once tests are complete. For production, use clear naming conventions or tagging to identify test data for cleanup.

### Resources

- [BigCommerce Catalog API Reference](https://developer.bigcommerce.com/api-reference/store-management/catalog)  
- [Handling API Errors](https://developer.bigcommerce.com/resource-hub/handling-errors-in-bigcommerce-apis)  
- [API Rate Limits Guide](https://developer.bigcommerce.com/resource-hub/navigating-bigcommerces-api-rate-limits-update)  
- [Creating a BigCommerce Sandbox Store](https://developer.bigcommerce.com/docs/start/bigcommerce-sandbox-store)  
- [Using Postman with BigCommerce APIs](https://developer.bigcommerce.com/docs/start/api-clients/postman)  
- [Community Thread: Data Validation Scripts & Tips](https://community.bigcommerce.com/t5/Developers/Best-ways-to-validate-product-data-before-import/td-p/146590)  
- [WebDAV Overview and Usage](https://support.bigcommerce.com/s/article/File-Access-WebDAV)  
- [Sample Product Import CSV](https://support.bigcommerce.com/s/article/Sample-Product-CSV-Import-File)  
- [API Accounts and OAuth Scopes](https://developer.bigcommerce.com/docs/start/authentication/api-accounts)
