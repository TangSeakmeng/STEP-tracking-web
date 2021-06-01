import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import Footer from '../shared/Footer';
import Header from '../shared/Header';

// interface Props {
//   match: any;
// }

//  export default class LoginLayout extends React.Component<Props, any> {
//   render() {
//     const { match } = this.props

//     return (
//       <>
//         <Header />
//         <Switch>
//           <Route exact path={`${match.path}`} render={(props) => <LoginPage {...props} /> } />
//         </Switch>
//         <Footer />
//       </>
//     )
//   }
// }

const LoginLayout = ({ children }: any) => (                         
  <>
    <Header />   
    {children }
    < Footer />
  </>  
);  

const LoginLayoutRoute = ({component: Component, ...rest}: any) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <LoginLayout>  
          <Component {...matchProps} />  
      </LoginLayout>  
    )} />  
  )  
};  

export default LoginLayoutRoute;  