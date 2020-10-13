import React, { Component } from "react";
import { shallow } from "enzyme";
import Header from "./index";

describe("Shallow rendered Header component", () => {
  let props;
  beforeEach(() => {
    props = {
      heading: "JSON Placeholder Albums Loader",
    };
  });
  it("should render the header component with the heading", () => {
    // Setup wrapper and assign props.
    const enzymeWrapper = shallow(<Header {...props} />);
    // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector.
    expect(enzymeWrapper.find("div").hasClass("header")).toBe(true);
    expect(enzymeWrapper.find(".header").text()).toBe(
      "JSON Placeholder Albums Loader"
    );
    //console.log(enzymeWrapper.debug());
  });
});
