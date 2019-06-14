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

    
    const dialogRef = this.dialog.open(ConfirmationBoxComponent,{
      data: {name:gate.gate_name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.settingService.delete(gate.gate_id).pipe(first()).subscribe(() => { 
        this.getGates();
      });
    }); 
    
  }


  deleteCards(card: Card) {
    const dialogRef = this.dialog.open(ConfirmationBoxComponent,{
      data: {name:card.card_number}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.settingService.delete(card.card_id).pipe(first()).subscribe(() => { 
        this.getCards();
      });
    }); 
}
  deleteLeaves(leave: Leave) {

    const dialogRef = this.dialog.open(ConfirmationBoxComponent,{
      data: {name:leave.leave_name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.settingService.delete(leave.leave_id).pipe(first()).subscribe(() => { 
        this.getLeaves();
      });
    }); 

}



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
  
  
  ngOnInit() {
    this.ngxService.stop(); 
    this.getGates();
    this.getCards();
    this.getLeaves();
    this.ngxService.stop();   
  }

}
