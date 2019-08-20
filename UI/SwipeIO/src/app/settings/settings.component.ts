import { Component, OnInit } from "@angular/core";
import { Gate, Card, Leave, RegularizedReason } from "app/_models/Setting";
import { first } from "rxjs/operators";
import { SettingService } from "app/_services/Setting.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ConfirmationBoxComponent } from "app/confirmation-box/confirmation-box.component";
import { MatDialog } from "@angular/material";
import { AddGateComponent } from "app/add-gate/add-gate.component";
import { AddCardComponent } from "app/add-card/add-card.component";
import { AddRegreasonComponent } from "app/add-regreason/add-regreason.component";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
	constructor(
		private ngxService: NgxUiLoaderService,
		private settingService: SettingService,
		public dialog: MatDialog
	) {}
	Gates: Gate[];
	Cards: Card[];
	Leaves: Leave[];
	RegularizedReasons: RegularizedReason[];
	addGate() {
		const dialogRef = this.dialog.open(AddGateComponent, {});
		dialogRef.afterClosed().subscribe((result) => {
			this.getGates();
		});
	}
	addCard() {
		const dialogRef = this.dialog.open(AddCardComponent, {});
		dialogRef.afterClosed().subscribe((result) => {
			this.getCards();
		});
	}

	addRegularizedReason() {
		const dialogRef = this.dialog.open(AddRegreasonComponent, {});
		dialogRef.afterClosed().subscribe((result) => {
			this.getRegularizedReasons();
		});
	}

	deleteGate(gate: Gate) {
		const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
			data: { name: gate.gate_name }
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result)
				this.settingService
					.deletegate(gate.gate_id)
					.pipe(first())
					.subscribe(() => {
						this.getGates();
					});
		});
	}

	deleteRegularizedReason(reg: RegularizedReason) {
		const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
			data: { name: reg.regularized_reason }
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result)
				this.settingService
					.deleteRegularizedReason(reg.regularized_reason_id)
					.pipe(first())
					.subscribe(() => {
						this.getRegularizedReasons();
					});
		});
	}

	deleteCards(card: Card) {
		const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
			data: { name: card.card_number }
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result)
				this.settingService
					.deletecard(card.card_id)
					.pipe(first())
					.subscribe(() => {
						this.getCards();
					});
		});
	}
	deleteLeaves(leave: Leave) {
		const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
			data: { name: leave.leave_name }
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result)
				this.settingService
					.deleteleave(leave.leave_id)
					.pipe(first())
					.subscribe(() => {
						this.getLeaves();
					});
		});
	}

	getGates() {
		this.settingService
			.getGates()
			.pipe(first())
			.subscribe((gates) => {
				this.Gates = gates;
			});
	}

	getCards() {
		this.settingService
			.getCards()
			.pipe(first())
			.subscribe((cards) => {
				this.Cards = cards;
			});
	}

	getLeaves() {
		this.settingService
			.getLeaves()
			.pipe(first())
			.subscribe((leaves) => {
				this.Leaves = leaves;
			});
	}
	getRegularizedReasons() {
		this.settingService
			.getRegularizedReason()
			.pipe(first())
			.subscribe((regularizedReasons) => {
				this.RegularizedReasons = regularizedReasons;
			});
	}

	ngOnInit() {
		this.ngxService.stop();
		this.getGates();
		this.getCards();
		this.getLeaves();
		this.getRegularizedReasons();
		this.ngxService.stop();
	}
}
