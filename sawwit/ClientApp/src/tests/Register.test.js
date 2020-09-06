import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Register } from "../views/Register";
import { render, unmountComponentAtNode } from "react-dom";
import { act, mockComponent, isElement } from "react-dom/test-utils";

/*********             *********/
/*********  Rendering  *********/
/*********             *********/
let container = null;
beforeEach(() => {
  container = document.createElement("div");

  // setup a DOM element as a render target
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders without crashing", async () => {
  ReactDOM.render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>,
    container
  );
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
});

//When writing UI tests, tasks like rendering, user events, or data fetching can be considered as “units” of interaction with a user interface.
test("units of interaction with user", async () => {
  act(() => {
    // render components
    render(<Register />, container);
  });

  const Typography = container.querySelector("#heading");
  console.log(Typography.textContent);
  expect(Typography.textContent).toBe("Register");
  expect(document.title).toBe("");
});

test("renders without crashing", async () => {
  ReactDOM.render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>,
    container
  );
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
});

//When writing UI tests, tasks like rendering, user events, or data fetching can be considered as “units” of interaction with a user interface.
//React provides a helper called act() that makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions: (make sure updates take place before testing)
test("units of interaction with user", async () => {
  act(() => {
    // render components
    render(<Register />, container);
  });

  const Typography = container.querySelector("#heading");
  console.log(Typography.textContent);
  expect(Typography.textContent).toBe("Register");
  expect(document.title).toBe("");
});

/*********                 *********/
/*********  Data Fetching  *********/
/*********                 *********/