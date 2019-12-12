import React from "react";
import {mount, shallow} from "enzyme";
import WeekTableData, {WeekTable} from "../../components/WeekTable";
import {useGetHolidays} from "../../api";

jest.mock('../../api/');

const response = {
    error: false,
    holidays: {
        "2019-02-02": [
            {
                name: "Küünlapäev ehk pudrupäev",
                "type": "folk"
            }
        ],
        "2019-02-09": [
            {
                "name": "Luuvalupäev",
                "type": "folk"
            }
        ],
        "2019-02-22": [
            {
                "name": "Talvine peetripäev",
                "type": "folk"
            }
        ],
        "2019-02-24": [
            {
                "name": "Iseseisvuspäev",
                "type": "public"
            },
            {
                "name": "Talvine madisepäev",
                "type": "folk"
            }
        ]
    }
};

it('should render <WeekTable/>', () => {

    useGetHolidays.mockReturnValue({
        data: response
    });
    const date = new Date("2019-02-02");
    const component = mount(<WeekTable startDate={date} holidays={response.holidays}/>);

    expect(component).toMatchSnapshot();

});

it('should render <WeekTableData/> and call useGetHolidays', () => {

    useGetHolidays.mockReturnValue({
        data: response
    });
    const date = new Date("2019-02-02");
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 7);
    const component = shallow(<WeekTableData startDate={startDate} endDate={date}/>);

    expect(useGetHolidays).toBeCalledWith(startDate, date);
    expect(component).toMatchSnapshot();

});