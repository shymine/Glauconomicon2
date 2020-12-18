import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ScenarioService } from 'src/app/services/scenario.service';
import { StageService } from 'src/app/services/stage.service';
import { faSave, faCross } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-scenario',
  templateUrl: './create-scenario.component.html',
  styleUrls: ['./create-scenario.component.css']
})
export class CreateScenarioComponent implements OnInit {

  fa_save = faSave;
  fa_close = faCross;

  scenario = {
    'title': '',
    'stages': [{
      'title': '',
      'description': ''
    }]
  };
  sc_index = 0;

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
    const data = {'title': this.scenario.title, 'stages': []};

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
    this.scenario.stages.push({
      'title': '',
      'description': ''
    });
    this.sc_index += 1;
  }

  removeStage(): void {
    if (this.scenario.stages.length > 1) {
      this.scenario.stages.splice(this.sc_index, 1);
      this.sc_index -= 1;
    }
  }

  nextStage(): void {
    if (this.sc_index < this.scenario.stages.length-1) {
      this.sc_index += 1;
    }
  }

  previousStage(): void {
    if (this.sc_index > 0) {
      this.sc_index -= 1;
    }
  }

  goToStage(i: number): void {
    this.sc_index = i;
  }

}
