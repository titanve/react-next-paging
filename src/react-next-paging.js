import React from "react";
import PropTypes from "prop-types";

function composeEventHandlers(...fns) {
  return (event, ...args) =>
    fns.some(fn => {
      fn && fn(event, ...args);
      return event.defaultPrevented;
    });
}

export const getNoPages = (items = [], itemsperpage) => {
  return Math.ceil(items.length / itemsperpage);
};

class ReactNextPaging extends React.Component {
  static propTypes = {
    children: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = this.generateStateFromProps(props);
  }

  static defaultProps = {
    itemsperpage: 10,
    items: []
  };

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      let { currentpage } = prevState;
      return this.generateStateFromProps(nextProps, currentpage);
    });
  }

  generateStateFromProps = (props, currentpage = 0) => {
    const { items, itemsperpage } = props;
    let newnopages = getNoPages(items, itemsperpage);
    let newcurrentpage = currentpage;
    if (currentpage > newnopages) {
      newcurrentpage = 1;
    }
    let newinitialitem = (newcurrentpage - 1) * itemsperpage;
    let newlastitem = newcurrentpage * itemsperpage;

    return {
      nopages: newnopages,
      noitems: items.length,
      initialitem: newinitialitem,
      lastitem: newlastitem,
      currentpage: newcurrentpage,
      goBackBdisabled: this.goBackButtonState(newcurrentpage),
      goFastBackBdisabled: this.goFastBackButtonState(newcurrentpage),
      goFwdBdisabled: this.goFwdButtonState(newcurrentpage, newnopages),
      goFastFwdBdisabled: this.goFastFwdButtonState(newcurrentpage, newnopages)
    };
  };

  componentDidUpdate(prevProps) {
    const { items, itemsperpage } = this.props;

    if (items.length != prevProps.items.length) {
      this.setState({
        nopages: getNoPages(items, itemsperpage),
        noitems: items.length
      });
    }
  }

  computeBackLimits = prevpage => {
    let { itemsperpage } = this.props;
    let newinitialitem = (prevpage - 1) * itemsperpage;
    let newlastitem = prevpage * itemsperpage;
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

  computeSelectedPageLimits = selpage => {
    let { itemsperpage } = this.props;
    let newinitialitem = (selpage - 1) * itemsperpage;
    let newlastitem = selpage * itemsperpage;
    // console.log(
    //   `computeFwdLimits() newinitialitem: ${newinitialitem} newlastitem: ${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  goToPage = (page, event) => {
    let { currentpage, nopages } = this.state;
    if (page > 0 && page <= nopages) {
      // let prevpage = currentpage - 1;
      let newlimits = this.computeSelectedPageLimits(page);
      // console.log(`goBack() new page: ${prevpage}`);
      this.setState({
        currentpage: page,
        initialitem: newlimits.newinitialitem,
        lastitem: newlimits.newlastitem,
        goBackBdisabled: this.goBackButtonState(page),
        goFastBackBdisabled: this.goFastBackButtonState(page),
        goFwdBdisabled: this.goFwdButtonState(page, nopages),
        goFastFwdBdisabled: this.goFastFwdButtonState(page, nopages)
      });
    }
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
        goFastBackBdisabled: this.goFastBackButtonState(prevpage),
        goFwdBdisabled: this.goFwdButtonState(prevpage, nopages),
        goFastFwdBdisabled: this.goFastFwdButtonState(prevpage, nopages)
      });
    }
  };

  goFastBack = () => {
    // console.log(`goBack()`);
    let { currentpage, nopages } = this.state;
    if (currentpage > 1) {
      let prevpage = 1;
      let newlimits = this.computeBackLimits(prevpage);
      // console.log(`goBack() new page: ${prevpage}`);
      this.setState({
        currentpage: prevpage,
        initialitem: newlimits.newinitialitem,
        lastitem: newlimits.newlastitem,
        goBackBdisabled: this.goBackButtonState(prevpage),
        goFastBackBdisabled: this.goFastBackButtonState(prevpage),
        goFwdBdisabled: this.goFwdButtonState(prevpage, nopages),
        goFastFwdBdisabled: this.goFastFwdButtonState(prevpage, nopages)
      });
    }
  };

  goFwd = () => {
    // console.log(`goFwd()`);
    let { nopages, currentpage } = this.state;
    if (currentpage < nopages) {
      let nextpage = this.state.currentpage + 1;
      let newlimits = this.computeFwdLimits(nextpage);
      // console.log(`goFwd() new page: ${nextpage}`);
      this.setState({
        currentpage: nextpage,
        initialitem: newlimits.newinitialitem,
        lastitem: newlimits.newlastitem,
        goBackBdisabled: this.goBackButtonState(nextpage),
        goFastBackBdisabled: this.goFastBackButtonState(nextpage),
        goFwdBdisabled: this.goFwdButtonState(nextpage, nopages),
        goFastFwdBdisabled: this.goFastFwdButtonState(nextpage, nopages)
      });
    }
  };

  goFastFwd = () => {
    // console.log(`goFwd()`);
    let { nopages, currentpage } = this.state;
    if (currentpage < nopages) {
      let nextpage = nopages * 1;
      let newlimits = this.computeFwdLimits(nextpage);
      // console.log(`goFwd() new page: ${nextpage}`);
      this.setState({
        currentpage: nextpage,
        initialitem: newlimits.newinitialitem,
        lastitem: newlimits.newlastitem,
        goBackBdisabled: this.goBackButtonState(nextpage),
        goFastBackBdisabled: this.goFastBackButtonState(nextpage),
        goFwdBdisabled: this.goFwdButtonState(nextpage, nopages),
        goFastFwdBdisabled: this.goFastFwdButtonState(nextpage, nopages)
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

  goFastBackButtonState = prevpage => {
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

  goFastFwdButtonState = (nextpage, nopages) => {
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

  getFastBackButtonProps = ({ onClick, ...rest } = {}) => {
    const eventHandlers = {
      onClick: composeEventHandlers(onClick, this.goFastBack)
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

  getFastFwdButtonProps = ({ onClick, ...rest } = {}) => {
    const eventHandlers = {
      onClick: composeEventHandlers(onClick, this.goFastFwd)
    };
    return {
      role: "button",
      ...eventHandlers,
      ...rest
    };
  };

  getSelPageButtonProps = ({ onClick, page, ...rest } = {}) => {
    const eventHandlers = {
      onClick: composeEventHandlers(onClick, event =>
        this.goToPage(page, event)
      )
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
      goFastBackBdisabled,
      goFwdBdisabled,
      goFastFwdBdisabled
    } = this.state;
    const {
      getBackButtonProps,
      getFastBackButtonProps,
      getFwdButtonProps,
      getFastFwdButtonProps,
      getSelPageButtonProps
    } = this;
    return {
      // prop getters
      getBackButtonProps,
      getFastBackButtonProps,
      getFwdButtonProps,
      getFastFwdButtonProps,
      getSelPageButtonProps,

      // state
      nopages,
      currentpage,
      noitems,
      initialitem,
      lastitem,
      goBackBdisabled,
      goFastBackBdisabled,
      goFwdBdisabled,
      goFastFwdBdisabled
    };
  }

  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

export default ReactNextPaging;
