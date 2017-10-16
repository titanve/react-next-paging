import React from "react";

class ReactPaging extends React.Component {
  state = { nopages: 0, currentpage: 1, noitems: 0, itemsperpage: 4 };

  componentDidMount() {
    const { items } = this.props;

    this.setState({
      nopages: Math.ceil(items.length / this.state.itemsperpage)
    });
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;

    if (items.length != prevProps.items.length) {
      this.setState({
        nopages: Math.ceil(items.length / this.state.itemsperpage)
      });
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.children(this.state)}</td>
      </tr>
    );
  }
}

export default ReactPaging;
