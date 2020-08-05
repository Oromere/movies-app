import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import DetailPage from "./components/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" render={(props) => <SearchPage />}></Route>
        <Route
          path="/details/:id"
          render={(props) => <DetailPage {...props} />}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
