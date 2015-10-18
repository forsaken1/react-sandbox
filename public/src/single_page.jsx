var RouteHandler = ReactRouter.RouteHandler;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Router = ReactRouter.RouteHandler;

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

React.render(
  <Router>
    <Route path="/" component={App} />
  </Router>,
  document.getElementById('content')
);