# react-next-paging

Pagination react component

[![NPM total downloads](https://img.shields.io/npm/dt/react-next-paging.svg?style=flat)](https://npmcharts.com/compare/react-next-paging?minimal=true)
[![NPM monthly downloads](https://img.shields.io/npm/dm/react-next-paging.svg?style=flat)](https://npmcharts.com/compare/react-next-paging?minimal=true)

## Installation

This module is distributed via [npm] which is bundled with [node] and should be
installed as one of your project's `dependencies`:

```shell
npm install --save react-next-paging
```

or if you use `yarn`:

```shell
yarn add react-next-paging
```

> This package also depends on `react` and `prop-types`. Please make sure you
> have those installed as well.

## Usage

```jsx
import React from "react";
import ReactNextPaging from "react-next-paging";

const buttonStyles = {
  border: "1px solid #ccc",
  background: "#fff",
  fontSize: "1em",
  padding: 10,
  margin: 5,
  width: 70
};

const PaginacionTabla = ({ itemsperpage, nocolumns, items }) => {
  return (
    <ReactNextPaging
      itemsperpage={itemsperpage}
      nocolumns={nocolumns}
      items={items}
    >
      {({
        getBackButtonProps,
        getFastBackButtonProps,
        getFwdButtonProps,
        getFastFwdButtonProps,
        getSelPageButtonProps,
        nopages,
        currentpage,
        noitems,
        initialitem,
        lastitem,
        goBackBdisabled,
        goFastBackBdisabled,
        goFwdBdisabled,
        goFastFwdBdisabled
      }) => (
        <tbody>
          {items.slice(initialitem, lastitem).map((item, index) => {
            return item;
          })}
          {noitems > 0
            ? [
                <tr key={100}>
                  <td colSpan={nocolumns} style={{ textAlign: "center" }}>
                    <button
                      style={buttonStyles}
                      {...getFastBackButtonProps()}
                      disabled={goFastBackBdisabled}
                    >
                      {"<<"}
                    </button>
                    <button
                      style={buttonStyles}
                      {...getBackButtonProps()}
                      disabled={goBackBdisabled}
                    >
                      {"<"}
                    </button>
                    {[...Array(nopages).keys()].map((page, i) => {
                      return (
                        <button
                          key={i}
                          {...getSelPageButtonProps({ page: page + 1 })}
                          disabled={currentpage == page + 1 ? true : false}
                        >
                          {page + 1}
                        </button>
                      );
                    })}
                    <button
                      style={buttonStyles}
                      {...getFwdButtonProps()}
                      disabled={goFwdBdisabled}
                    >
                      {">"}
                    </button>
                    <button
                      style={buttonStyles}
                      {...getFastFwdButtonProps()}
                      disabled={goFastFwdBdisabled}
                    >
                      {">>"}
                    </button>
                  </td>
                </tr>,
                <tr key={200}>
                  <td colSpan={nocolumns} style={{ textAlign: "center" }}>
                    {` ${currentpage}/${nopages} `}
                  </td>
                </tr>
              ]
            : null}
        </tbody>
      )}
    </ReactNextPaging>
  );
};

export default PaginacionTabla;
```

and in the main app file

```jsx
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

Pass a number which represents the number of columns for the `<td/>` `colSpan`
property.

### items

> `any` | defaults to `[]`

Pass an array of table row items that should be rendered.

## License

_react-next-paging_ is available under the MIT License.
