require('../less/list.less');
var React = require('react');

var ListItem = React.createClass({
  getInitialState() {
    return {
      checked: false
    };
  },
  handleChange(e) {
    this.setState({
      checked: e.target.checked
    });
  },
  render() {
    return (
      <li className={this.props.className + ' list-item'}>
        <label>
          <input type="checkbox" className="list-item__tick"
              checked={this.state.checked}
              onChange={this.handleChange}
              />
          {' ' + this.props.value}
        </label>
      </li>
    );
  }
});

var List = React.createClass({
  render() {
    var items = [];
    for (var i = 1; i <= 4; i++) {
      items.push(i);
    }
    return (
      <section className="list">
        <h3 className="list__heading">Test list</h3>
        <ul className="list__content">{
          items.map((item, index) =>
            <ListItem key={index}
              value={'Item ' + item}
              className="list__item"/>
          )
        }</ul>
        <footer className="list__footer">
          <p className="list__notes">Footer notes</p>
        </footer>
      </section>
    );
  }
});

module.exports = List;
