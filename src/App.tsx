import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CVReader from "./components/CVReader";
import Favorkite from "./components/Favorkite";
import Header from "./components/Header";
import Todoist from "./components/Todoist";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "./App.css";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const hardcodedPassword = "MTIzNDU=";
    const encodedPassword = btoa(password);
    if (encodedPassword === hardcodedPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Password errata!");
    }
  };

  const routing = [
    {
      path: "/homepage",
      element: <CVReader />,
    },
    {
      path: "/favorkite",
      element: <Favorkite />,
    },
    //{
      //path: "/todoist",
      //element: <Todoist />,
    //},
  ];

  if (!isAuthenticated) {
    return (
      <div
        style={{
          margin: "0 auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: "-15rem",
          marginTop: "-15rem"
        }}
        className="w-30rem h-30rem min-h-screen bg-gray-100"
      >
        <Card
          className="shadow-4 w-96 p-6"
          style={{ borderRadius: "1rem", backgroundColor: "#ffffff" }}
        >
          <h2 className="text-center text-2xl mb-6 font-semibold">Login</h2>
          <div className="field mb-4">
            <span className="p-float-label w-full">
              <InputText
                id="password"
                type="password"
                className="w-full"
                placeholder=" "
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <label htmlFor="password">Inserisci la password</label>
            </span>
          </div>
          <Button
            label="Accedi"
            className="p-button-primary w-full"
            onClick={handleLogin}
          />
        </Card>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {routing.map((route: any) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
