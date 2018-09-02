<h1 align="center">
react-next-paging

<br>
<img src="https://cdn.rawgit.com/titanve/react-next-paging/788358af/other/demo/demo.PNG?raw=true" alt="react-next-paging demo" title="react-next-paging demo" width="300">
<br>

</h1>
<p align="center" style="font-size: 1.2rem;">Pagination react component</p>

[![NPM total downloads](https://img.shields.io/npm/dt/react-next-paging.svg?style=flat)](https://npmcharts.com/compare/react-next-paging?minimal=true)
[![NPM monthly downloads](https://img.shields.io/npm/dm/react-next-paging.svg?style=flat)](https://npmcharts.com/compare/react-next-paging?minimal=true)
[![NPM version](https://badge.fury.io/js/react-next-paging.svg)](http://badge.fury.io/js/react-next-paging)
[![Build Status](https://travis-ci.org/titanve/react-next-paging.svg?branch=master)](https://travis-ci.org/titanve/react-next-paging)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

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

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-next-paging/dist/index.umd.min.js"></script>
```

You can find the library on `window.ReactNextPaging`.

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

const PaginacionTabla = ({ itemsperpage, nocolumns, items, pagesspan }) => {
  return (
    <ReactNextPaging
      itemsperpage={itemsperpage}
      nocolumns={nocolumns}
      items={items}
      pagesspan={pagesspan}
    >
      {({
        getBackButtonProps,
        getFastBackButtonProps,
        getFwdButtonProps,
        getFastFwdButtonProps,
        getSelPageButtonProps,
        nopages,
        inipagearray,
        pagesforarray,
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
                <tr key={"pagingrow" + 100}>
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
                    {Array.from(
                      { length: pagesforarray },
                      (v, i) => i + inipagearray
                    ).map(page => {
                      return (
                        <button
                          key={page}
                          {...getSelPageButtonProps({ page: page })}
                          disabled={currentpage == page}
                        >
                          {page}
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
    pagesspan={4}
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

### pagesspan

> `number` | defaults to `10`

Pass a number which represents the pages span.

### items

> `any` | defaults to `[]`

Pass an array of table row items that should be rendered.

## License

_react-next-paging_ is available under the MIT License.
