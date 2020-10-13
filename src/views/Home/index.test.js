import React, { Component } from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter, Route, Switch, Link } from "react-router-dom";
import { Home } from "./index";
import Album from "../../components/Album";
import Error from "../../components/Error";

describe("Shallow rendered Home page", () => {
  let props;
  beforeEach(() => {
    props = {
      album: {
        pending: false,
        albums: [],
        error: null,
      },
    };
  });
  it("should render a page with the Fetch albums button", () => {
    // Setup wrapper and assign props.
    const enzymeWrapper = shallow(<Home {...props} />);
    // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector.
    expect(enzymeWrapper.find("button").hasClass("start-button")).toBe(true);
    expect(enzymeWrapper.find("button").text()).toBe("Fetch Albums!");
    //console.log(enzymeWrapper.debug());
    expect(enzymeWrapper.find(Album)).toHaveLength(0);
  });

  it("should dispatch the fetchAlbums action on the Fetch albums button click", () => {
    props.fetchAlbums = jest.fn();
    const enzymeWrapper = shallow(<Home {...props} />);
    const spy = jest.spyOn(enzymeWrapper.instance().props, "fetchAlbums");
    enzymeWrapper.find("button.start-button").simulate("click");
    expect(spy).toHaveBeenCalled();
  });

  it("renders the albums correctly", () => {
    props.album.albums = [
      {
        userId: 1,
        id: 1,
        title: "quidem molestiae enim",
        userName: "Leanne Graham",
      },
    ];
    const enzymeWrapper = shallow(<Home {...props} />);

    expect(enzymeWrapper.find(Album).length).toBe(1);
  });

  it("renders the error div when there is an error", () => {
    props.album.albums = [
      {
        userId: 1,
        id: 1,
        title: "quidem molestiae enim",
        userName: "Leanne Graham",
      },
    ];
    props.album.error = "404";
    const enzymeWrapper = shallow(<Home {...props} />);

    expect(enzymeWrapper.find(Album).length).toBe(0);
    expect(enzymeWrapper.find(Error).length).toBe(1);
  });
});
