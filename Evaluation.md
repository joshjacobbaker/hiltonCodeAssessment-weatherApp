Good:

- Loading Animation is Cool

  - Both a loading infinite loop and a pulsing transparency effect on both "Loading..." text and circular loading bar

- "Fountainhead-Orchard Hills" was rendered without distorting the weather card
- "Bellair-Meadowbrook Terrace" was rendered without distorting the weather card
  Bad:

---

- Loading bar is a circle that moves assymetically with a wobble...
- There's no resolution for a prolonged query response and perhaps failure?

5XX HTTP ERROR CODE:

- If internet is down before server is running... we experience an Unhandled Runtime Error aka TypeError: NetworkError when attempting to make a request... however, after sometime, the error resolves and a Loading animation appears

- If internet goes down before making a connection -- no loading resolution -- but if internet comes backonline the api request is still live...

- If API server isn't responding
- Code doesn't handle HTTP 5XX Error Code (Server Error or No Internet Error)
- There's no re-fetch logic? Stuck in permanent loading loop...

---

---

200 HTTP response code

- Seeing smiley face flash before receiving the rendered weather card
