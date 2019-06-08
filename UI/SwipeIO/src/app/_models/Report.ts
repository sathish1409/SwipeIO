import { Time } from "@angular/common";

export class Report {
    emp_id:number;
    date:Date;
    in_time:string;
    out_time:string;
    hours_worked:string;
    hours_inside_office:string;
}
export class ReportParams{
    emp_id:number;
    from:string;
    to:string;
}