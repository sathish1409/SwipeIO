import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AlertService } from "../_services/alert.service";
import { EmployeeService } from "../_services/Employee.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Employee } from "app/_models/Employee";
import { Card } from "app/_models/Setting";
import { SettingService } from "app/_services/Setting.service";

@Component({
	selector: "app-add",
	templateUrl: "./add.component.html",
	styleUrls: ["./add.component.scss"]
})
export class AddComponent implements OnInit {
	addForm: FormGroup;
	loading = false;
	Employees: Employee[];
	Cards: Card[];
	submitted = false;
	visibilityStat = false;
	passIconName = "visibility";
	passType = "password";
	constructor(
		private settingService: SettingService,
		private formBuilder: FormBuilder,
		private router: Router,
		private EmployeeService: EmployeeService,
		private alertService: AlertService,
		private ngxService: NgxUiLoaderService
	) {}
	togglePassword() {
		if (!this.visibilityStat) {
			this.visibilityStat = true;
			this.passType = "text";
			this.passIconName = "visibility_off";
		} else {
			this.visibilityStat = false;
			this.passType = "password";
			this.passIconName = "visibility";
		}
	}
	ngOnInit() {
		this.ngxService.start();
		this.EmployeeService.getAll()
			.pipe(first())
			.subscribe((Employees) => {
				this.Employees = Employees;
			});
		this.settingService
			.getCards()
			.pipe(first())
			.subscribe((cards) => {
				this.Cards = cards;
			});
		this.visibilityStat = false;
		this.addForm = this.formBuilder.group({
			emp_name: ["", Validators.required],
			email: ["", [Validators.required, Validators.email]],
			emp_id: ["", [Validators.required, Validators.minLength(8)]],
			pass_word: ["", [Validators.required, Validators.minLength(8)]],
			card_id: ["", Validators.required],
			selectedEmployee1Search: [""],
			is_admin: [""],
			is_contract: [""],
			incharges: [""]
		});

		this.ngxService.stop();
	}

	// convenience getter for easy access to form fields
	get f() {
		return this.addForm.controls;
	}

	param: Employee;

	onSubmit() {
		// stop here if form is invalid
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}

		this.param = {
			emp_id: 0,
			emp_number: this.addForm.value.emp_id,
			emp_name: this.addForm.value.emp_name,
			email: this.addForm.value.email,
			pass_word: this.addForm.value.pass_word,
			is_admin:
				this.addForm.value.is_admin == null ||
				this.addForm.value.is_admin == false
					? false
					: true,
			is_contract:
				this.addForm.value.is_contract == null ||
				this.addForm.value.is_contract == false
					? false
					: true,
			card_id: this.addForm.value.card_id.card_id,
			card_number: this.addForm.value.card_id.card_number,
			incharges: this.addForm.value.incharges,
			report: null
		};
		console.log(this.param);

		this.loading = true;
		this.EmployeeService.register(this.param)
			.pipe(first())
			.subscribe(
				(data) => {
					this.alertService.success("Employee added successfully", true);
					this.router.navigate(["/addorremove"]);
				},
				(error) => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
	}
}
