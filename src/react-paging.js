import React from "react";

class ReactPaging extends React.Component {
  state = { nopages: 0, currentpage: 1, noitems: 0 };

  render() {
    return <div>{this.props.children(this.state)}</div>;
  }
}

export default ReactPaging;
