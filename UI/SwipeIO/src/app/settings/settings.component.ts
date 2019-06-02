import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }
  Gates=[{
    gate_id:1,
    gate_name:"Entrance"
  },
  {
    gate_id:2,
    gate_name:"Server Room"
  },
  {
    gate_id:3,
    gate_name:"Pantry"
  }
  
  ];
  Cards=[{
    card_id:1,
    card_number:"12345678"
  },
  {
    card_id:2,
    card_number:"000000102"
  },
  {
    card_id:3,
    card_number:"123455431"
  }
  
  ];
  ngOnInit() {
  }

}
