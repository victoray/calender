import React from "react";
import {mount} from "enzyme";
import NavBar from "../../components/NavBar";


it('should render the <NavBar/>', () => {
    const component = mount(<NavBar/>);
    expect(component).toMatchSnapshot();
});