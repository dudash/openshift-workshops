# DC Metro Map Developer Notes
Notes for developers extending or fixing bugs in this sample code.

## API keys and MapBox Access Tokens
### Mapbox
My developer access token is included in this application - feel free to use it, please don't abuse it.  You can replace with your own by editing the views/dcmetro.jade file and replacing the line with "L.mapbox.accessToken = ...".  FYI it's a good rule of thumb to [rotate public access tokens][2].

### WMATA
The real-time bus locations feature requires an API key.  You should signup to get an API key for [WMATA developers here][1].  Using this key, update the routes/index.js file or use the WMATA_API_KEY environment variable.

WARNING: You are currently using my public key - please don't abuse this one either

You can see the results of a full query in the file exampledata.json

### Environment Variables
You can have some fun by setting a couple different environment variables.  Try BEERME=true and/or RAINBOW=true.

### Usage
      npm install; npm start

### Run nodeunit tests
      grunt nodeunit

Thanks for reading!
- Dudash

[1]: https://developer.wmata.com/developer
[2]: https://www.mapbox.com/help/rotate-access-token/
[3]: https://developer.wmata.com/demokey
