import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import { useStateValue } from './context/StateProvider';
import { setAuthUser } from './context/actions';

function App() {
  //getting data layer here to use dispatch ... update state in data layer
  const [state, dispatch] = useStateValue();

  useEffect(()=>{
    //const unsubscribe = 
  }, [])


  return (
    <div className="App">
      <Router>
        <Switch>
        {localStorage.token && 
          <Route path="/" exact>
              <Dashboard />
          </Route>
        } 
          <Route path="/login" component={Login}>
          </Route>
          <Route path="/register"omponent={Login}>
          </Route>
        {localStorage.token && 
            <Route path="/dashboard">
              <Dashboard />
            </Route>
        }
          {!localStorage.token && 
            <Redirect from="/" to="/login" />
          }
          {!localStorage.token && 
            <Redirect from="/dashboard" to="/login"/>
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
