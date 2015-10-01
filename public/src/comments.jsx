var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Комментарии</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">Комментарий 1</Comment>
        <Comment author="Jordan Walke">Комментарий 2</Comment>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <form action='/comments' method='POST'>
        <label for='name'>Имя</label>
        <input name='comment[name]'/>

        <label for='text'>Текст</label>
        <input name='comment[text]'/>

        <input type='submit'/>
      </form>
    );
  }
});

React.render(
  <CommentBox />,
  document.getElementById('content')
);