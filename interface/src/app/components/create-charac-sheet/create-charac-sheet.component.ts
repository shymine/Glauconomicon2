import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterSheetService } from 'src/app/services/character-sheet.service';
import { DataService } from 'src/app/services/data.service';
import { SheetSectionsService } from 'src/app/services/sheet-sections.service';

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
      'fields': [],
      'lists': [],
      'tables': [],
    }]
  }

  section_index = 0;

  constructor(private dataService: DataService,
    private characterSheetService: CharacterSheetService,
    private sheetSectionService: SheetSectionsService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.dataService.isPresent()) {
      const data = this.dataService.get();
      this.characSheet.name = data.name;
      this.characSheet._name = data._name;
      this.characSheet.created = true;
      this.characSheet.id = data.id;
      this.characSheet.sections.pop()!;
      data.sections.forEach((section: any) => {
        const sct = {
          'id': section.id,
          'created': true,
          'name': section.name,
          '_name': section.name,
          'fields': section.fields,
          '_fields': section.fields,
          'lists': section.lists,
          '_lists': section.lists,
          'tables': section.tables,
          '_tables': section.tables
        };
        this.characSheet.sections.push(sct);
      });
    }
  }

  saveSheet(): void {
    if(!this.characSheet.created) {
      const sheet = { 'name': this.characSheet.name , 'sections': [] };
      this.characterSheetService.create(sheet).subscribe(response => {
        console.log(response);
        this.characSheet._name = response.title;
        this.characSheet.id = response.id;
        this.characSheet.created = true;
        console.log('sections creation: ', this.characSheet.sections);
        this.characSheet.sections.forEach(section => {
          const sct = {'name': section.name, 'fields': section.fields, 'lists': section.lists, 'tables': section.tables};
          this.sheetSectionService.create(sct, response.id).subscribe(response => {
            console.log(response);
            section.id = response.id;
            section.created = true;
          });
        });
      });
    }else {
      if(this.characSheet.name != this.characSheet._name) {
        const sheet = { 'name': this.characSheet.name, 'sections': this.characSheet.sections.filter(section => {
          section.id != undefined;
        }) };
        console.log(sheet);
        this.characterSheetService.update(this.characSheet.id as unknown as number, sheet).subscribe(response => {
          console.log(response);
          this.characSheet._name = response.name;
        }, error => {
          console.error(error);
        });
        this.characSheet.sections.forEach(section => {
          if(!section.created) {
            const sct = {'name': section.name, 'fields': section.fields, 'lists': section.lists, 'tables': section.tables};
            this.sheetSectionService.create(sct, this.characSheet.id as unknown as number).subscribe(response => {
              console.log(response);
              section.created = true;
              section.id = response.id;
            }, error => {
              console.error(error);
            });
          } else {
            const sct = { 'name': section.name, 'fields': section.fields, 'lists': section.lists, 'tables': section.tables };
            this.sheetSectionService.update(this.characSheet.id, section.id, sct).subscribe(response => {
              console.log(response);
            }, error => {
              console.error(error);
            });
          }
        });
      }
    }
  }

}
