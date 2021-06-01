import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import logo from './assets/react.png';

import LoginLayoutRoute from './layouts/LoginLayout';
import MainLayoutRoute from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';

import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFound';
import userPage from './pages/user-pages/UserPage';
import PackagePage from './pages/package-pages/PackagePage';
import TrackingProgressPage from './pages/tracking-progress-pages/TrackingProgressPage';
import ShippingServicePage from './pages/shipping-service-pages/ShippingServicePage';
import ShippingControlPage from './pages/shipping-pages/ShippingControlPage';
import ShippingDetailPage from './pages/shipping-pages/ShippingDetailPage';
import ShippingTrackingPage from './pages/shipping-pages/ShippingTrackingPage';

const App = () => {
  return (
    <Router>
      <Switch>

        {/* <Route exact path="/" render={(props) => <LoginLayout {...props} /> } /> */}
        {/* <Route path="/login" render={(props) => <LoginLayout {...props} /> } /> */}
        {/* <Route path='/dashboard' render={(props) => <MainLayout {...props} />} /> */}

        <Route exact path="/"><Redirect to="/login" /></Route>
        <LoginLayoutRoute path="/login" component={LoginPage} />  
        <MainLayoutRoute path="/dashboard" component={DashboardPage} />
        <MainLayoutRoute path="/user" component={userPage} />
        <MainLayoutRoute path="/package" component={PackagePage} />
        <MainLayoutRoute path="/tracking_progress" component={TrackingProgressPage} />
        <MainLayoutRoute path="/shipping_control" component={ShippingControlPage} />
        <MainLayoutRoute path="/shipping_detail" component={ShippingDetailPage} />
        <MainLayoutRoute path="/shipping_tracking" component={ShippingTrackingPage} />
        <MainLayoutRoute path="/shipping_service" component={ShippingServicePage} />

        <Route path="*" component={NotFoundPage} />

      </Switch>
   </Router>
  );
}

export default App;
