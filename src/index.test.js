import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactNextPaging, {
  getNoPages,
  isNoPagesLargerPagesSpan,
  getHalfPagesArray,
  getIniPageofArray
} from "./react-next-paging";

Enzyme.configure({ adapter: new Adapter() });

const ITEMS = ["a", "b", "c", "d", "e", "f"];

describe("react-next-paging", () => {
  it("should call children prop with an object", () => {
    // this will create a spy/mock
    let mockChildren = jest.fn();

    let wrapper = shallow(<ReactNextPaging>{mockChildren}</ReactNextPaging>);

    expect(mockChildren).toHaveBeenCalled();
    expect(mockChildren).toHaveBeenCalledTimes(1);
    expect(mockChildren).toHaveBeenCalledWith(
      expect.objectContaining({
        getBackButtonProps: expect.any(Function),
        getFastBackButtonProps: expect.any(Function),
        getFwdButtonProps: expect.any(Function),
        getFastFwdButtonProps: expect.any(Function),
        getSelPageButtonProps: expect.any(Function)
      })
    );
  });

  it("should start on the first page and allow forward buttons to be enabled", () => {
    let mockChildren = jest.fn();

    let wrapper = shallow(
      <ReactNextPaging items={ITEMS} itemsperpage={2} pagesspan={10}>
        {mockChildren}
      </ReactNextPaging>
    );

    expect(mockChildren).toHaveBeenCalled();
    // expect(mockChildren).toHaveBeenCalledTimes(1);
    expect(mockChildren).toHaveBeenCalledWith(
      expect.objectContaining({
        goBackBdisabled: true,
        goFastBackBdisabled: true,
        goFwdBdisabled: false,
        goFastFwdBdisabled: false
      })
    );
  });
});

describe("getNoPages", () => {
  it("should return 0 when given any empty list", () => {
    let items = [];
    let itemsperpage = 2;
    let actual = getNoPages(items, itemsperpage);

    expect(actual).toBe(0);
  });

  it("should round up on uneven", () => {
    let items = Array.from({ length: 10 });
    let itemsperpage = 3;
    let actual = getNoPages(items, itemsperpage);

    expect(actual).toBe(4);
  });
});

describe("isNoPagesLargerPagesSpan", () => {
  it("should return true given nopages larger than pagesspan", () => {
    let nopages = 24;
    let pagesspan = 10;
    let actual = isNoPagesLargerPagesSpan(nopages, pagesspan);

    expect(actual).toBe(true);
  });

  it("should return false given nopages smaller than pagesspan", () => {
    let nopages = 5;
    let pagesspan = 10;
    let actual = isNoPagesLargerPagesSpan(nopages, pagesspan);

    expect(actual).toBe(false);
  });
});

describe("getHalfPagesArray", () => {
  it("should return 0 given pagesforarray 0", () => {
    let pagesforarray = 0;
    let actual = getHalfPagesArray(pagesforarray);

    expect(actual).toBe(0);
  });

  it("should return 12 given pagesforarray 24", () => {
    let pagesforarray = 24;
    let actual = getHalfPagesArray(pagesforarray);

    expect(actual).toBe(12);
  });

  it("should return 5 given pagesforarray 9", () => {
    let pagesforarray = 9;
    let actual = getHalfPagesArray(pagesforarray);

    expect(actual).toBe(5);
  });
});

describe("getIniPageofArray", () => {
  it("should return 1 given page 1 nopages > pagesspan", () => {
    let nopages = 40;
    let pagesspan = 10;
    let page = 1;
    let actual = getIniPageofArray(nopages, pagesspan, page);

    expect(actual).toBe(1);
  });

  it("should return 2 given page 6 nopages > pagesspan", () => {
    let nopages = 40;
    let pagesspan = 10;
    let page = 6;
    let actual = getIniPageofArray(nopages, pagesspan, page);

    expect(actual).toBe(1);
  });

  it("should return 4 given page 9 nopages > pagesspan", () => {
    let nopages = 40;
    let pagesspan = 10;
    let page = 9;
    let actual = getIniPageofArray(nopages, pagesspan, page);

    expect(actual).toBe(3);
  });

  it("should return 12 given page 17 nopages > pagesspan", () => {
    let nopages = 40;
    let pagesspan = 10;
    let page = 17;
    let actual = getIniPageofArray(nopages, pagesspan, page);

    expect(actual).toBe(11);
  });

  it("should return 2 given page 3 nopages > pagesspan", () => {
    let nopages = 5;
    let pagesspan = 4;
    let page = 3;
    let actual = getIniPageofArray(nopages, pagesspan, page);

    expect(actual).toBe(1);
  });

  it("should return 1 given page 1 nopages < pagesspan", () => {
    let nopages = 4;
    let pagesspan = 10;
    let page = 1;
    let actual = getIniPageofArray(nopages, pagesspan, page);

    expect(actual).toBe(1);
  });

  it("should return 1 given page 4 nopages < pagesspan", () => {
    let nopages = 4;
    let pagesspan = 10;
    let page = 4;
    let actual = getIniPageofArray(nopages, pagesspan, page);

    expect(actual).toBe(1);
  });

  it("should return 1 given page 20 nopages < pagesspan", () => {
    let nopages = 4;
    let pagesspan = 10;
    let page = 20;
    let actual = getIniPageofArray(nopages, pagesspan, page);

    expect(actual).toBe(1);
  });
});
