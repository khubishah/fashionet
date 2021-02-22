import React, {useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { GlobalStyle } from './global.styles';
import { connect } from 'react-redux';

import Header from './components/header/header.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
const HomePage = lazy(() => import('./pages/homepage/homepage.component')); 
const ShopPage = lazy(() => import('./pages/shop/shop.component')); 
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component.jsx')); 
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')); 

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  // componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession();
    
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     userRef.onSnapshot(snapShot => {
    //       // set state
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   }
    //   setCurrentUser(userAuth);
    //   //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) =>({title, items})));
    // });
  // }


    return (
      <div>
        <GlobalStyle />
        <Header/>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </div>
    );

  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
