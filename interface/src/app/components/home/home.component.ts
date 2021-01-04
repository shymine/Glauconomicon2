import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ScenarioService } from 'src/app/services/scenario.service';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  scenarii: any[] = [];
  plus_icon = faPlus;
  delete_icon = faTrash;

  constructor(private scenarioService: ScenarioService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getScenario();
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
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  goToScenario(id: number): void {
    console.log("coucou ", id);
    this.dataService.set(this.scenarii.find(s => s["id"] == id));
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

}
