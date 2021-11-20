import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './component/footer';
import Header from './component/header';
import Home from './component/home';
import TheTeam from './component/TheTeam';
import SignIn from './component/Signin';
import Dashboard from './component/Admin/Dashboard';
import AuthGuard from './Hoc/Auth';
import AdminPlayers from './component/Admin/players';
import AddEditPlayers from './component/Admin/players/AddEditPlayers';

function Routes({ user }) {
  return (
    <BrowserRouter>
      <Header user={user} />
      <Switch>
        <Route
          path='/admin_players/edit_player/:playerid'
          component={AuthGuard(AddEditPlayers)}
        />
        <Route
          path='/admin_players/add_player'
          component={AuthGuard(AddEditPlayers)}
        />
        <Route path='/admin_players' component={AuthGuard(AdminPlayers)} />
        <Route path='/dashboard' component={AuthGuard(Dashboard)} />
        <Route path='/the_team' component={TheTeam} />
        <Route
          path='/sign_in'
          exact
          component={(props) => <SignIn {...props} user={user} />}
        />
        <Route path='/' component={Home} />
      </Switch>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
