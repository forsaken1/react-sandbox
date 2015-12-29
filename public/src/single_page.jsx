let Provider = ReactRedux.Provider;

// Actions

/*
 * типы действий
 */

const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * другие константы
 */

const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * генераторы действий
 */

function addTodo(text) {
  return { type: ADD_TODO, text };
}

function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
}

function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

// Redusers

function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [...state, {
      text: action.text,
      completed: false
    }];
  case COMPLETE_TODO:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

const todoApp = Redux.combineReducers({
  visibilityFilter,
  todos
});

// Components

class App extends React.Component {
  render() {
    // Получено благодаря вызову connect():
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    );
  }
}

App.propTypes = {
  visibleTodos: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired
  })),
  visibilityFilter: React.PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};

function selectTodos(todos, filter) {
  switch (filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(todo => todo.completed);
  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(todo => !todo.completed);
  }
}

// Какие именно props мы хотим получить из приходящего, как аргумент,глобального состояния?
// Обратите внимание: используйте https://github.com/faassen/reselect для более лучшей производительности.
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}

class AddTodo extends React.Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
      </div>
    );
  }

  handleClick(e) {
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }
}

AddTodo.propTypes = {
  onAddClick: React.PropTypes.func.isRequired
};

class Footer extends React.Component {
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name;
    }

    return (
      <a href='#' onClick={e => {
        e.preventDefault();
        this.props.onFilterChange(filter);
      }}>
        {name}
      </a>
    );
  }

  render() {
    return (
      <p>
        Show:
        {' '}
        {this.renderFilter('SHOW_ALL', 'All')}
        {', '}
        {this.renderFilter('SHOW_COMPLETED', 'Completed')}
        {', '}
        {this.renderFilter('SHOW_ACTIVE', 'Active')}
        .
      </p>
    );
  }
}

Footer.propTypes = {
  onFilterChange: React.PropTypes.func.isRequired,
  filter: React.PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};

class Todo extends React.Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer'
        }}>
        {this.props.text}
      </li>
    );
  }
}

Todo.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired
};

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo, index) =>
          <Todo {...todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)} />
        )}
      </ul>
    );
  }
}

TodoList.propTypes = {
  onTodoClick: React.PropTypes.func.isRequired,
  todos: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired
  }).isRequired).isRequired
};

// Entry point

let store = Redux.createStore(todoApp);
let rootElement = document.getElementById('content');

React.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);