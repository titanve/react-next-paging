import React, { useState } from "react";

const useReactNextPaging = (items, itemsperpage, pagesspan) => {
  const [pagesforarray, setPagesforarray] = useState(10);
  const [inipagearray, setInipagearray] = useState(1);
  const [nopages, setNopages] = useState(1);
  const [noitems, setNoitems] = useState(1);
  const [initialitem, setInitialitem] = useState(1);
  const [lastitem, setLastitem] = useState(10);
  const [currentpage, setCurrentpage] = useState(1);
  const [goBackBdisabled, setGoBackBdisabled] = useState(true);
  const [goFastBackBdisabled, setGoFastBackBdisabled] = useState(true);
  const [goFwdBdisabled, setGoFwdBdisabled] = useState(true);
  const [goFastFwdBdisabled, setGoFastFwdBdisabled] = useState(true);

  React.useEffect(() => {
    generateStateFromProps();
  }, []);

  const getNoPages = (items = [], itemsperpage) => {
    return Math.ceil(items.length / itemsperpage);
  };

  const getHalfPagesArray = (pagesforarray) => {
    return Math.floor(pagesforarray / 2);
  };

  const isNoPagesLargerPagesSpan = (nopages, pagesspan) => {
    return nopages > pagesspan;
  };

  const isNoEven = (no) => {
    return no % 2 === 0;
  };

  const generateStateFromProps = (currentpage = 1) => {
    let newnopages = getNoPages(items, itemsperpage);
    let newcurrentpage = currentpage;
    if (currentpage > newnopages) {
      newcurrentpage = 1;
    }
    let newinitialitem = (newcurrentpage - 1) * itemsperpage;
    let newlastitem = newcurrentpage * itemsperpage;
    let pagesforarray = isNoPagesLargerPagesSpan(newnopages, pagesspan)
      ? pagesspan
      : newnopages;
    setPagesspan(pagesspan);
    setInipagearray(1);
    setPagesforarray(pagesforarray);
    setNopages(newnopages);
    setNoitems(items.length);
    setInitialitem(newinitialitem);
    setLastitem(newlastitem);
    setCurrentpage(newcurrentpage);
    setGoBackBdisabled(this.goBackButtonState(newcurrentpage));
    setGoFastBackBdisabled(this.goFastBackButtonState(newcurrentpage));
    setGoFwdBdisabled(this.goFwdButtonState(newcurrentpage, newnopages));
    setGoFastFwdBdisabled(
      this.goFastFwdButtonState(newcurrentpage, newnopages)
    );
  };

  const computeBackLimits = (prevpage) => {
    let { itemsperpage } = this.props;
    let newinitialitem = (prevpage - 1) * itemsperpage;
    let newlastitem = prevpage * itemsperpage;
    return { newinitialitem, newlastitem };
  };

  const computeFwdLimits = (nextpage) => {
    let { itemsperpage } = this.props;
    let newinitialitem = (nextpage - 1) * itemsperpage;
    let newlastitem = nextpage * itemsperpage;
    // console.log(
    //   `computeFwdLimits() newsetInitialitem(${newinitialitem} newsetLastitem(${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  const computeSelectedPageLimits = (selpage) => {
    let { itemsperpage } = this.props;
    let newinitialitem = (selpage - 1) * itemsperpage;
    let newlastitem = selpage * itemsperpage;
    // console.log(
    //   `computeFwdLimits() newsetInitialitem(${newinitialitem} newsetLastitem(${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  const goToPage = (page, event) => {
    let { nopages, pagesspan, inipagearray } = this.state;
    if (page > 0 && page <= nopages) {
      // let prevpage = currentpage - 1;
      let newlimits = this.computeSelectedPageLimits(page);
      // let inipagearray = getIniPageofArray(nopages, pagesspan, currentpage);
      // console.log({ titulo: "nopages", valor: nopages });
      // console.log({ titulo: "pagesspan", valor: pagesspan });
      // console.log({ titulo: "page", valor: page });
      let newinipagearray = getIniPageofArray(
        nopages,
        pagesspan,
        page,
        inipagearray
      );
      // console.log({ titulo: "goToPage->inipagearray", valor: inipagearray });
      // console.log(`goBack() new page: ${prevpage}`);
      setInipagearray(newinipagearray);
      setCurrentpage(page);
      setInitialitem(newlimits.newinitialitem);
      setLastitem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(page));
      setGoFastBackBdisabled(this.goFastBackButtonState(page));
      setGoFwdBdisabled(this.goFwdButtonState(page, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(page, nopages));
    }
  };

  const goBack = () => {
    // console.log(`goBack()`);
    let { currentpage, nopages, pagesspan, inipagearray } = this.state;
    if (currentpage > 1) {
      let prevpage = currentpage - 1;
      let newlimits = this.computeBackLimits(prevpage);
      let newinipagearray = getIniPageofArray(
        nopages,
        pagesspan,
        prevpage,
        inipagearray
      );
      // console.log(`goBack() new page: ${prevpage}`);
      setCurrentpage(prevpage);
      setInipagearray(newinipagearray);
      setInitialitem(newlimits.newinitialitem);
      setLastitem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(prevpage));
      setGoFastBackBdisabled(this.goFastBackButtonState(prevpage));
      setGoFwdBdisabled(this.goFwdButtonState(prevpage, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(prevpage, nopages));
    }
  };

  const goFastBack = () => {
    // console.log(`goBack()`);
    let { currentpage, nopages, pagesspan, inipagearray } = this.state;
    if (currentpage > 1) {
      let prevpage = 1;
      let newlimits = this.computeBackLimits(prevpage);
      let newinipagearray = getIniPageofArray(
        nopages,
        pagesspan,
        prevpage,
        inipagearray
      );
      // console.log(`goBack() new page: ${prevpage}`);
      setCurrentpage(prevpage);
      setInipagearray(newinipagearray);
      setInitialitem(newlimits.newinitialitem);
      setLastitem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(prevpage));
      setGoFastBackBdisabled(this.goFastBackButtonState(prevpage));
      setGoFwdBdisabled(this.goFwdButtonState(prevpage, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(prevpage, nopages));
    }
  };

  const goFwd = () => {
    // console.log(`goFwd()`);
    let { nopages, currentpage, pagesspan, inipagearray } = this.state;
    if (currentpage < nopages) {
      let nextpage = currentpage + 1;
      let newlimits = this.computeFwdLimits(nextpage);
      let newinipagearray = getIniPageofArray(
        nopages,
        pagesspan,
        nextpage,
        inipagearray
      );
      // console.log(`goFwd() new page: ${nextpage}`);
      setCurrentpage(nextpage);
      setInipagearray(newinipagearray);
      setInitialitem(newlimits.newinitialitem);
      setLastitem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(nextpage));
      setGoFastBackBdisabled(this.goFastBackButtonState(nextpage));
      setGoFwdBdisabled(this.goFwdButtonState(nextpage, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(nextpage, nopages));
    }
  };

  const goFastFwd = () => {
    // console.log(`goFwd()`);
    let { nopages, currentpage, pagesspan, inipagearray } = this.state;
    if (currentpage < nopages) {
      let nextpage = nopages * 1;
      let newlimits = this.computeFwdLimits(nextpage);
      let newinipagearray = getIniPageofArray(
        nopages,
        pagesspan,
        nextpage,
        inipagearray
      );
      // console.log(`goFwd() new page: ${nextpage}`);
      setCurrentpage(nextpage);
      setInipagearray(newinipagearray);
      setInitialitem(newlimits.newinitialitem);
      setLastitem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(nextpage));
      setGoFastBackBdisabled(this.goFastBackButtonState(nextpage));
      setGoFwdBdisabled(this.goFwdButtonState(nextpage, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(nextpage, nopages));
    }
  };

  const goBackButtonState = (prevpage) => {
    return prevpage <= 1 ? true : false;
  };

  const goFastBackButtonState = (prevpage) => {
    return prevpage <= 1 ? true : false;
  };

  const goFwdButtonState = (nextpage, nopages) => {
    return nextpage >= nopages ? true : false;
  };

  const goFastFwdButtonState = (nextpage, nopages) => {
    return nextpage >= nopages ? true : false;
  };

  return {
    goBack,
    goFastBack,
    goFwd,
    goFastFwd,
    goToPage,
    // state
    nopages,
    pagesforarray,
    inipagearray,
    currentpage,
    noitems,
    initialitem,
    lastitem,
    goBackBdisabled,
    goFastBackBdisabled,
    goFwdBdisabled,
    goFastFwdBdisabled,
  };
};

export default useReactNextPaging;
