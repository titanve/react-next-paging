# react-next-paging
Pagination react component

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save react-next-paging
```

> This package also depends on `react` and `prop-types`. Please make sure you
> have those installed as well.

## Usage

```javascript
import React from "react";
import ReactNextPaging from "react-next-paging";

const PaginacionTabla = ({ itemsperpage, items }) => {
  return (
    <ReactNextPaging
      itemsperpage={itemsperpage}
      nocolumns={nocolumns}
      items={items}
    >
      {paging =>
        items.slice(paging.initialitem, paging.lastitem).map((item, index) => {
          return item;
        })}
    </ReactNextPaging>
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
    nocolumns={this.state.nocolumns}
    items={filas}
  />
</table>
```

## Props

### itemsperpage

> `number` | defaults to `10`

Pass a number which represents the number of items per page.

### nocolumns

> `number` 

Pass a number which represents the number of columns for the `<td/>` `colSpan` property.

### items

> `any` | defaults to `[]`

Pass an array of table row items that should be rendered.
