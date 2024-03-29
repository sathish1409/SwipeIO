import { Time } from "@angular/common";
import { Employee } from "./Employee";

export class Report {
	emp_id: number;
	date: Date;
	in_time: string;
	out_time: string;
	hours_worked: string;
	hours_inside_office: string;
	doubt_flag: boolean;
	is_regularized: boolean;
}
export class ReportParams {
	emp_id: number;
	from: string;
	to: string;
	gate_id: number;
}
export class LastReportParams {
	emp_id: number;
	days: number;
	gate_id: number;
}
export class RefinedLogParams {
	emp_id: number;
	date: string;
	gate_id: number;
}
export class ReportArray {
	employee: Employee;
	repArray: Report[];
}
export class RefinedLog {
	log_id: number;
	date_log: Date;
	time_log: Time;
	inorout: boolean;
	emp_id: number;
	gate_id: number;
	card_id: number;
	remarks: string;
	is_regularized: Boolean;
	regularized_reason_id: number;
	regularized_by: number;
}
export class ShowLog {
	date_log: Date;
	time_log: Time;
	inorout: string;
}
export class ConfigParam {
	description: string;
}
export class Config {
	config_id: number;
	description: string;
	value: string;
}
