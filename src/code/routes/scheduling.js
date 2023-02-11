import React from 'react';
import Paper from '@mui/material/Paper';

import { ViewState } from '@devexpress/dx-react-scheduler';

import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    DateNavigator,
    TodayButton,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    Toolbar,
    ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';

import dayjs from 'dayjs';

const Scheduling = props => {
    const currentDate = dayjs ( ).toDate ( );

    const training = props.state
        .filter ( data => data.customer !== null )
        .map ( data => {
            const title = `${data.activity} / ${data.customer.firstname} ${data.customer.lastname}`;
            const from = dayjs ( data.date )
            const to = dayjs ( data.date ).add ( data.duration, 'm' );
            return {
                title: title,
                startDate: from.toDate ( ),
                endDate: to.toDate ( )
            };
        } );

    return <Paper>
            <Scheduler
            data={training}
            >
                <ViewState
                    defaultCurrentDate = {currentDate}
                    defaultCurrentViewName = 'Week'
                />
                <DayView
                    cellDuration = { 60 }
                />
                <WeekView
                     cellDuration = { 60 }
                />
                <MonthView />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />
                <Appointments />
                <AppointmentTooltip
                    showCloseButton
                    showOpenButton
                />
                <AppointmentForm
                    readOnly
                />
            </Scheduler>

    </Paper>
};

export default Scheduling;