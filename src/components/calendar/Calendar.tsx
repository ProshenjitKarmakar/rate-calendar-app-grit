'use client';
import React, {useEffect, useState} from 'react';
import {
    Box,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CloseIcon from '@mui/icons-material/Close';
import DateRangeController from "./DateRangeController";
import httpRequest from "@/services/rootApi/httpRequest";
import TableLoaderSkeleton from "@/components/skeleton/TableLoaderSkeleton";
import {
    APIRootObject,
    DatesBetween,
    ICalendarFormat,
    Inventory,
    IRates,
    IRootObject
} from "@/interfaces/calendar.interface";
import {getDatesBetween, getOnlyDatesBetween, processData} from "@/helpers/helper";

async function getData(dates: { startDate: string, endDate: string }): Promise<{ datesBetween: DatesBetween, onlyDates: string[], rows: IRootObject }> {
    try {
        const result = await httpRequest.get(`https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${dates?.startDate}&end_date=${dates?.endDate}`);

        if (result?.code === 'Succeed') {
            const rows : IRootObject = processData(result?.data as APIRootObject[]);
            const datesBetween : DatesBetween = getDatesBetween(dates?.startDate, dates?.endDate);
            const onlyDates: string[] = getOnlyDatesBetween(dates?.startDate, dates?.endDate);

            return { datesBetween, onlyDates, rows };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    return { datesBetween: {}, onlyDates: [], rows: {} as IRootObject };
}

const Calendar = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [datesBetween, setDatesBetween] = useState<DatesBetween>({} as DatesBetween);
    const [rows, setRows] = useState<IRootObject>({} as IRootObject);
    const [onlyDates, setOnlyDates] = useState<string[]>([] as string[]);
    const [dates, setDates] = useState<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' });

    useEffect(() => {
        if (dates.startDate && dates.endDate) {
            const fetchData = async () => {
                setIsLoading(true);
                const { datesBetween, onlyDates, rows } = await getData(dates);
                setDatesBetween(datesBetween);
                setOnlyDates(onlyDates);
                setRows(rows);
                setIsLoading(false);
            };
            fetchData();
        }
    }, [dates]);

    const datePickerCallback = (data: { _fromDate: string,  _toDate: string}) => {
        setDates({ startDate: data?._fromDate, endDate: data?._toDate });
    };

    return (
        <Stack spacing={2} m={3}>
            <Box textAlign={'center'}>
                <Typography variant={'h4'}>Rate Calendar</Typography>
            </Box>
            <Box component={Paper} p={3} >
                <Box width={'20%'}>
                    <DateRangeController datePickerCallback={datePickerCallback}/>
                </Box>
            </Box>
            {
                isLoading ? <TableLoaderSkeleton/> : (
                    <Box sx={{p: 3}}>
                        <TableContainer component={Paper}>
                            <Table sx={{'& .MuiTableCell-root': {
                                    border: `1px solid #1D29391A`,
                                }}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        {datesBetween &&
                                            Object.keys(datesBetween).map((monthYear) => (
                                                <TableCell key={monthYear} colSpan={datesBetween[monthYear].length}>
                                                    <b>{monthYear}</b>
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        {datesBetween &&
                                            Object.keys(datesBetween).map((monthYear) =>
                                                datesBetween[monthYear].map((dateInfo : ICalendarFormat) => (
                                                    <TableCell key={dateInfo.date} align='right'>
                                                        {dateInfo.date}
                                                        <br />
                                                        {dateInfo.day}
                                                    </TableCell>
                                                ))
                                            )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows &&
                                        Object.keys(rows).map((roomName) => (
                                            <React.Fragment key={roomName}>
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={
                                                            datesBetween &&
                                                            Object.keys(datesBetween).reduce((sum, key) => sum + datesBetween[key].length, 0)
                                                        }
                                                    >
                                                        <b>{roomName}</b>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Room Status</TableCell>
                                                    {onlyDates?.map((date: string) => {
                                                        const item = rows[roomName]?.inventory?.find((inv: any) => inv.date === date);
                                                        return (
                                                            <TableCell sx={item?.status ? {bgcolor: '#008000', color: '#fff'} : {bgcolor: 'red', color: '#fff'}} key={date} align='right'>
                                                               {item ? (item.status ? 'Open' : 'Close') : 'N/A'}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Rooms to Sell</TableCell>
                                                    {onlyDates?.map((date: string) => {
                                                        const item = rows[roomName]?.inventory?.find((inv: any) => inv.date === date);
                                                        return (
                                                            <TableCell key={date} align='right'>
                                                                {item ? item.available : 'N/A'}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Net Booked</TableCell>
                                                    {rows[roomName]?.inventory?.map((item : Inventory) => (
                                                        <TableCell key={item.date} align='right'>
                                                            {item?.booked}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                                {rows[roomName]?.rate_plans &&
                                                    Object.keys(rows[roomName]?.rate_plans).map((ratePlanName, index) => (
                                                        <React.Fragment key={ratePlanName}>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography>
                                                                        {ratePlanName}
                                                                    </Typography>
                                                                    <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                                                        <PeopleAltIcon sx={{fontSize: '25px'}}/>{' '}
                                                                        <CloseIcon sx={{fontSize: '18px'}}/>
                                                                        <Typography>
                                                                            {rows[roomName]['occupancy']}
                                                                        </Typography>
                                                                    </Stack>

                                                                </TableCell>
                                                                {rows[roomName]?.rate_plans[ratePlanName]?.map((ratePlan : IRates, index: number) => (
                                                                    <TableCell key={index} align='right'>
                                                                        {ratePlan?.rate}
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Min Length of Stay</TableCell>
                                                                {rows[roomName]?.rate_plans[ratePlanName]?.map((ratePlan: IRates, index: number) => (
                                                                    <TableCell key={index} align='right'>
                                                                        {ratePlan?.min_length_of_stay}
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Reservation Deadline</TableCell>
                                                                {rows[roomName]?.rate_plans[ratePlanName]?.map((ratePlan: IRates, index: number) => (
                                                                    <TableCell key={index} align='right'>
                                                                        {ratePlan?.reservation_deadline}
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                        </React.Fragment>
                                                    ))}
                                            </React.Fragment>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )
            }

        </Stack>

    );
};

export default Calendar;
