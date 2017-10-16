# react-paging
Pagination react component

```javascript
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

and in the main app file

```javascript
import React, { Component } from "react";
import PaginacionTabla from "PaginacionTabla/PaginacionTabla";
.
.
.
<table className="table table-hover">
  <thead>
    <tr>
      <th>Id. pedido</th>
      <th>Agregado</th>
      <th>Despacho</th>
      <th>Cliente</th>
      <th />
    </tr>
  </thead>
  <PaginacionTabla
    itemsperpage={this.state.itemsperpage}
    items={filas}
  />
</table>
```
