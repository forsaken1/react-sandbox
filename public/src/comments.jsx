var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Комментарии</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} >
          {comment.text}
        </Comment>
      )
    });
    return (
      <div className="commentList">
        {commentNodes}
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

var data = [
  {author: "Петя Охотник", text: "Комментарий 1"},
  {author: "Вова Гулял", text: "Комментарий еще один"}
];

React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);