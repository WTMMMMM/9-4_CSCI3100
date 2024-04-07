import { RouterProvider } from "react-router-dom";
import router from "../router/router";
import React from "react";
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;