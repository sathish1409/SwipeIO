import { Report } from "./Report";

export class Employee {
	emp_id: number;
	email: string;
	pass_word: string;
	emp_name: string;
	emp_number: string;
	is_admin: boolean;
	is_contract: boolean;
	card_id: number;
	card_number: string;
	incharges: number[];
	report: Report[];
}
