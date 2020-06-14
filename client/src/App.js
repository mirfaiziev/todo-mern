import React from 'react';
import 'materialize-css';
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";

function App() {
  const routes = useRoutes(false);
  return (
      <BrowserRouter>
          <div className="container">
            {routes}
          </div>
      </BrowserRouter>
  );
}

export default App;
