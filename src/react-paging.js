import React from "react";
import PropTypes from "prop-types";

class ReactPaging extends React.Component {
  static propTypes = {
    children: PropTypes.func
  };

  constructor(...args) {
    super(...args);
  }

  state = {
    nopages: 0,
    currentpage: 1,
    noitems: 0,
    itemsperpage: 4,
    initialitem: 0
  };

  componentDidMount() {
    const { items } = this.props;
    console.log(`items didMount: ${items}`);
    this.setState({
      nopages: Math.ceil(items.length / this.state.itemsperpage),
      noitems: items.length
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nopages: Math.ceil(nextProps.items.length / this.state.itemsperpage),
      noitems: nextProps.items.length
    });
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;

    if (items.length != prevProps.items.length) {
      this.setState({
        nopages: Math.ceil(items.length / this.state.itemsperpage),
        noitems: items.length
      });
    }
  }

  render() {
    return (
      <tbody>
        {this.props.children(this.state)}
        {this.state.noitems > 0 ? (
          <tr>
            <td colSpan="5">{`No. paginas: ${this.state.nopages}`}</td>
          </tr>
        ) : null}
      </tbody>
    );
  }
}

export default ReactPaging;
