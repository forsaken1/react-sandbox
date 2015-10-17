//import { Router, Route, Link } from 'react-router'

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>App</h1>
        {this.props.children}
      </div>
    )
  }
});

React.render((
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.body);