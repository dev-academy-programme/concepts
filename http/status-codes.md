# HTTP Status Codes

It is important to always send back the appropriate status codes with your API response. The following table includes some of the possible HTTP status codes:

<table>
  <thead>
    <th>HTTP Status Code</th>
    <th>Status</th>
    <th>Description</th>
  </thead>

  <tbody>
    <tr>
      <td>200</td>
      <td>OK (Immediate response)</td>
      <td>The request was a success and the response includes the requested data.</td>
    </tr>

    <tr>
      <td>202</td>
      <td>OK (Immediate response)</td>
      <td>The request was received and queued for processing, but not yet processed. Usually in the case of a POST request</td>
    </tr>

    <tr>
      <td>400</td>
      <td>Bad Request</td>
      <td>The request was malformed or unexpected.</td>
    </tr>

    <tr>
      <td>401</td>
      <td>Unauthorized</td>
      <td>The request did not include a valid API key</td>
    </tr>

    <tr>
      <td>404</td>
      <td>Not Found</td>
      <td>The requested resource was not found.</td>
    </tr>

    <tr>
      <td>429</td>
      <td>Too Many Requests</td>
      <td>The rate limit has been reached for this API key.</td>
    </tr>

    <tr>
      <td>500</td>
      <td>Internal Server Error</td>
      <td>The request could not be fulfilled due to an unexpected error.</td>
    </tr>

  </tbody>
</table>

For a more comprehensive list of status codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

