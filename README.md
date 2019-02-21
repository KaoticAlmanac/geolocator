# geolocator
Node Express website that creates an list from an rss feed based on language

◦ Changing the number of articles shown:
    ▪ Add a number with the number of articles you want shown and it will limit it to that
◦ Routes:
    ▪ /
        • This is the main page of the WebApp
            ◦ This gets the users ip, sends the ip to a iplocator third party application, it then takes the location and gets the language from a list of countries to languages in the world and returns the language. It then queries the server and gets the last 50 articles written in that language
    ▪ /english
        • This bypasses the ip stuff and just shows the English language
    ▪ /spanish
    ▪ /french
    ▪ /german
    ▪ /chinese
    ▪ /japanese
    ▪ /api
        • This returns a json of all of the articles based on your location
        • you can add /english and etc to get it in those specific languages and you can add limits like previously
