<h1 align="center">
react-next-paging

<br>
<img src="https://cdn.rawgit.com/titanve/react-next-paging/788358af/other/demo/demo.PNG?raw=true" alt="react-next-paging demo" title="eact-next-paging demo" width="300">
<br>

</h1>
<p align="center" style="font-size: 1.2rem;">Pagination react component</p>

[![NPM total downloads](https://img.shields.io/npm/dt/react-next-paging.svg?style=flat)](https://npmcharts.com/compare/react-next-paging?minimal=true)
[![NPM monthly downloads](https://img.shields.io/npm/dm/react-next-paging.svg?style=flat)](https://npmcharts.com/compare/react-next-paging?minimal=true)[![version][version-badge]](https://www.npmjs.com/package/react-next-paging)

## Installation

This module is distributed via [npm](https://www.npmjs.com) which is bundled
with [node](https://nodejs.org) and should be installed as one of your project's
`dependencies`:

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
                    {Array.from({ length: nopages }, (v, i) => i + 1).map(
                      page => {
                        return (
                          <button
                            key={page}
                            {...getSelPageButtonProps({ page: page })}
                            disabled={currentpage == page}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}
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
