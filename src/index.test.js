import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactNextPaging from "./index";
import { getNoPages } from "./react-next-paging";

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
      <ReactNextPaging items={ITEMS} itemsperpage={2}>
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
