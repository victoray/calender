import React from "react";
import {shallow, render} from "enzyme";
import App from "../App";

it("should render <App/>", () => {
    const component = shallow(<App/>);
    expect(component).toMatchSnapshot();
});