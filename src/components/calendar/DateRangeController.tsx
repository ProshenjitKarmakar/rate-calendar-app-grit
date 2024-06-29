'use client';
import React, {useEffect, useState} from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRange} from 'react-date-range';
import {differenceInDays, format} from 'date-fns';
import {Box, Stack, Typography} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useTheme} from '@mui/material/styles';
import { enGB } from 'date-fns/locale';
import {getDurationType, getFormatDataPickerDate, getFormatFromAndToDate} from "@/helpers/helper";


const startDate = new Date(Date.now());
const endDate = new Date(Date.now() + 3600 * 1000 * 24 * 29);

const DateRangeController = ({datePickerCallback}: any) => {
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const theme = useTheme();
    const [datePickerFormatDate, setDatePickerFormatDate] = useState({
        startDate: '',
        endDate: ''
    });
    const [state, setState] = useState<{startDate: Date,endDate: Date, key: string}[]>([
        {
            startDate: {} as Date,
            endDate: {} as Date,
            key: 'selection'
        }
    ]);

    useEffect(() => {
        const [datePickerStartDate, datePickerEndDate] = getFormatDataPickerDate(startDate, endDate);
        setDatePickerFormatDate({
            startDate: datePickerStartDate,
            endDate: datePickerEndDate

        });
        setState([{
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
        }]);

        const {fromDate, toDate, difference, durationType} = getFormatFromAndToDate(startDate, endDate);

        if (datePickerCallback) {
            datePickerCallback({
                _fromDate: fromDate,
                _toDate: toDate,
                difference,
                durationType,
                isFirstTime: true
            });
        }
    }, []);


    const handleDateRangeToggle = () => {
        setDatePickerOpen(!datePickerOpen);
    };

    const handleDateRangeChange = (dateRange: any) => {
        setState([dateRange.selection]);

        const [datePickerStartDate, datePickerEndDate] = getFormatDataPickerDate(
            dateRange.selection.startDate,
            dateRange.selection.endDate
        );

        const fromDate = format(dateRange.selection.startDate, 'yyyy-MM-dd');
        const toDate = format(dateRange.selection.endDate, 'yyyy-MM-dd');
        const difference = differenceInDays(dateRange.selection.endDate, dateRange.selection.startDate);
        const durationType = getDurationType(difference);

        setDatePickerFormatDate({startDate: datePickerStartDate, endDate: datePickerEndDate});
        if (datePickerCallback) {
            datePickerCallback({
                _fromDate: fromDate,
                _toDate: toDate,
                difference,
                durationType,
                isFirstTime: false
            });
        }
    };

    useEffect(() => {

    }, []);

    return (
        <Box>
            {datePickerOpen && (
                <Box
                    onClick={() => setDatePickerOpen(false)}
                    sx={{
                        left: '0',
                        top: '0',
                        position: 'fixed',
                        height: '100%',
                        width: '100%',
                        zIndex: '1100'
                    }}
                ></Box>
            )}

            <Stack sx={{position: 'relative'}}>
                <Box
                    onClick={handleDateRangeToggle}
                    sx={{
                        width: '100%',
                        minWidth: '260px',
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '4px',
                        height: '40px',
                        padding: '8px 16px 0 16px',
                        cursor: 'pointer',
                        mb: 0.5
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography color="text.secondary" variant="inputText">
                            {datePickerFormatDate.startDate} {' - '} {datePickerFormatDate.endDate}
                        </Typography>
                        <ArrowDropDownIcon sx={{color: theme.palette.action.active}} fontSize="small"/>
                    </Stack>
                    {/*<Box>*/}
                    {/*    <Button>Reset</Button>*/}
                    {/*</Box>*/}
                </Box>
                <Box
                    className="custom_date_position_wr"
                    sx={{
                        position: 'absolute',
                        top: '42px',
                        left: '0px',
                        zIndex: '1102',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '8px!important',
                        boxShadow:
                            '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)'
                    }}
                >
                    {datePickerOpen && (
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => handleDateRangeChange(item)}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            locale={enGB}
                        />
                    )}
                </Box>
            </Stack>
        </Box>
    );
};

export default DateRangeController;
