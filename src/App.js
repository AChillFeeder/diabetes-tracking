import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Navbar from './main/Navbar.js';
import Home from './main/Home.js';
import NewDay from './main/NewDay.js';

import Login from './account/Login.js'
import Register from './account/Register.js'

import DayDetails from './previousDays/DayDetails.js'



function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path='/'>
                        <Login></Login>
                    </Route>
                    <Route exact path='/register'>
                        <Register></Register>
                    </Route>
                    <Route exact path='/home'>
                        <Navbar></Navbar>
                        <Home></Home>
                    </Route>
                    <Route exact path='/new-day'>
                        <Navbar></Navbar>
                        <NewDay></NewDay>
                    </Route>
                    <Route exact path='/day/:id'>
                        <Navbar></Navbar>
                        <DayDetails></DayDetails>
                    </Route>
                </Switch>
            </div>
        </Router>
  );
}

export default App;
