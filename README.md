# foodscraper

Node back-end server for scraping available food deals across food delivery apps in Singapore.
Use ``` npm start``` to start the server.
By default, foodscraper runs on port 8000.

##Usage
Disclaimer: capitalized words inside the code blocks indicate the values stored with the key, which is written in camelCase form.

### Get Featured Restaurants
Send a HTTP POST request to the server with the following stringified JSON body:
```
{postalCode : "YOURPOSTALCODE"}
```
The response body will contain an array of JavaScript objects defined as followed:

```
{restaurantName: RESTAURANTNAME,
restaurantUrl: RESTAURANTURL,
timeAway: TIMEAWAY,
ImageUrl: IMAGEURL
}
```

### Search for a Particular Dish/Cuisine
Send a HTTP POST request to the server with the following stringified JSON body:
```
{postalCode: "YOURPOSTAlCODE",
searchPhrase: "SEARCHPHRASE"}
```

Similarly, the response body will contain an array of JavaScript objects defined as followed:
```
{restaurantName: RESTAURANTNAME,
restaurantUrl: RESTAURANTURL,
timeAway: TIMEAWAY,
ImageUrl: IMAGEURL
}
```

### Retrieve the Menu of A Particular Restaurant
Send a HTTP POST request to the server with the following stringified JSON body:
```
{restaurantUrl: "YOURRESTAURANTURL"}
```

The response body will contain a an array of JavaScript objects defined as followed:
```
{dishName: DISHNAME,
dishUrl: DISHURL,
price: PRICE}
```
