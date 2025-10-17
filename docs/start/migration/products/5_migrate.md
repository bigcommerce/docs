---
title: Load Complete Data
keywords: bigcommerce migration, bigcommerce product import, ecommerce catalog migration, data migration guide, bigcommerce API, product data transfer, ecommerce platform migration, idempotent migration, rollback migration bigcommerce, referential integrity, bigcommerce API limits, product catalog import, ecommerce data validation, bigcommerce troubleshooting, migration best practices
---

## Load Complete Data 

Once you've successfully tested your data migration process, verified mappings, and gained confidence in your approach, you're ready to proceed with loading your complete product dataset into BigCommerce.

### Pre-Migration checklist

* Remove all extraneous data (hidden products, unnecessary attributes) from your dataset  
* ⚠️ Disable or turn OFF any third-party applications that might automatically ingest product data  
* Verify you have sufficient API rate limits for your plan level  
* Consider scheduling your migration during off-peak hours to minimize potential platform congestion  
<Callout type="info">
If your source catalog undergoes regular updates which may coincide with your migration, consider implementing a data freeze or define a clear “cut-off” time to avoid missing late changes.
</Callout>
* Backup your source data before proceeding

<Callout type="important">
When performing large-scale migrations, it is essential to use structures that ensure data is not duplicated.

Use unique product identifiers to check if a product exists before retrying an API call to create it.

For batch uploads, log each product's status whenever possible to ensure complete migration.
</Callout>

### During migration

* Actively monitor for status error codes and implement your error handling protocols  
* Track progress through logging to ensure you transfer all products correctly.
* Maintain a separate record of any failed transfers for later remediation
<Callout type="warning">
BigCommerce enforces strict platform limits, such as maximum variants per product, image sizes, and total catalog size. Exceeding these can cause migration jobs to fail or result in incomplete imports. Review BigCommerce’s documentation on limitations before migration to avoid unexpected errors.
</Callout>

### Post-Migration verification

* Compare product counts between your source platform and BigCommerce  
* Spot-check a representative sample of products across different categories and types  
* Check that you have transferred complex products (those with variants, custom fields, or multiple images) correctly.
* Test product visibility and searchability on your storefront  
* Confirm pricing, inventory levels, and product relationships are accurate

### Next Steps

* Once product data is successfully transferred, proceed with migrating related data (customers, orders, etc.)  
* Document your migration process thoroughly for future reference or troubleshooting  
* Consider implementing a synchronization strategy or data freeze if you'll be operating both platforms simultaneously during transition

### Estimated time to transfer

The following table provides approximations of migration times for various catalog sizes. These estimates are based on platform limits and assumed catalog complexity. If you have a particularly complex catalog, your results will vary from these provisions.

Based on this information and the guidance provided above, plan your migration with enough time allotted to prevent issues.

| Resources | Estimated time (store with no live integrations) |
| :---- | :---- |
| > 5,000 with variants  | Around 1 hour |
| > 40,000 | Around  15 hours |
| > 300,000 | Around 100 hours |
| > 500,000+ | Recommended to work with our dedicated data migration services team on data processing  |

### FAQ
1. **How can I avoid creating duplicate products or corrupting my data if the migration is interrupted or retried?**

Ensure your migration script checks for existing products (by unique identifier, like SKU) before creating or updating records, so that repeated or retried requests don’t result in duplicates. Always use migration logs to track the status of each product upload and re-run only failed or incomplete batches.

2. **What should I do if the migration fails or needs to be reverted?**

Always make a full backup of your source data before starting the migration. If you encounter issues, use your migration logs to identify and remove or correct only the affected products in BigCommerce. For large rollbacks, you may need to restore from your backup or script deletions based on the IDs created during the migration. Document the rollback steps taken for future reference.

3. **How do I ensure that products, categories, brands, and images are properly linked after migration?**

Migrate related entities (such as categories, brands, and images) before importing products. Maintain a mapping between original and BigCommerce-assigned IDs for these entities, and update product references accordingly to ensure all links remain valid. After migration, verify all relationships and assignments are intact in the BigCommerce store.

4. **How can I verify that my migration is complete and accurate?**

In addition to product counts, use your migration logs to reconcile all transferred data. Perform spot checks on complex or critical products, and check that all related entities and references are present. Use API queries or platform reports to systematically verify catalog integrity.
### Resources
* [API Best Practices | BigCommerce Dev Center](https://developer.bigcommerce.com/docs/start/best-practices)  
* [API Rate Limits](https://developer.bigcommerce.com/api-docs/getting-started/api-rate-limits)  
* [Monitoring API Usage](https://developer.bigcommerce.com/api-docs/getting-started/monitoring-api-usage)  
* [Data Migration Services](https://www.bigcommerce.com/services/data-migration/)  
