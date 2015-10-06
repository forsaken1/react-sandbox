var FilterableProductTable = React.createClass({
  render: function() {
    return (
      <div class='filterableBlock'>
        <SearchBar />
        <ProductTable />
      </div>
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      <div class='searchBlock'>
        <input ref='search' />
      </div>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    return (

    );
  }
});

var ProductRow = React.createClass({
  render: function() {
    return (

    );
  }
});