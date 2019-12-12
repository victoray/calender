import React, {useEffect, useState} from "react";
import {Table, Menu, Icon, Message} from "semantic-ui-react";
import axios from "axios";
import {useDispatch, useStore} from "react-redux";
import _ from "lodash";

export const getWeekDay = (date) => {
    return new Intl.DateTimeFormat("ee-EE", {weekday: "long"}).format(date)
};

const getDates = (startDate) => {
    const dates = [startDate];
    let nextDate = new Date(startDate);
    for (let i = 0; i < 6; i++) {
        nextDate.setDate(nextDate.getDate() + 1);
        dates.push(new Date(nextDate));
    }

    return dates
};

const createTableHeader = (startDate) => {
    const dates = getDates(startDate);

    return dates.map((date, index) => {

        return (
            <Table.HeaderCell key={index} style={{textAlign: "center"}}>
                <p>{getWeekDay(date).substring(0, 3)}</p>
                <strong>{date.toLocaleDateString("et-EE")}</strong>
            </Table.HeaderCell>
        )
    })

};

const createTableBody = (startDate, holidays) => {
    const dates = getDates(startDate);

    return dates.map((date, index) => {
        const holiday = _.get(holidays, date.toISOString().substring(0, 10));
        return (
            <Table.Cell key={index} style={{height: 50}}>
                {holiday && holiday.map((day, index) => {
                    return (
                        <Message info={day.type === "folk"} key={index} success={day.type === "public"}>
                            <p>{day.name}</p>
                        </Message>
                    )
                })}
            </Table.Cell>
        )
    })
};

const useGetHolidays = (startDate, endDate) => {
    const state = useStore().getState();
    const [holidays, setHolidays] = useState(state && state.holidays);
    const dispatch = useDispatch();

    useEffect(() => {
        const start = holidays && Object.keys(state.holidays)[0];
        const end = holidays && Object.keys(state.holidays)[_.size(state.holidays) - 1];

        if ((new Date(start) < startDate && new Date(end) < endDate)) {
            axios.post("https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/holidays", {
                apiKey: "887d33535711e966f7b5746f263b4b81",
                startDate: startDate.toISOString().substring(0, 10),
                endDate: endDate.toISOString().substring(0, 10)
            }).then(r => {
                dispatch({type: "GET_HOLIDAYS", payload: r.data.holidays});
                setHolidays(r.data.holidays);
            }).catch(e => console.log(e))
        } else {
            setHolidays(state.holidays);
        }
    }, [startDate, endDate]);

    return holidays;
};

const WeekTable = ({startDate, endDate}) => {
    const holidays = useGetHolidays(startDate, endDate);
    const dateHeaders = createTableHeader(startDate);

    if (!holidays) return null;


    const dateBody = createTableBody(startDate, holidays);
    return (
        <div>
            <Table celled columns={7}>
                <Table.Header>
                    <Table.Row>
                        {dateHeaders}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        {dateBody}
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
};

export default WeekTable;