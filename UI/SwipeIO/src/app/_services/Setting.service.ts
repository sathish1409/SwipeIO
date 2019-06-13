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
    delete(id: number) {
        console.log('Called',id);
        return this.http.delete(`${environment.apiUrl}/Setting/gates/` + id);
    }
    deletecards(id: number) {
        console.log('Called',id);
        return this.http.delete(`${environment.apiUrl}/Setting/cards/` + id);
    }
    deleteleaves(id: number) {
        console.log('Called',id);
        return this.http.delete(`${environment.apiUrl}/Setting/leaves/` + id);
    }

/*
    getById(id: number) {
        return this.http.get<Employee>(`${environment.apiUrl}/Employee/` + id);
    }

    register(Employee: Employee) {
        return this.http.post(`${environment.apiUrl}/Employee/add`, Employee);
    }

    update(Employee: Employee) {
        return this.http.put(`${environment.apiUrl}/Employee/` + Employee.emp_id, Employee);
    }

    delete(id: number) {
        console.log('Called');
        return this.http.delete(`${environment.apiUrl}/Employee/` + id);
    }*/
}