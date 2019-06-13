import { Component, OnInit } from '@angular/core';
import { Gate, Card, Leave } from 'app/_models/Setting';
import { first } from 'rxjs/operators';
import { SettingService } from 'app/_services/Setting.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationBoxComponent } from 'app/confirmation-box/confirmation-box.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService,private settingService:SettingService,public dialog: MatDialog) { }
  Gates:Gate[];
  Cards:Card[];
  Leaves:Leave[];
  deleteGate(gate: Gate) {
   
    if(this.confirm(gate.gate_name)){
      this.settingService.delete(gate.gate_id).pipe(first()).subscribe(() => { 
        this.getGates();
      });
    }
 
  }
  deleteCards(card: Card) {
  
    if(this.confirm(card.card_number)){
    this.settingService. deletecards(card.card_id).pipe(first()).subscribe(() => { 
     
      this.getCards();
  });this.ngxService.stop();  }}
  deleteLeaves(leave: Leave) {

    if(this.confirm(leave.leave_name)){
    this.settingService.deleteleaves(leave.leave_id).pipe(first()).subscribe(() => { 
      this.getLeaves();
  }); }}



  getGates(){
    this.settingService.getGates().pipe(first()).subscribe(gates => {  
      this.Gates=gates; 
    });
  }
  
  getCards(){
    this.settingService.getCards().pipe(first()).subscribe(cards => {   
      this.Cards=cards;
    });
  }
  
  getLeaves(){
    this.settingService.getLeaves().pipe(first()).subscribe(leaves => {   
      this.Leaves=leaves;
    });
  
  }


confirm(name):boolean{
  const dialogRef = this.dialog.open(ConfirmationBoxComponent,{
    data: {name:name}
  });
  dialogRef.afterClosed().subscribe(result => {
    return result;
  });
  return false;
}
  
  
  ngOnInit() {
    this.ngxService.stop(); 
    this.getGates();
    this.getCards();
    this.getLeaves();
    this.ngxService.stop();   
  }

}
