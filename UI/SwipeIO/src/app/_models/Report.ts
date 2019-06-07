import { Time } from "@angular/common";

export class Report {
    emp_id:number;
    date:Date;
    in_time:Time;
    out_time:Time
    hours_worked:Time
}
export class ReportParams{
    emp_id:number;
    from:string;
    to:string;
}