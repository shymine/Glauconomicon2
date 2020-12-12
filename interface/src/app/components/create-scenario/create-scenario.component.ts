import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ScenarioService } from 'src/app/services/scenario.service';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-create-scenario',
  templateUrl: './create-scenario.component.html',
  styleUrls: ['./create-scenario.component.css']
})
export class CreateScenarioComponent implements OnInit {

  scenario = {
    'title': '',
    'stages': [] as any[]
  };
  stage = {
    'title': '',
    'description': ''
  };

  submitted = false;
  error = '';

  constructor(private scenarioService: ScenarioService,
    private stageService: StageService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveScenario(): void {
    const data = {'title': this.scenario.title};

    this.scenarioService.create(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
      this.scenario.stages.forEach(stage => {
        this.stageService.create(stage, response.id).subscribe(response => {
          console.log(response);
          this.scenario.stages.push(response);
        }, error => {
          this.error = error;
          console.log(error);
        });
      });
    }, error => {
      this.error = error;
      console.log(error);
    });
  }

  addStage(): void {
    
  }



}
