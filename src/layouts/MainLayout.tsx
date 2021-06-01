import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from '../shared/Footer';
import Header from '../shared/Header';

// interface Props {
//   match: any;
// }

// export default class MainLayout extends React.Component<Props, any> {

//   render(){
//     const { match } = this.props;

//     return(
//       <>
//         <Header/>
//         <div className="containerWrapper_dashboard">
//           <Switch>
//             <Route exact path={`${match.path}`} component={DashboardPage} />
//             <Route path={`${match.path}/user`} component={userPage} />
//             <Route path={`${match.path}/package`} component={PackagePage} />
//             <Route path={`${match.path}/tracking_step`} component={TrackingStepPage} />
//             <Route path={`${match.path}/package_control`} component={PackageControlPage} />
//             <Route path={`${match.path}/shipping_service`} component={ShippingServicePage} />
//           </Switch>
//         </div>
//         <Footer />
//       </>
//     )
//   }
// }

// --------------------------------------------------------------------------

const MainLayout = ({children}: any) => {  
  return (
    <>
      <Header/>
      <div className="containerWrapper_dashboard">{children}</div>
      <Footer />
    </>
  )  
}  
  
const MainLayoutRoute = ({component: Component, ...rest}: any) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <MainLayout>  
          <Component {...matchProps} />  
      </MainLayout>  
    )} />  
  )  
};  
  
export default MainLayoutRoute;  
