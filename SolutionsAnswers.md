## Hilton Dev Assessment

For this code assessment, we expect you to make the changes listed in the `Deliverables` sections and then email us the link to your codesandbox instance that has your changes. (As soon as you make a change and save it, it will fork this project and create a unique url for you).

## Setup

You need to sign up for an OpenWeather API key. Instructions are here: https://openweathermap.org/appid

After you get your API, add that as API_KEY in city-weather.tsx

- Signed-up for OpenWeather Account
- Added API_KEY to city-weather.tsx and referenced global value in API URL request.
- Recreated bug

## Mock bug report

Steps to reproduce:

1. Type a valid US city in the "Weather Search" box
1. Press {enter}

Expected results
User should see the current weather results for that city

Actual Results:
App crashes

## Deliverable 1:

1. Fix the bug

   - Treating this like a bug ticket, identify the bug in the application and provide a fix.
     ################################################
     RESOLVED BUG / WEBSITE NOW WORKING PROPERLY
     ################################################

2. Talk about your changes
   - Write a short description about what was the underlying cause of the bug and how you fixed it
     ################################################
     ***
     Bug: (JavaScript Error)
     TypeError: Cannot read properties of undefined (reading 'temp')
     Solution:
     The city-weather component was mounting the application with state initialized to null, before being updated by our API request, the null value would be passed into our KtoF function and would result in an uncaught type error and crash our application. I provided optional chaining operators inbetween the state variable and it's properties to catch any undefined or null values i.e. "?."
     ***
     Bug: (TypeScript Error)
     KtoF function was used before it was defined
     Solution:
     Moved the KtoF function above the React Component Function, which would allow it to be defined before being run later in the script.
     ***
     ################################################

## Deliverable 2:

1. Create a city-weather-refactor.tsx file, in which you refactor the city-weather component to use react hooks rather than React.Component. Incorporate the following:

   ################################################

   ***

   Task:
   Refactor React Class Component to React Function Component
   Solution:

   - class constructor function > function signature
   - componentDidMount method > useEffect(, [])
   - this.state property > useState()

   ***

   ################################################

   1. Match the design

      - A designer has provided a comp on how this app should look (see design.png)
        - To match the design you may need to use different fields that are retuned from teh openweathermap API. For example, the weather condition three digit code can be [mapped to the icons here](https://openweathermap.org/weather-conditions)
      - Tailwindcss is installed and configured for you

        ################################################

      ***

      Task:
      Style app after design.png document
      Solution:

      - Leveraged TailWindCSS className declarative styles
      - No native css styling was used
      - Only TailWindCSS classes

      ***

      ################################################

   2. Improve web accessibility - Ensure that clicking on the label "Weather Search" puts focus into the text-input.
      ################################################
      ***
      Task:
      When clicking on Weather Search label, user will be auto-focused to input text box.
      Solution:
      Connected our Weather Search label to our input, by providing an htmlFor="weather-input" attribute on our HTLM-label and id="weather-input" on our HTML-input.
      ***
      ################################################ - Make sure any loading states are correctly announced to a screen reader
      ################################################
      ***
      Task:
      Ensure application is accessible for those who are unsighted, etc.
      Solution:
      - Provided HTML aria attribute property's to alert the user's screen reader to the updates that may take place upon calling the API via the Weather Search input and Submit button
      - Provided HTML alt descriptions for screen reader on <img> tags i.e. alt="Current weather conditions in the city you're searching"
      ***
      ################################################
   3. Make the tests better

      - There was a test written for this feature but it clearly didn't catch the bug, make the test better (you can open a new terminal in the bottom right of code sandbox and `yarn test`)
        ################################################

      ***

      Task:
      Test edge cases i.e. Server responding with 200 and 500 status codes
      Solution:

      - When server responds with 200 status code, we receive the mocked server api response payload and render HTML and requested data on the page,
      - but when the server responds with a 500 status code, we render HTML and an error on the page.
      - If we the server response doesn't error, but we didn't receive city-weather relevant data--return text that says "The city you're looking for might not exist?"

      ***

      ################################################

2. Talk about your changes

   - For the refactor and other accompanying tasks, include any other thoughts, assumptions, or known compromises in how you approached the work.

     ################################################

     ***

My goal was to model a MVP (Minimal Viable Product),
where I overlooked handling user input for capitalization,
spelling errors, for cities that can be found in our API, etc.

There's SO much that can be done to improve this feature. It's a "work-in-progress" ha...

Haven't refactored or documented my code for readability, maintainability, etc.

I didn't provide any micro-interactions
throughout the API request life-cycle.

I could've cached the users results in a hash table,
thus reducing the load on our API, if the user
wanted to re-query a city.

I overlooked the ordering of the TailWindCSS class names within our markup,
which would allow for better maintainability.

I could've tested more edge cases, like if a user were
to request an unknown city, and respond with a code other than a 200 or 500.

I could've built out our user interface to display appropriate markup in the event of a response other than a status code of 200.

There are many things I didn't take into consideration,
but I did meet our MVP requirements for the time being.
These other potential deliverables might be brought up in
a scrum meeting with the other developers, scrum master,
and product owner.

Could've used React-Query to handle fetch calls, loading status, etc.

Imported @testing-library/jest-dom to help assert components were in the dom.

      ***

      ################################################
