import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSave, faTrash, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
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
      'fields': [] as any[],
      'lists': [] as any[],
      'tables': [] as any[],
    }]
  }

  fa_save = faSave;
  fa_close = faTrash;
  fa_plus = faPlus;
  fa_eye = faEye;

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
    console.log("save sheet", this.characSheet);
    if(!this.characSheet.created) {
      const sheet = { 'name': this.characSheet.name , 'sections': [] };
      this.characterSheetService.create(sheet).subscribe(response => {
        console.log(response);
        this.characSheet._name = response.title;
        this.characSheet.id = response.id;
        this.characSheet.created = true;
        console.log('sections creation: ', this.characSheet.sections);
        this.characSheet.sections.forEach(section => {
          const sct = {'name': section.name, 'fields': section.fields.map(f => {return {'name': f.name}}), 'lists': section.lists.map(l => {return {'name': l.name}}), 'tables': section.tables.map(t => {return {"headers": t.headers.map((h: any) => {return {"name": h.name}})}})};
          console.log("sct", sct);
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
            const sct = { 'name': section.name, 'fields': section.fields.map(f => { return { 'name': f.name } }), 'lists': section.lists.map(l => { return { 'name': l.name } }), 'tables': section.tables.map(t => { return { "headers": t.headers.map((h: any) => { return { "name": h.name } }) } }) };
            this.sheetSectionService.create(sct, this.characSheet.id as unknown as number).subscribe(response => {
              console.log(response);
              section.created = true;
              section.id = response.id;
            }, error => {
              console.error(error);
            });
          } else {
            const sct = { 'name': section.name, 'fields': section.fields.map(f => { return { 'name': f.name } }), 'lists': section.lists.map(l => { return { 'name': l.name } }), 'tables': section.tables.map(t => { return { "headers": t.headers.map((h: any) => { return { "name": h.name } }) } }) };
            this.sheetSectionService.update(this.characSheet.id as unknown as number, section.id as unknown as number, sct).subscribe(response => {
              console.log(response);
            }, error => {
              console.error(error);
            });
          }
        });
      }
    }
  }

  deleteSheet(): void {
    if(!this.characSheet.created) {
      this.router.navigate(['/home']);
    } else {
      this.characterSheetService.delete(this.characSheet.id as unknown as number).subscribe(response => {
        console.log(response);
        this.router.navigate(['/home']);
      });
    }
  }

  visualize(): void {
    if(!this.characSheet.created) {
      return;
    }
    this.saveSheet();
    this.dataService.set(this.toJSON());
    this.router.navigate(['/visual-sheet']);
  }

  private toJSON(): any {
    let sheet = {
      "name": this.characSheet.name,
      "id": this.characSheet.id,
      "sections": [] as any[]
    }
    this.characSheet.sections.forEach(section => {
      sheet.sections.push({
        'id': section.id,
        'name': section.name,
        'fields': section.fields,
        'lists': section.lists,
        'tables': section.tables
      });
    });
    return sheet;
  }

  addSection(): void {
    this.characSheet.sections.push({
      'id': undefined,
      "created": false,
      'name': '',
      'fields': [],
      'lists': [],
      'tables': [],
    });
  }

  removeSection(i: number): void {
    if(this.characSheet.sections.length>1) {
      const sct = this.characSheet.sections[i];
      if(sct.created) {
        this.sheetSectionService.delete(this.characSheet.id as unknown as number, sct.id as unknown as number).subscribe(response => {
          console.log(response);
          this.characSheet.sections.splice(i, 1);
        });
      } else {
        this.characSheet.sections.splice(i, 1);
      }
    } else {
      const sct = this.characSheet.sections[0];
      if(sct.created) {
        this.sheetSectionService.delete(this.characSheet.id as unknown as number, sct.id as unknown as number).subscribe(response => {
          console.log(response);
          this.characSheet.sections[0] = {
            'id': undefined,
            "created": false,
            'name': '',
            'fields': [],
            'lists': [],
            'tables': [],
          };
        });
      } else {
        this.characSheet.sections[0] = {
          'id': undefined,
          "created": false,
          'name': '',
          'fields': [],
          'lists': [],
          'tables': [],
        };
      }
    }
  }

  addField(sct_id: number): void {
    this.characSheet.sections[sct_id].fields.push({'name': ''});
  }

  removeField(sct_id: number, f_id: number): void {
    this.characSheet.sections[sct_id].fields.splice(f_id, 1);
  }

  addList(sct_id: number): void {
    this.characSheet.sections[sct_id].lists.push({'name': ''});
  }

  removeList(sct_id: number, lst_id: number): void {
    this.characSheet.sections[sct_id].lists.splice(lst_id, 1);
  }

  addTable(sct_id: number): void {
    this.characSheet.sections[sct_id].tables.push({'headers': [{'name': ''}]});
    console.log("addTable",this.characSheet.sections[sct_id].tables);
  }

  removeTable(sct_id: number, tbl_id: number): void {
    this.characSheet.sections[sct_id].tables.splice(tbl_id, 1);
  }

  addHeader(sct_id: number, tbl_id: number): void {
    this.characSheet.sections[sct_id].tables[tbl_id].headers.push({'name': ''});
    console.log("addHeader", this.characSheet.sections[sct_id].tables);
  }

  removeHeader(sct_id: number, tbl_id: number, head_id: number): void {
    const tbl = this.characSheet.sections[sct_id].tables[tbl_id];
    tbl.headers.splice(head_id,1);
    if (tbl.headers.length == 0) {
      tbl.headers.push('');
    }
  }


}
