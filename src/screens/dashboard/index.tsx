import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import { SideBar } from "./components/sideBar";
import { Header } from "./components/header";

// screens
import { Home } from "./screens/home";
import { Parking } from "./screens/parking";
import { Accounting } from "./screens/accounting";
import { Users } from "./screens/users";
import { Permits } from "./screens/permits";
import { Violations } from "./screens/violations";
import { Hardware } from "./screens/hardware";
import { Messages } from "./screens/messages";
import { Forms } from "./screens/forms";
import { Settings } from "./screens/settings";

interface AdminState {
  name: string;
}

interface AdminProps {
  userName: string;
}

function Admin({ userName }: AdminProps) {
  const [state] = useState<AdminState>({
    name: userName,
  });

  return (
    <div className="md:flex md:min-h-screen md:min-w-full md:max-w-full">
      <Router>
        <SideBar />
        <div className="md:flex-grow md:bg-pk-light-gray md:px-8">
          <Header userName={state.name} />
          <Switch>
            <Route path="/parking">
              <Parking />
            </Route>
            <Route path="/accounting">
              <Accounting />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/permits">
              <Permits />
            </Route>
            <Route path="/violations">
              <Violations />
            </Route>
            <Route path="/hardware">
              <Hardware />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/forms">
              <Forms />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Admin;
