import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import store from '../src/store/';
import { history } from './history';

/*PAGINAS*/
import Login from './view/login/index';
import Register from './view/register/index';
import Salon from '../src/view/salon';
import Kitchen from '../src/view/kitchen';
import Historic from '../src/view/historic';
import Readyorders from '../src/view/readyorders';
import { Provider } from 'react-redux';
import PrivateRoute from './utils/privateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact path='/salon' component={Salon} />
          <PrivateRoute exact path='/kitchen' component={Kitchen} />
          <PrivateRoute exact path='/historic' component={Historic} />
          <PrivateRoute exact path='/readyorders' component={Readyorders} />
          <Route component={() => <div>Essa página não existe!</div>} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;