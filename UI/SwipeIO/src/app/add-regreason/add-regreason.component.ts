import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RegularizedReason } from "app/_models/Setting";
import { MatDialogRef } from "@angular/material";
import { SettingService } from "app/_services/Setting.service";
import { Router } from "@angular/router";
import { AlertService } from "app/_services/alert.service";
import { first } from "rxjs/operators";

@Component({
	selector: "app-add-regreason",
	templateUrl: "./add-regreason.component.html",
	styleUrls: ["./add-regreason.component.scss"]
})
export class AddRegreasonComponent implements OnInit {
	addForm: FormGroup;
	loading = false;
	RegularizedReason: RegularizedReason;
	submitted = false;

	constructor(
		public dialogRef: MatDialogRef<AddRegreasonComponent>,
		private settingService: SettingService,
		private formBuilder: FormBuilder,
		private router: Router,
		private alertService: AlertService
	) {}

	get f() {
		return this.addForm.controls;
	}

	ngOnInit() {
		this.addForm = this.formBuilder.group({
			reg_reason_name: ["", Validators.required]
		});
	}

	onSubmit() {
		// stop here if form is invalid
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}

		this.RegularizedReason = {
			regularized_reason_id: 0,
			regularized_reason: this.addForm.value.reg_reason_name
		};

		this.loading = true;
		this.settingService
			.addRegularizedReason(this.RegularizedReason)
			.pipe(first())
			.subscribe(
				(data) => {
					this.alertService.success(
						"Regularized Reason added successfully",
						true
					);
					this.dialogRef.close();
				},
				(error) => {
					this.alertService.error(error);
					this.loading = false;
				}
			);
	}
}
