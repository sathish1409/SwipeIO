import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
	selector: "app-about",
	templateUrl: "./about.component.html",
	styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
	constructor(private location: Location) {}
	cancel() {
		this.location.back();
	}
	ngOnInit() {}
}
