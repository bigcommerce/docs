---
title: Go Live and Delta Migration
keywords: bigcommerce delta migration, ecommerce data sync, delta migration process, bigcommerce go live, product catalog updates, incremental data migration, bigcommerce api, data reconciliation, ecommerce migration strategy, data integrity, post-migration validation, migration rollback, data synchronization, business continuity migration, bigcommerce best practices
---

## Go Live and Delta Migration 

While a complete "data freeze" during migration is ideal, we recognize that business continuity requirements often make this impractical. For this reason, a well-structured delta migration plan is essential.

<Callout type="info">
Delta migration is the process of transferring only the data that has changed (been added or updated) since your initial migration. This ensures your new BigCommerce store is up-to-date at go-live without requiring a full data reload.
</Callout>

### Delta Migration Timeline

* Schedule your delta migration to occur no more than 2 weeks after your BigCommerce go-live date 

<Callout type="important">
The closer your delta migration occurs to the actual go-live cutover, the less risk there is of missing critical last-minute data changes. If a full data freeze isn’t possible, minimize the delta window as much as operationally feasible.
</Callout>
 
* Consider multiple delta migrations for high-volume stores (e.g., 24 hours post-launch, 1 week post-launch, and final sweep)  
* Coordinate delta migrations during low-traffic periods to minimize impact on operations

### Delta Migration Process

* Utilize the same tooling and processes established during your initial migration  
* Focus only on net-new or modified data since your initial migration  
* Note that the Create Products API will automatically reject duplicate data that exactly matches existing records  
* For updated products, use the Update Product endpoint rather than Create Product to avoid duplication

<Callout type="info">
Delta migrations are subject to all the same API rate limits and catalog constraints as your initial migration. Always check for updated limits before running your delta to avoid unexpected failures.
</Callout>

### Data Reconciliation Strategy

* Implement a reliable method to identify which products were created or modified since your initial migration  
* Consider using timestamps, database flags, or changed-record logs to identify delta content  
* Create a verification process to ensure no critical data is missed between migrations

<Callout type="info">
Missing a change during delta migration can result in outdated or incorrect product information on your live store, impacting orders and customer experience. To mitigate, implement robust verification steps and schedule a final sweep before go-live.
</Callout>

### Business Operations During Transition

* Establish clear protocols for order processing during the transition period  
* Determine how inventory will be managed across both platforms until migration is complete  
* Create a communication plan for staff to understand which system is authoritative at each stage

### Contingency Planning

* Develop rollback procedures in case critical issues arise during go-live  
* Establish decision criteria for when to activate contingency plans  
* Prepare communication templates for both internal teams and customers if delays occur

### Post-Migration Maintenance

* Implement a regular data validation schedule to ensure ongoing data integrity  
* Document any manual adjustments made during the delta migration process  
* Create a standard operating procedure for future data synchronization needs

### FAQ
1. **How do I identify which products or data have changed since the initial migration?**

Use timestamps, change logs, or database flags from your source system to extract only records that have been created or modified since the initial migration. This ensures that only delta changes are considered for transfer.

2. **What is the safest way to prevent duplicate records during delta migration?**

Always check for existing records in BigCommerce using unique identifiers (such as SKU or product ID) before creating or updating records. Use the Update Product endpoint for modified records and Create Product only for new items.

3. **How should I handle conflicting updates between the source system and BigCommerce during the delta window?**

Establish clear rules for conflict resolution, such as “latest timestamp wins,” or flagging discrepancies for manual review. Communicate these rules to all stakeholders prior to migration.

4. **What should I do if an error or failure occurs during delta migration?**

Rely on detailed logging and migration status tracking to identify failed records. Retry only the failed operations using your logs, and ensure that your process is idempotent to avoid duplicate or partial updates.

5. **How can I verify that all intended changes were successfully migrated to BigCommerce?**

After the delta migration, compare the updated product counts, use spot checks on high-importance records, and reconcile migration logs with both source and destination systems to ensure that all intended changes are present.
### Resources
- [BigCommerce API Documentation](https://developer.bigcommerce.com/api-reference/)
- [API Rate Limits | BigCommerce Dev Center](https://developer.bigcommerce.com/api-docs/getting-started/api-rate-limits)
- [Best Practices for Data Migration | BigCommerce](https://developer.bigcommerce.com/docs/start/best-practices)
- [BigCommerce Webhooks Guide](https://developer.bigcommerce.com/api-docs/storefront/webhooks/overview)
- [Monitoring API Usage](https://developer.bigcommerce.com/api-docs/getting-started/monitoring-api-usage)
- [Data Migration Services | BigCommerce](https://www.bigcommerce.com/services/data-migration/)
- [BigCommerce Catalog API Reference](https://developer.bigcommerce.com/api-reference/store-management/catalog)
