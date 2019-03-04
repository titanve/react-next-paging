import React, { useState, useEffect } from "react";

export const getNoPages = (items = [], itemsperpage) => {
  return Math.ceil(items.length / itemsperpage);
};

export const getHalfPagesArray = pagesforarray => {
  return Math.floor(pagesforarray / 2);
};

export const isNoPagesLargerPagesSpan = (nopages, pagesspan) => {
  return nopages > pagesspan;
};

export const isNoEven = no => {
  return no % 2 === 0;
};

export const getIniPageofArray = (nopages, pagesspan, page, inipagearray) => {
  if (isNoPagesLargerPagesSpan(nopages, pagesspan)) {
    if (page <= nopages) {
      let halfspan = getHalfPagesArray(pagesspan);
      if (page >= halfspan + inipagearray) {
        let newini = page - halfspan > 0 ? page - halfspan : 1;
        if (newini + pagesspan <= nopages) {
          return newini;
        } else {
          return nopages - pagesspan + 1;
        }
      } else {
        if (page > 0) {
          return page - halfspan > 0 ? page - halfspan : 1;
        } else {
          return 1;
        }
      }
    }
  }
  return inipagearray;
};

export function ReactNextPaging({
  initialItems,
  initialItemsperpage,
  initialPagesspan
}) {
  const [pagesspan, setPagesSpan] = useState(10);
  const [inipagearray, setIniPageArray] = useState(1);
  const [pagesforarray, setPagesForArray] = useState(10);
  const [nopages, setNoPages] = useState(1);
  const [noitems, setNoItems] = useState(1);
  const [initialitem, setInitialItem] = useState(1);
  const [lastitem, setLastItem] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);
  const [goBackBdisabled, setGoBackBdisabled] = useState(true);
  const [goFastBackBdisabled, setGoFastBackBdisabled] = useState(true);
  const [goFwdBdisabled, setGoFwdBdisabled] = useState(true);
  const [goFastFwdBdisabled, setGoFastFwdBdisabled] = useState(true);
  const [itemsperpage, setItemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  useEffect(() => {
    generateStateFromProps({
      initialItems,
      initialItemsperpage,
      initialPagesspan
    });
  }, [initialItems, initialItemsperpage, initialPagesspan]);

  generateStateFromProps = (props, currentpage = 1) => {
    const { items, itemsperpage, pagesspan } = props;
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

    setPagesSpan(pagesspan);
    setIniPageArray(1);
    setPagesForArray(pagesforarray);
    setNoPages(newnopages);
    setNoItems(items.length);
    setInitialItem(newinitialitem);
    setLastItem(newlastitem);
    setCurrentPage(newcurrentpage);
    setGoBackBdisabled(goBackButtonState(newcurrentpage));
    setGoFastBackBdisabled(goFastBackButtonState(newcurrentpage));
    setGoFwdBdisabled(goFwdButtonState(newcurrentpage, newnopages));
    setGoFastFwdBdisabled(goFastFwdButtonState(newcurrentpage, newnopages));
  };
  computeBackLimits = prevpage => {
    let { itemsperpage } = this.props;
    let newinitialitem = (prevpage - 1) * itemsperpage;
    let newlastitem = prevpage * itemsperpage;
    // console.log(
    //   `computeBackLimits() newsetInitialItem(${newinitialitem} newsetLastItem(${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  computeFwdLimits = nextpage => {
    let { itemsperpage } = this.props;
    let newinitialitem = (nextpage - 1) * itemsperpage;
    let newlastitem = nextpage * itemsperpage;
    // console.log(
    //   `computeFwdLimits() newsetInitialItem(${newinitialitem} newsetLastItem(${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  computeSelectedPageLimits = selpage => {
    let { itemsperpage } = this.props;
    let newinitialitem = (selpage - 1) * itemsperpage;
    let newlastitem = selpage * itemsperpage;
    // console.log(
    //   `computeFwdLimits() newsetInitialItem(${newinitialitem} newsetLastItem(${newlastitem}`
    // );
    return { newinitialitem, newlastitem };
  };

  goToPage = (page, event) => {
    let { currentpage, nopages, pagesspan, inipagearray } = this.state;
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

      setIniPageArray(newinipagearray);
      setCurrentPage(page);
      setInitialItem(newlimits.newinitialitem);
      setLastItem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(page));
      setGoFastBackBdisabled(this.goFastBackButtonState(page));
      setGoFwdBdisabled(this.goFwdButtonState(page, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(page, nopages));
    }
  };

  goBack = () => {
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

      setCurrentPage(prevpage);
      setIniPageArray(newinipagearray);
      setInitialItem(newlimits.newinitialitem);
      setLastItem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(prevpage));
      setGoFastBackBdisabled(this.goFastBackButtonState(prevpage));
      setGoFwdBdisabled(this.goFwdButtonState(prevpage, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(prevpage, nopages));
    }
  };

  goFastBack = () => {
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

      setCurrentPage(prevpage);
      setIniPageArray(newinipagearray);
      setInitialItem(newlimits.newinitialitem);
      setLastItem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(prevpage));
      setGoFastBackBdisabled(this.goFastBackButtonState(prevpage));
      setGoFwdBdisabled(this.goFwdButtonState(prevpage, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(prevpage, nopages));
    }
  };

  goFwd = () => {
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

      setCurrentPage(nextpage);
      setIniPageArray(newinipagearray);
      setInitialItem(newlimits.newinitialitem);
      setLastItem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(nextpage));
      setGoFastBackBdisabled(this.goFastBackButtonState(nextpage));
      setGoFwdBdisabled(this.goFwdButtonState(nextpage, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(nextpage, nopages));
    }
  };

  goFastFwd = () => {
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

      setCurrentPage(nextpage);
      setIniPageArray(newinipagearray);
      setInitialItem(newlimits.newinitialitem);
      setLastItem(newlimits.newlastitem);
      setGoBackBdisabled(this.goBackButtonState(nextpage));
      setGoFastBackBdisabled(this.goFastBackButtonState(nextpage));
      setGoFwdBdisabled(this.goFwdButtonState(nextpage, nopages));
      setGoFastFwdBdisabled(this.goFastFwdButtonState(nextpage, nopages));
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
}

export default ReactNextPaging;
