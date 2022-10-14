import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "isomorphic-unfetch";
import "@testing-library/jest-dom";
import App from "./index";
import { KtoF } from "../components/city-weather-refactor";

const server = setupServer(
  rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
    return res(
      ctx.json({
        weather: [
          {
            description: "Overcast clouds"
          }
        ],
        main: {
          // temp in Kelvin
          temp: 295.372
        }
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it shows weather results", async () => {
  render(<App />);
  // todo: write some assertions
  //Weather Search Component:
  let inputNode = screen.getByTestId("weather-input");
  expect(inputNode).toBeInTheDocument();
  let buttonNode = screen.getByTestId("button");
  userEvent.type(inputNode, "Seattle");
  userEvent.click(buttonNode);
  // Weather Response Component:
  expect(await screen.findByTestId("card")).toBeInTheDocument();

  let weatherDescriptionText = await screen.findByTestId("weather");
  let tempKelvinText = await screen.findByTestId("temperature");
  expect(weatherDescriptionText).toBeInTheDocument();
  expect(tempKelvinText).toBeInTheDocument();
  expect(weatherDescriptionText.textContent).toBe("Overcast clouds");
  expect(KtoF(295.372).toFixed(0)).toBe("72");
});

test("handles server error", async () => {
  render(<App />);
  server.use(
    // override the initial "GET /greeting" request handler
    // to return a 500 Server Error
    rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  // Weather Search Component
  let inputNode = screen.getByTestId("weather-input");
  expect(inputNode).toBeInTheDocument();
  let buttonNode = screen.getByTestId("button");
  userEvent.type(inputNode, "Seattle");
  userEvent.click(buttonNode);
  // Weather Response Component
  let error = await screen.findByTestId("error");
  expect(error).toBeInTheDocument();
});

test("Response from API of City that doesn't exist...", async () => {
  render(<App />);
  server.use(
    // override the initial "GET /greeting" request handler
    // to return a 404 Server City not found
    rest.get("https://api.openweathermap.org/*", (req, res, ctx) => {
      return res(ctx.json({ cod: "404" }));
    })
  );
  // Weather Search Component
  let inputNode = screen.getByTestId("weather-input");
  expect(inputNode).toBeInTheDocument();
  let buttonNode = screen.getByTestId("button");
  userEvent.type(inputNode, "Gibberish");
  userEvent.click(buttonNode);
  // Weather Response Component
  let htmlNode = await screen.findByTestId("cityDoesNotExist");
  expect(htmlNode).toBeInTheDocument();
});

test("Aria screenreader alert is in DOM for accessibility", async () => {
  render(<App />);
  // Weather Search Component
  let inputNode = screen.getByTestId("weather-input");
  expect(inputNode).toBeInTheDocument();
  let buttonNode = screen.getByTestId("button");
  userEvent.type(inputNode, "New York");
  userEvent.click(buttonNode);
  // Weather Response Component
  let error = await screen.findByTestId("ariaAlert");
  expect(error).toBeInTheDocument();
});
