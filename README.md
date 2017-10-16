# react-paging
Pagination react component

```
import React from "react";
import ReactPaging from "../react-paging/react-paging";

const PaginacionTabla = ({ itemsperpage, items }) => {
  return (
    <ReactPaging itemsperpage={itemsperpage} items={items}>
      {paging =>
        items.slice(paging.initialitem, paging.lastitem).map((item, index) => {
          return item;
        })}
    </ReactPaging>
  );
};

export default PaginacionTabla;

```
