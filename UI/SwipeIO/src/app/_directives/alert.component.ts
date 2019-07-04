import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AlertService } from "../_services/alert.service";
declare var $: any;
@Component({
	selector: "alert",
	templateUrl: "alert.component.html"
})
export class AlertComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	message: any;
	constructor(private alertService: AlertService) {}
	ngOnInit() {
		this.subscription = this.alertService.getMessage().subscribe(message => {
			this.message = message;
			if (message) {
				$.notify(
					{
						icon: "notifications",
						message: message.text
					},
					{
						type: message.type ? message.type : "danger",
						timer: 1000,
						placement: {
							from: "top",
							align: "center"
						},
						template:
							'<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
							'<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
							'<span data-notify="message">{2}</span>' +
							'<div class="progress" data-notify="progressbar">' +
							'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
							"</div>" +
							'<a href="{3}" target="{4}" data-notify="url"></a>' +
							"</div>"
					}
				);
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
