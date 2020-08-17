import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';

// component imports
import Sample from '../Components/Sample'

function App() {
  return (
    <div className="App">
      < Sample/>

      {/* put nav into its own component */}
      <Router>
      <ul>
        <li><Link to="/">main</Link></li>
        <li><Link to="/list">list</Link></li>
      </ul>
      {/* routing */}

        <div>
          {/* <Route exact path="/" component={Main} />
          <Route path="/list" component={List} /> */}
        </div>
        
      </Router>

    </div>
  );
}

export default App;
