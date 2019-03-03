import React, { useState, useEffect } from "react";

export function ReactNextPaging({ initialItems, initialItemsperpage, initialPagesspan }) {
  const [itemsperpage, setItemsPerPage] = useState(10);
  const [pagesspan, setPagesSpan] = useState(10);
  const [pagesforarray, setPagesForArray] = useState(10);
  const [inipagearray, setIniPageArray] = useState(1);
  const [items, setItems] = useState([]);

  const getNoPages = (items = [], itemsperpage) => {
    return Math.ceil(items.length / itemsperpage);
  };

  const getHalfPagesArray = pagesforarray => {
    return Math.floor(pagesforarray / 2);
  };

  const isNoPagesLargerPagesSpan = (nopages, pagesspan) => {
    return nopages > pagesspan;
  };

  const isNoEven = no => {
    return no % 2 === 0;
  };

  const getIniPageofArray = (nopages, pagesspan, page, inipagearray) => {
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

  generateStateFromProps = (currentpage = 1) => {
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

    return {
      pagesspan: pagesspan,
      inipagearray: 1,
      pagesforarray: pagesforarray,
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
}

export default ReactNextPaging;
