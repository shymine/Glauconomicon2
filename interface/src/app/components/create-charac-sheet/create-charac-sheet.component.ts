import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterSheetService } from 'src/app/services/character-sheet.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-charac-sheet',
  templateUrl: './create-charac-sheet.component.html',
  styleUrls: ['./create-charac-sheet.component.css']
})
export class CreateCharacSheetComponent implements OnInit {

  characSheet = {
    'id': undefined,
    "name": "",
    "_name": "",
    "created": false,

    "sections": [{
      'id': undefined,
      "created": false,
      'name': '',
      '_name': '',
      'fields': [],
      '_fields': [],
      'lists': [],
      '_lists': [],
      'tables': [],
      '_tables': []
    }]
  }

  section_index = 0;

  constructor(private dataService: DataService,
    private characterSheetService: CharacterSheetService,
    private router: Router) { }

  ngOnInit(): void {
  }

}
