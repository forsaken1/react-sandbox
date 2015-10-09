var FilterableProductList = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },
  componentDidMount: function() {
    $.get(this.props.url, null, function(data) {
      this.setState({ data: data });
    }.bind(this));
  },
  handleChange: function(event) {
    $.get(this.props.url, { search_text: event.target.value }, function(data) {
      this.setState({ data: data });
    }.bind(this));
  },
  render: function() {
    return (
      <div class='filterableBlock'>
        <SearchBar url={this.props.url} handleChange={this.handleChange} />
        <ProductList data={this.state.data} />
      </div>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <div class='searchBlock'>
        <input ref='search' onChange={this.props.handleChange} />
      </div>
    );
  }
});

var ProductList = React.createClass({
  render: function() {
    var productRows = this.props.data.map(function(product, i) {
      return (
        <ProductRow iterator={i + 1} product={product} />
      );
    });
    return (
      <table>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Цена</th>
        </tr>
        {productRows}
      </table>
    );
  }
});

var ProductRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.iterator}</td>
        <td>{this.props.product.title}</td>
        <td>{this.props.product.count}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

React.render(
  <FilterableProductList url='/products' />,
  document.getElementById('content')
);