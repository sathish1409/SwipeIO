import { Component, OnInit } from '@angular/core';
import { Gate, Card, Leave } from 'app/_models/Setting';
import { first } from 'rxjs/operators';
import { SettingService } from 'app/_services/Setting.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService,private settingService:SettingService) { }
  Gates:Gate[];
  Cards:Card[];
  Leaves:Leave[];
  ngOnInit() {
    this.ngxService.start();   
    this.settingService.getCards().pipe(first()).subscribe(cards => {   
      this.Cards=cards;
    });
    this.settingService.getGates().pipe(first()).subscribe(gates => {  
      this.Gates=gates; 
    });
    this.settingService.getLeaves().pipe(first()).subscribe(leaves => {   
      this.Leaves=leaves;
    });
    this.ngxService.stop();   
  }

}
