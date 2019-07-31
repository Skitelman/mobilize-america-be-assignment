# Sam Ghitelman's MobilizeAmerica BE Assignment

For the assignment I made an Express API backed by a MySQL database that can shorten links for a user. Currently it is running on my local machine, but it can be accessed via the following ngrok tunnel: `https://5cfbcb62.ngrok.io`.

## API Structure

The API has the following 4 endpoints:

#### POST `/link`

To create a new short link one must make an HTTP post request to `/link`. The destination of the new short link should be included in a `destinationUrl`
body param. There is also an optional `customUrl` body param that let's you specify a short url. If no customUrl is provided a random 7 character shortUrl will be created. A succesful request to this endpoint will return a JSON object containing a `data` object with the keys `destinationUrl` and `shortUrl`. For example, the following request:
```
curl -X POST -H "Content-Type:application/json" https://5cfbcb62.ngrok.io/link -d '{"destinationUrl": "www.nytimes.com","customUrl": "NYT"}'
```
would return:
```
{
"data": {
  "destinationUrl": "www.nytimes.com",
  "shortUrl":"https://5cfbcb62.ngrok.io/NYT"
  }
}
```

#### GET `/:shortUrl`

To use the shortened URL created above one simply visits the link returned by the creation request. So visiting `https://5cfbcb62.ngrok.io/NYT` will redirect to `http://www.nytimes.com`;

#### GET `/stats/:shortUrl`

One can also view some basic statistics about a link by visiting `/stats/:shortUrl`. This endpoint will return a JSON `data` object that has the following keys:

```
  "shortUrl": The short link in question
  "destinationUrl": The url that this shortlink will redirect to
  "linkCreatedAt": The time stamp for when the short link was created
  "totalLinkVisits": The total number of times this short link has been used
  "totalUniqueVisitors": The total number of unique (non-localhost) IPs that have accesssed this short link
  "linkVisitsByDay": A histogram of the number of visits to the short link by day. This returns an array of objects with the keys of data and total visits for that date.
```

For example, if I wanted to find statistics about the link created above I would call `curl -H "Content-Type:application/json" https://5cfbcb62.ngrok.io/stats/NYT` and I would recieve the following response:
```
{
  "data": {
    "shortUrl": "NYT",
    "destinationUrl": "www.nytimes.com",
    "linkCreatedAt": "2019-07-31T17:40:14.000Z",
    "totalLinkVisits": 1,
    "totalUniqueVisitors": 1,
    "linkVisitsByDay": [
      {
        "date": "2019-07-31",
        "total": 1
      }
    ]
  }
}
```

#### GET `generalStats/topLinks`

Finally the `/generalStats/topLinks` endpoint returns the top 5 most visited links across the app. The request `curl -H "Content-Type:application/json" https://5cfbcb62.ngrok.io/generalStats/topLinks` returns a JSON `data` object that has key `topLinks` pointing to an array of objects that has the `destinationUrl`, `shortUrl`, and `totalVisits` for the top 5 most used links in the app.
