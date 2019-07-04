import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Log } from "../_models/Log";
import { environment } from "environments/environment";

@Injectable()
export class LogService {
	constructor(private http: HttpClient) {}
	upload(Log: Log[]) {
		return this.http.post(`${environment.apiUrl}/Log/upload`, Log);
	}
}
