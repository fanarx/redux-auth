import React, { Component } from 'react';
import { BrowserRouter as Router, Match} from 'react-router';
// import Home from './Home';
// import About from './About';
// import Topics from './Topics';
// import NotFound from './NotFound';
//import { Match, Link } from 'react-router';
import NavigationBar from './NavigationBar';
import Greetings from './Greetings';
import SignupPage from './signup/SignupPage';
import LoginPage from './login/LoginPage';
import FlashMessagesList from './flash/FlashMessagesList';
import NewEventPage from './events/NewEventPage';
import requireAuth from '../utils/requireAuth';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
            <NavigationBar />
            <FlashMessagesList />
            {/*<Greetings />*/}
          {/*<Router>
            <div>
              <ul>
                <li><Link to="/" href='/'>Home</Link></li>
                <li><Link to="/about" href='/'>About</Link></li>
                <li><Link to="/topics" href='/'>Topics</Link></li>
              </ul>
              <hr />
              <Match exactly pattern="/" component={Home} />
              <Match pattern="/about" component={About} />
              <Match pattern="/topics" component={Topics} />
              <Match pattern="/custom" component={Custom} />
              <Miss component={NotFound} />
            </div>
          </Router>*/}
              <Match exactly pattern="/" component={Greetings} />
              <Match pattern="/signup" component={SignupPage} />
              <Match pattern="/login" component={LoginPage} />
              <Match pattern="/new-event" component={requireAuth(NewEventPage)} />
        </div>
      </Router>
    );
  }
}

export default App;
