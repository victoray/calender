import React from "react";
import {Loader, Message, Table} from "semantic-ui-react";
import _ from "lodash";
import {useGetHolidays} from "../api";

export const getWeekDay = (date) => {
    return new Intl.DateTimeFormat("en-US", {weekday: "long"}).format(date)
};

//Retrieves the dates in the current week
const getDates = (startDate) => {
    const dates = [startDate];
    let nextDate = new Date(startDate);
    for (let i = 0; i < 6; i++) {
        nextDate.setDate(nextDate.getDate() + 1);
        dates.push(new Date(nextDate));
    }

    return dates;
};

//Constructs the table headers
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

//Constructs the table body cells
const createTableBody = (startDate, holidays) => {
    const dates = getDates(startDate);

    return dates.map((date, index) => {
        const holiday = _.get(holidays, date.toISOString().substring(0, 10));
        return (
            <Table.Cell key={index} style={{height: 50}} verticalAlign={"top"}>
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

export const WeekTable = ({startDate, holidays}) => {

    const dateHeaders = createTableHeader(startDate);
    const dateBody = createTableBody(startDate, holidays);
    return (
        <div id={"table"}>
            <Table celled columns={7} unstackable>
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

const WeekTableData = ({startDate, endDate}) => {
    const holidays = useGetHolidays(startDate, endDate);

    if (!holidays) return <Loader>Loading...</Loader>;

    return <WeekTable startDate={startDate} holidays={holidays}/>
};

export default WeekTableData;