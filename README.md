# Mars Mining Discovery Tournament


## My approach

I built off of the sample code and expanded the vanilla JavaScript to include all the data (ie. bots). I wanted to keep to vanilla Javascript since it is easy to deploy, with no setup needed. I refactored what I thought was not great performance-wise, such as the deleting of the cells one by one and replaced it with quicker innerHTML overwrites.

## Tradeoffs

I decided to not use React because of the time it would take to setup. 
I stuck to vanilla JavaScript, but in hindsight, I should have wrapped everything in a class.

I made the refresh function take in a string because I found that the API calls to get the nodes and bots handle the data received in a similar fashion. Doing so, allowed for DRY code. 

## Future goals

With more time I would've implemented:
   * Bots moving animation
   * Responsive grid sizing

The moving animation would probably take me quite a bit of time. I would probably implement React and keep track of a previous location state to achieve this. 

Responsive grid sizing based on browser sizes would take less time, but would require quite a bit of trying out different CSS styles to achieve that. 