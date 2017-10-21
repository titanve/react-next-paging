import React from "react";
import PropTypes from "prop-types";

function composeEventHandlers(...fns) {
  return (event, ...args) =>
    fns.some(fn => {
      fn && fn(event, ...args);
      return event.defaultPrevented;
    });
}

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
    lastitem: 10,
    goBackBdisabled: true,
    goFwdBdisabled: true
  };

  static defaultProps = {
    itemsperpage: 10,
    items: []
  };

  componentDidMount() {
    const { items, itemsperpage } = this.props;
    // console.log(`items didMount: ${items}`);
    let newnopages = this.getNoPages(items, itemsperpage);
    this.setState({
      nopages: newnopages,
      noitems: items.length
    });
  }

  componentWillReceiveProps(nextProps) {
    let { currentpage } = this.state;
    let newnopages = this.getNoPages(nextProps.items, nextProps.itemsperpage);
    let newcurrentpage = currentpage;
    if (currentpage > newnopages) {
      newcurrentpage = 1;
    }
    let newinitialitem = (newcurrentpage - 1) * nextProps.itemsperpage;
    let newlastitem = newcurrentpage * nextProps.itemsperpage;
    this.setState({
      nopages: newnopages,
      noitems: nextProps.items.length,
      initialitem: newinitialitem,
      lastitem: newlastitem,
      currentpage: newcurrentpage,
      goBackBdisabled: this.goBackButtonState(newcurrentpage),
      goFwdBdisabled: this.goFwdButtonState(newcurrentpage, newnopages)
    });
  }

  componentDidUpdate(prevProps) {
    const { items, itemsperpage } = this.props;

    if (items.length != prevProps.items.length) {
      this.setState({
        nopages: this.getNoPages(items, itemsperpage),
        noitems: items.length
      });
    }
  }

  getNoPages = (items, itemsperpage) => {
    return Math.ceil(items.length / itemsperpage);
  };

  computeBackLimits = prevpage => {
    let { itemsperpage } = this.props;
    let newinitialitem = (prevpage - 1) * itemsperpage;
    let newlastitem = Math.abs(prevpage * itemsperpage);
    // console.log(
    //   `computeBackLimits() newinitialitem: ${newinitialitem} newlastitem: ${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  computeFwdLimits = nextpage => {
    let { itemsperpage } = this.props;
    let newinitialitem = (nextpage - 1) * itemsperpage;
    let newlastitem = nextpage * itemsperpage;
    // console.log(
    //   `computeFwdLimits() newinitialitem: ${newinitialitem} newlastitem: ${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  goBack = () => {
    // console.log(`goBack()`);
    let { currentpage, nopages } = this.state;
    if (currentpage > 1) {
      let prevpage = currentpage - 1;
      let newlimits = this.computeBackLimits(prevpage);
      // console.log(`goBack() new page: ${prevpage}`);
      this.setState({
        currentpage: prevpage,
        initialitem: newlimits.newinitialitem,
        lastitem: newlimits.newlastitem,
        goBackBdisabled: this.goBackButtonState(prevpage),
        goFwdBdisabled: this.goFwdButtonState(prevpage, nopages)
      });
    }
  };

  goFwd = () => {
    // console.log(`goFwd()`);
    let { nopages } = this.state;
    if (this.state.currentpage < nopages) {
      let nextpage = this.state.currentpage + 1;
      let newlimits = this.computeFwdLimits(nextpage);
      // console.log(`goFwd() new page: ${nextpage}`);
      this.setState({
        currentpage: nextpage,
        initialitem: newlimits.newinitialitem,
        lastitem: newlimits.newlastitem,
        goBackBdisabled: this.goBackButtonState(nextpage),
        goFwdBdisabled: this.goFwdButtonState(nextpage, nopages)
      });
    }
  };

  goBackButtonState = prevpage => {
    if (prevpage <= 1) {
      return true;
    } else {
      return false;
    }
  };

  goFwdButtonState = (nextpage, nopages) => {
    if (nextpage >= nopages) {
      return true;
    } else {
      return false;
    }
  };

  getBackButtonProps = ({ onClick, ...rest } = {}) => {
    const eventHandlers = {
      onClick: composeEventHandlers(onClick, this.goBack)
    };
    return {
      role: "button",
      ...eventHandlers,
      ...rest
    };
  };

  getFwdButtonProps = ({ onClick, ...rest } = {}) => {
    const eventHandlers = {
      onClick: composeEventHandlers(onClick, this.goFwd)
    };
    return {
      role: "button",
      ...eventHandlers,
      ...rest
    };
  };

  getStateAndHelpers() {
    const {
      nopages,
      currentpage,
      noitems,
      initialitem,
      lastitem,
      goBackBdisabled,
      goFwdBdisabled
    } = this.state;
    const { getBackButtonProps, getFwdButtonProps } = this;
    return {
      // prop getters
      getBackButtonProps,
      getFwdButtonProps,

      // state
      nopages,
      currentpage,
      noitems,
      initialitem,
      lastitem,
      goBackBdisabled,
      goFwdBdisabled
    };
  }

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

export default ReactNextPaging;
