import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {
    APIRootObject,
    DatesBetween,
    ICalendar,
    InventoryCalendar,
    IRatePlan,
    IRootObject
} from "@/interfaces/calendar.interface";
import {differenceInDays, format} from "date-fns";
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);


export const processData = (data: APIRootObject[]) : IRootObject => {
    const obj: IRootObject = {};

    data.forEach((room: APIRootObject) => {
        if (!obj[room.name]) {
            obj[room.name] = {
                occupancy : room?.occupancy,
                inventory: [],
                rate_plans: {},
            };
        }

        room.inventory_calendar.forEach((inv : InventoryCalendar, index: number) => {
            console.log("====inv.date====", inv.date);
            obj[room.name].inventory.push({
                date: dayjs(inv.date).format('YYYY-MM-DD'),
                available: inv.available,
                status: inv.status,
                booked: inv.booked,
            });
        });

        room.rate_plans.forEach((ratePlan: IRatePlan) => {
            if (!obj[room.name].rate_plans[ratePlan.name]) {
                obj[room.name].rate_plans[ratePlan.name] = [];
            }

            ratePlan?.calendar.forEach((item: ICalendar) => {
                obj[room.name].rate_plans[ratePlan.name].push({
                    date: dayjs(item.date).format('YYYY-MM-DD'),
                    rate: item.rate,
                    min_length_of_stay: item.min_length_of_stay,
                    reservation_deadline: item.reservation_deadline,
                });
            });
        });
    });

    return obj;
};
export const getOnlyDatesBetween =(startDate: string, endDate: string): string[] => {
    const dates: string[] = []; // Explicitly define the type of the dates array
    let currentDate = dayjs(startDate);
    const finalDate = dayjs(endDate);

    while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate)) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
    }

    return dates;
}
export const getDatesBetween = (startDate: string, endDate: string) : DatesBetween => {
    const dates: DatesBetween = {};
    let currentDate = dayjs(startDate);
    const finalDate = dayjs(endDate);

    while (currentDate.isBefore(finalDate) || currentDate.isSame(finalDate)) {
        const monthYear = currentDate.format('MMMM, YYYY');
        if (!dates[monthYear]) {
            dates[monthYear] = [];
        }
        dates[monthYear].push({
            date: currentDate.format('DD'),
            day: currentDate.format('ddd'), // Use short day names
        });
        currentDate = currentDate.add(1, 'day');
    }

    return dates;
}


export const getFormatFromAndToDate = (startDate: Date, endDate: Date) => {
    const fromDate = format(startDate, "yyyy-MM-dd");
    const toDate = format(endDate, "yyyy-MM-dd");
    const difference = differenceInDays(endDate, startDate);
    const durationType = getDurationType(difference);

    return { fromDate, toDate, difference, durationType };
};

export const getDurationType = (days = 1) => {
    let durationType = "month";
    if (days <= 7) {
        durationType = "week";
    } else if (days <= 30) {
        durationType = "month";
    } else if (days > 30) {
        durationType = "year";
    }

    return durationType;
};

export const getFormatDataPickerDate = (startDate : Date, endDate : Date) => {
    const fromDate = format(startDate, "MMM dd, yyyy");
    const toDate = format(endDate, "MMM dd, yyyy");

    return [fromDate, toDate];
};