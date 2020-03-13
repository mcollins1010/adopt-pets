import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";

//first component(App) which ret a markup
const App = () => {
  //y use function calls instead html below, cuz its imperative code executed
  // it give JS d power to manipulate the data
  return (
    <React.StrictMode>
      <div>
        <h1 id="something-important"> Adop Me</h1>
        <SearchParams />
      </div>
    </React.StrictMode>
  );
};
//now we render the App component
render(
  <App />,
  document.getElementById("root") //from the div tag in index.html
  //takes either a string or a component
);
