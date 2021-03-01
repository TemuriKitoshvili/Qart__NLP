import './scss/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// configs
import ProtectedRoute from './components/configs/ProtectedRoute';
// state
import { useStateValue } from './components/state/stateProvider';
// components
import Header from './components/Header';
import Home from './components/Home';
import Console from './components/Console';
import Dashboard from './components/Dashboard';
import ErrorPage from './components/ErrorPage';

function App() {
  const [{ user, projects }, dispatch] = useStateValue();

  return (
    <div className='app'>
      <Router>
        <Header />
        <Switch>
          {/* public routes */}
          <Route exact path='/' component={Home} />

          {/* protected routes */}
          <ProtectedRoute
            path='/dashboard/:id'
            component={Dashboard}
            isAuth={user}
          />
          <ProtectedRoute
            exact
            path='/dashboard'
            component={Console}
            isAuth={user}
          />

          {/* error page */}
          <Route path='*' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
