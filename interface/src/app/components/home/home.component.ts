import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ScenarioService } from 'src/app/services/scenario.service';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CharacterSheetService } from 'src/app/services/character-sheet.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  scenarii: any[] = [];
  sheets: any[] = [];
  plus_icon = faPlus;
  delete_icon = faTrash;

  constructor(private scenarioService: ScenarioService,
    private dataService: DataService,
    private characterSheetService: CharacterSheetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getScenario();
    this.getCharacterSheet();
  }

  getScenario(): void {
    /*
    [{
        "id": 1,
        "title": "SuperScenar",
        "stages": [2,3]
      },{
        "id": 2,
        "title": "SuperScenar",
        "stages": []
      }]
    */
    this.scenarioService.getAll().subscribe(
      data => {
        this.scenarii = data;
        console.log("getAll scenario",data);
      },
      error => {
        console.log("getAll scenario",error);
      }
    )
  }

  goToScenario(scenario: any): void {
    this.dataService.set(scenario);
    this.router.navigate(['/visual-scenario']);
  }

  deleteScenario(index: number): void {
    this.scenarioService.delete(this.scenarii[index].id).subscribe(data => {
      console.log(`Scenario ${this.scenarii[index]} is deleted`);
      this.getScenario()
    },
    error => {
      console.error(`Scenario ${this.scenarii[index]} is not deleted`);
      console.error(error);
    });
  }

  getCharacterSheet(): void {
    /*[{
        "id": 1,
        "name": "TestCharacSheet",
        "sections": [{
                "id": 2,
                "name": "TestSheetSection",
                "fields": [{
                        "id": 2,
                        "name": "TestField",
                        "section": 2
                    }],
                "lists": [{
                        "id": 2,
                        "name": "testList",
                        "section": 2
                    }],
                "tables": [{
                        "id": 2,
                        "headers": ["h1","h2"],
                        "section": 2
                    }],
                "sheet": 1
            }]
    }]*/
    this.characterSheetService.getAll().subscribe(data => {
      this.sheets = data;
      console.log("getAll sheets",data);
    }, error => {
      console.log("getAll sheets",error);
    });
  }

  goToSheet(sheet: any): void {
    this.dataService.set(sheet);
    this.router.navigate(['/visual-sheet'])
  }

  deleteSheet(index: number): void {
    this.characterSheetService.delete(this.sheets[index].id).subscribe(data => {
      console.log(`Character Sheet ${this.sheets[index]} is deleted`);
      this.getCharacterSheet();
    }, error => {
        console.error(`Character Sheet ${this.sheets[index]} is not deleted`);
        console.error(error);
    });
  }

}
