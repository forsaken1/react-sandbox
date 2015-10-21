var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;

const App = React.createClass({
  render() {
    return (
      <nav class="navbar navbar-dark bg-primary">
        <Link to="/">Todo App</Link>
        <ul>
          <li><Link to="/todos">Todos</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {this.props.children}
      </nav>
    )
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Home = React.createClass({
  render() {
    return (
      <div>
        <h2>Home</h2>
        {this.props.children}
      </div>
    )
  }
})

const Todos = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

const Todo = React.createClass({
  render() {
    return
  }
})

const TodoList = React.createClass({
  render() {
    return
  }
})

const TodoNew = React.createClass({
  render() {
    return
  }
})

const TodoShow = React.createClass({
  render() {
    return
  }
})

const TodoEdit = React.createClass({
  render() {
    return
  }
})

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="todos" component={Todos}>
        <IndexRoute component={TodoList} />
        <Route path="new" component={TodoNew} />
        <Route path=":id" component={Todo} >
          <IndexRoute component={TodoShow} />
          <Route path='edit' component={TodoEdit} />
        </Route>
      </Route>
    </Route>
  </Router>
), document.body)