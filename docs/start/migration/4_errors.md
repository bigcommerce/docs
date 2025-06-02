---  
title: Error Handling  
keywords: bigcommerce api, error handling, api status codes, data migration, exponential backoff, rate limits, batch endpoints, api retries, network errors, 4xx errors, 5xx errors, http response codes, api integration, logging best practices, troubleshooting  
---

## Error Handling

API operations at scale often return errors instead of successfully completing a given request. The BigCommerce API has two primary classes of error messages that can impact data migration: `4xx` and `5xx`.

For an in-depth list of the various status codes, including errors, and what they mean, see [API Status Codes](https://developer.bigcommerce.com/docs/start/about/status-codes).

### 5xx Error Codes

`5xx` status codes indicate server-side issues. These errors generally cannot be resolved by the client. For transient errors such as `500`, `502`, `503`, or `504`, implement exponential back-off retries, up to a set limit (e.g., 10 attempts), increasing the wait time between each retry. However, other `5xx` errors like `501` or `505` are persistent and should be logged and investigated rather than retried.

While rate limiting typically returns a `429`, you may occasionally receive a `500` for similar scenarios. Handle these with the same retry strategy. For more on handling server errors, see [API Request Architecture](https://developer.bigcommerce.com/docs/start/best-practices/integration-design#500-through-504-errors).

### 4xx Error Codes

`4xx` errors indicate malformed requests or invalid data. For automated operations, log and skip most `4xx` errors for later review, but note that some require immediate attention.

<Callout type="warning">  
Logging and skipping errors can lead to silent data loss. Always review error logs post-migration and generate a summary of skipped records for follow-up.  
</Callout>

Implement robust rate limiting for automated API calls to avoid exceeding [platform rate limits](https://developer.bigcommerce.com/docs/start/best-practices/api-rate-limits).

#### Status code `429`

The API returns this error when you exceed the platform rate limits.

* Once the API returns a `429` status, it will likely return `429` for subsequent requests unless the rate limit window elapses.  
* As a means to avoid this error, BigCommerce APIs include [rate limit headers](https://developer.bigcommerce.com/docs/start/about#bigcommerce-specific-response-headers) in responses that provide the information necessary for you to adjust call rates.  
* If you do receive a `429` status in your response, use either the `X-Rate-Limit-Time-Reset-Ms` or the `X-Retry-After` header from the response to wait before retrying the request.  
* For example, in PHP:

```php
$milliseconds = $response->getHeader("X-Rate-Limit-Time-Reset-Ms");
usleep($milliseconds * 1000);
```

<Callout type="info">  
If both `X-Retry-After` and `X-Rate-Limit-Time-Reset-Ms` are present, honor the longer of the two wait times.  
</Callout>

#### Status code `404`

The API returns this error either when a request’s path does not match an existing endpoint, when a provided parameter does not match existing data, or less commonly when the method of the request is invalid.

* If a `404` status is returned for individual API calls, this usually means that some referenced data does not match existing data. In general, this should be logged and skipped, including the exact path, body, and response of the request to investigate the cause later.

#### Batch Endpoints

When employing batch endpoints, for example [Update Products (Batch)](https://developer.bigcommerce.com/docs/rest-catalog/products#update-products-batch), there may be a single item that causes the whole request to fail. Often, the response for batch endpoints will include the index of the failed item. Use this index to remove the item from the request, then retry.

<Callout type="info">  
Not every batch endpoint identifies the index or indices of failed items. If the response doesn't specify which items failed in a batch request, you'll need to send each item in separate requests to identify and report the failures.

Do not assume the entire batch succeeded or failed. Process successful items, and retry or log errors for failed ones.  
</Callout>

#### Status code `422`

The API returns this error when a request is formatted incorrectly or contains invalid data.

* A `422` error should typically only occur during testing. If you see it during a large data migration, check your dataset and the data mapping for potential problems.  
* You can likely log and skip a single `422` error. However, repeated `422` errors indicate a persistent problem that you must fix before continuing the migration.

<Callout type="info">  
Implement thorough client-side validation before sending API requests. If you encounter repeated `422` errors during production data migration, treat this as a critical issue. Pause the migration, fix the data mapping, and only resume once the problem is resolved.  
</Callout>

<Tabs items={[`Example Bad Request`, `Example 422 Response`]}>  
<Tab>  
Below is an example of a malformed request to the endpoint [Update Products (Batch)](https://developer.bigcommerce.com/docs/rest-catalog/products#update-products-batch). Due to the requirements of the endpoint, a `422` status code is expected from this request.

```json
[
    {
        "name": "test1"
    },
    {
        "name": "test2"
    }
]
```

</Tab>  
<Tab>  
The following is an example `422` response, demonstrating the available information in such a response.

For this endpoint, the error response doesn't list the specific items that failed. Therefore, you'll have to separate the request into individual items and resend them.

In this particular case, the errors listed apply to each item, but that is not likely to be the case in general.

```json
{
    "status": 422,
    "title": "Missing Required Fields",
    "type": "https://developer.bigcommerce.com/api-docs/getting-started/api-status-codes",
    "errors": {
        "name": "Please provide a name.",
        "price": "Please provide a price.",
        "type": "Please provide a type.",
        "weight": "Please provide a weight."
    }
}
```

</Tab>  
</Tabs>

### FAQs

1. **What is the recommended strategy for implementing exponential backoff retries with the BigCommerce API?**

Use exponential backoff for retrying transient errors, starting with a short delay and doubling it after each failed attempt, up to a maximum number of retries (e.g., 10). Add a small random jitter to each delay to reduce collision risk. Always respect any `X-Retry-After` or other rate limit headers from the response.

2. **What headers should I monitor to avoid hitting rate limits, and how do I interpret them?**

Monitor response headers such as `X-Rate-Limit-Requests-Left`, `X-Rate-Limit-Time-Reset-Ms`, and `X-Retry-After`. These indicate how many requests remain and when you can resume making requests. Adjust your request rate accordingly to avoid being throttled or blocked. For more information, see [BigCommerce Specific Headers](https://developer.bigcommerce.com/docs/start/about#bigcommerce-specific-response-headers)

3. **What should I do if I repeatedly receive 422 errors for apparently valid data?**

Repeated 422 errors suggest a problem with your data or mapping logic. Pause your migration, review your data transformation, and ensure all required fields and formats match the API's expectations before resuming.

4. **How do I handle network errors or timeouts when communicating with the API?**

Implement generic error handling for network issues and timeouts. Retry failed requests using exponential backoff, and ensure your code checks for and gracefully handles situations where no response or a malformed response is received.

### Resources

- [API Status Codes](https://developer.bigcommerce.com/docs/start/about/status-codes)  
- [API Request Architecture – 5xx Errors](https://developer.bigcommerce.com/docs/start/best-practices/integration-design#500-through-504-errors)  
- [API Rate Limits](https://developer.bigcommerce.com/api-docs/getting-started/api-rate-limits)  
- [Catalog API Error Responses](https://developer.bigcommerce.com/api-reference/store-management/catalog/errors)  
- [API Client Libraries](https://developer.bigcommerce.com/docs/start/api-clients)  
- [Logging and Monitoring Best Practices](https://developer.bigcommerce.com/docs/start/best-practices/integration-design#logging-and-monitoring)  
- [BigCommerce Dev Community](https://developer.bigcommerce.com/community)  
- [MDN HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)  
- [Exponential Backoff and Jitter (AWS Blog)](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
