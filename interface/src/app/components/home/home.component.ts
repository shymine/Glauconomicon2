import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ScenarioService } from 'src/app/services/scenario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  scenarii: any[] = [];

  constructor(private scenarioService: ScenarioService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getScenario();
  }

  getScenario(): void {
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
    this.dataService.set(id);
    this.router.navigate(['/visual-scenario']);
  }

}
