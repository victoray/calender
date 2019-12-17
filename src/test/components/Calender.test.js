import React from "react";
import {mount} from "enzyme";
import Calender from "../../components/Calender";
import {createStore} from "redux";
import reducers from "../../reducers";
import {Provider} from "react-redux";

const store = createStore(reducers);
it("should render <Calender/>", () => {
    const component = mount(<Provider store={store}><Calender/></Provider>)

    expect(component.find("button.prev").length).toBe(1);
    expect(component.find("button.next").length).toBe(1);
});

