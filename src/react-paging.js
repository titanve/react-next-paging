import React from "react";
import PropTypes from "prop-types";

class ReactNextPaging extends React.Component {
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
    initialitem: 0,
    lastitem: 10
  };

  componentDidMount() {
    const { items } = this.props;
    console.log(`items didMount: ${items}`);
    this.setState({
      nopages: Math.ceil(items.length / this.props.itemsperpage),
      noitems: items.length
    });
  }

  componentWillReceiveProps(nextProps) {
    let newinitialitem = (this.state.currentpage - 1) * nextProps.itemsperpage;
    let newlastitem = this.state.currentpage * nextProps.itemsperpage;
    this.setState({
      nopages: Math.ceil(nextProps.items.length / nextProps.itemsperpage),
      noitems: nextProps.items.length,
      initialitem: newinitialitem,
      lastitem: newlastitem
    });
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;

    if (items.length != prevProps.items.length) {
      this.setState({
        nopages: Math.ceil(items.length / this.props.itemsperpage),
        noitems: items.length
      });
    }
  }

  computeBackLimits = prevpage => {
    let newinitialitem = (prevpage - 1) * this.props.itemsperpage;
    let newlastitem = Math.abs(prevpage * this.props.itemsperpage);
    // console.log(
    //   `computeBackLimits() newinitialitem: ${newinitialitem} newlastitem: ${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  computeFwdLimits = nextpage => {
    let newinitialitem = (nextpage - 1) * this.props.itemsperpage;
    let newlastitem = nextpage * this.props.itemsperpage;
    // console.log(
    //   `computeFwdLimits() newinitialitem: ${newinitialitem} newlastitem: ${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  goBack = () => {
    // console.log(`goBack()`);
    if (this.state.currentpage > 1) {
      let prevpage = this.state.currentpage - 1;
      let newlimits = this.computeBackLimits(prevpage);
      // console.log(`goBack() new page: ${prevpage}`);
      this.setState({
        currentpage: prevpage,
        initialitem: newlimits.newinitialitem,
        lastitem: newlimits.newlastitem
      });
    }
  };

  goFwd = () => {
    // console.log(`goFwd()`);
    if (this.state.currentpage < this.state.nopages) {
      let nextpage = this.state.currentpage + 1;
      let newlimits = this.computeFwdLimits(nextpage);
      // console.log(`goFwd() new page: ${nextpage}`);
      this.setState({
        currentpage: nextpage,
        initialitem: newlimits.newinitialitem,
        lastitem: newlimits.newlastitem
      });
    }
  };

  render() {
    return (
      <tbody>
        {this.props.children(this.state)}
        {this.state.noitems > 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              <button onClick={this.goBack}>{"<"}</button>
              {` ${this.state.currentpage}/${this.state.nopages} `}
              <button onClick={this.goFwd}>{">"}</button>
            </td>
          </tr>
        ) : null}
      </tbody>
    );
  }
}

export default ReactNextPaging;
