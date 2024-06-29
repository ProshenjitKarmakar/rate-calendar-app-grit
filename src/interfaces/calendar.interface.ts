export interface IRootObject {
    [key: string]: IEachRow;
}
export interface IEachRow {
    inventory: Inventory[];
    occupancy: number;
    rate_plans: IRatePlans;
}
export interface IRatePlans {
    [key: string]: IRates[];
}
export interface IRates {
    date: string;
    rate: number;
    min_length_of_stay?: any;
    reservation_deadline?: any;
}
export interface Inventory {
    date: string;
    available: number;
    status: boolean;
    booked: number;
}

export interface DatesBetween {
    [key : string] : ICalendarFormat[]
}
export interface ICalendarFormat {
    date: string;
    day: string;
}

export interface APIRootObject {
    id: string;
    name: string;
    occupancy: number;
    inventory_calendar: InventoryCalendar[];
    rate_plans: IRatePlan[];
}
export interface IRatePlan {
    id: number;
    name: string;
    calendar: ICalendar[];
}
export interface ICalendar {
    id: string;
    date: string;
    rate: number;
    min_length_of_stay?: (null | number)[];
    reservation_deadline?: (null | number)[];
}
export interface InventoryCalendar {
    id: string;
    date: string;
    available: number;
    status: boolean;
    booked: number;
}