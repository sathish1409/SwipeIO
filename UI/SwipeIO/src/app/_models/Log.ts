import { Time } from "@angular/common";
import { Employee } from "./Employee";

export class Log {
	LogID: number;
	Date: Date;
	Time: Time;
	Cardid: string;
	Empid: string;
	EmpName: string;
	Department: string;
	Type: string;
	CID: string;
	Gate: string;
	InOut: string;
	Remark: string;
}
export class Cards {
	card_id: number;
	card_number: string;
}

export class RegularizeParameters {
	emp_id: number;
	card_id: number;
	Date: string;
	AddHours: string;
	regularized_reason_id: number;
}
