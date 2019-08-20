import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Card, Gate, Leave, RegularizedReason } from "../_models/Setting";
import { environment } from "environments/environment";

@Injectable()
export class SettingService {
	constructor(private http: HttpClient) {}

	getCards() {
		return this.http.get<Card[]>(`${environment.apiUrl}/Setting/cards`);
	}
	getGates() {
		return this.http.get<Gate[]>(`${environment.apiUrl}/Setting/gates`);
	}
	getLeaves() {
		return this.http.get<Leave[]>(`${environment.apiUrl}/Setting/leaves`);
	}
	getRegularizedReason() {
		return this.http.get<RegularizedReason[]>(
			`${environment.apiUrl}/Setting/regularized_reasons`
		);
	}
	getRegularizedReasonById(id) {
		return this.http.get<RegularizedReason>(
			`${environment.apiUrl}/Setting/regularized_reason/${id}`
		);
	}

	addCard(Card: Card) {
		return this.http.post(`${environment.apiUrl}/Setting/addCard`, Card);
	}
	addGate(Gate: Gate) {
		return this.http.post(`${environment.apiUrl}/Setting/addGate`, Gate);
	}
	addLeave(Leave: Leave) {
		return this.http.post(`${environment.apiUrl}/Setting/addLeave`, Leave);
	}
	addRegularizedReason(regularizedReason: RegularizedReason) {
		return this.http.post(
			`${environment.apiUrl}/Setting/addRegularizedReason`,
			regularizedReason
		);
	}
	deletegate(id: number) {
		return this.http.delete(`${environment.apiUrl}/Setting/gates/` + id);
	}
	deletecard(id: number) {
		return this.http.delete(`${environment.apiUrl}/Setting/cards/` + id);
	}
	deleteleave(id: number) {
		return this.http.delete(`${environment.apiUrl}/Setting/leaves/` + id);
	}
	deleteRegularizedReason(id: number) {
		return this.http.delete(
			`${environment.apiUrl}/Setting/regularized_reasons/` + id
		);
	}
}
