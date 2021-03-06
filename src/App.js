import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Navbar from './main/Navbar.js';
import Home from './main/Home.js';
import NewDay from './main/NewDay.js';
import Statistics from './main/Statistics.js'

import Login from './account/Login.js'
import Register from './account/Register.js'




function App() {
    return (
        <Router>
            <div className="content">
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
                    <Route exact path='/stats'>
                        <Navbar></Navbar>
                        <Statistics></Statistics>
                    </Route>
                </Switch>
            </div>
        </Router>
  );
}

export default App;
