

export type  Day = "MONDAY" | "TUESDAY" |"WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
export default class TimeSlot{
    day:Day;
    start_time:string;
    end_time:string;
    constructor(day: Day, start_time: string, end_time: string) {
        this.day = day;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

