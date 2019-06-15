import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card, Gate, Leave } from '../_models/Setting';
import { environment } from 'environments/environment';

@Injectable()
export class SettingService {
    constructor(private http: HttpClient) { }

    getCards() {
        return this.http.get<Card[]>(`${environment.apiUrl}/setting/cards`);
    }
    getGates() {
        return this.http.get<Gate[]>(`${environment.apiUrl}/setting/gates`);
    }
    getLeaves() {
        return this.http.get<Leave[]>(`${environment.apiUrl}/setting/leaves`);
    }
    addCard(Card: Card) {
        return this.http.post(`${environment.apiUrl}/setting/addCard`, Card);
    }
    addGate(Gate: Gate) {
        return this.http.post(`${environment.apiUrl}/setting/addGate`, Gate);
    }
    addLeave(Leave: Leave) {
        return this.http.post(`${environment.apiUrl}/setting/addLeave`, Leave);
    }
    deletegate(id: number) {
        console.log('Called',id);
        return this.http.delete(`${environment.apiUrl}/Setting/gates/` + id);
    }
    deletecard(id: number) {
        console.log('Called',id);
        return this.http.delete(`${environment.apiUrl}/Setting/cards/` + id);
    }
    deleteleave(id: number) {
        console.log('Called',id);
        return this.http.delete(`${environment.apiUrl}/Setting/leaves/` + id);
    }
}