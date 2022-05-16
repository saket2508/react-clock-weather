## Clock/Weather App

- Made a simple clock/weather app to practise my React fundamentals.

- In the first commit, I used classes in place of functional components in the code, so my motive was to also understand how class based components in React work.

- Here is the [demo](https://hilarious-manatee-dc5f39.netlify.app/)

### Some salient features

- Requests for a user's current location, and when granted acess, shows the present weather conditions in that place.

- I have used the concept of debouncing to limit the number of requests that get sent furing search. The API only gets hit after a fixed interval of typing a character in the search bar. This will then show a list of results based on what a user types.

- Implemented a timer that updates the time on the screen every second.

- The background and weather icons change based on the weather conditions of a location.