const Route = ReactRouter.Route;
const Router = ReactRouter.Router;
const Link = ReactRouter.Link;
const IndexRoute = ReactRouter.IndexRoute;
const createBrowserHistory = History.createHistory;

const App = React.createClass({
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-dark bg-primary">
          <div className="collapse navbar-toggleable-xs">
            <Link className="navbar-brand" to="/">Todo App</Link>
            <ul className="nav navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/todos">Todos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
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
    return <h3>Todos {this.props.params.id}</h3>
  }
})

const Todo = React.createClass({
  render() {
    return
  }
})

const TodoList = React.createClass({
  render() {
    return (
      <Link to="/todos/new" className=""><Link/>
    )
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
  <Router history={createBrowserHistory()}>
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