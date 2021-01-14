import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ScenarioService } from 'src/app/services/scenario.service';
import { StageService } from 'src/app/services/stage.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visual-scenario',
  templateUrl: './visual-scenario.component.html',
  styleUrls: ['./visual-scenario.component.css']
})
export class VisualScenarioComponent implements OnInit {

  fa_write = faPen;

  scenario: any;
  sc_index = 0;

  constructor(private dataService: DataService,
              private stageService: StageService,
              private scenarioService: ScenarioService,
              private router: Router) { }

  ngOnInit(): void {
    const scenario = this.dataService.get();
    console.log(scenario);
    if(isNaN(scenario)) {
      this.get_Stages(scenario);
    } else {
      this.scenarioService.get(scenario).subscribe(response => {
        const tmp_scen = response;
        this.get_Stages(tmp_scen);
      });
    }
  }

  private get_Stages(scenario: any): void {
    this.scenario = {
      id: scenario.id,
      title: scenario.title,
      stages: []
    };
    scenario.stages.forEach((element: number) => {
      this.stageService.get(this.scenario.id, element).subscribe(data => {
        console.log(data);
        this.scenario.stages.push(data)
      });
    });
  }

  nextStage(): void {
    if (this.sc_index < this.scenario.stages.length - 1) {
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

  modify(): void {
    this.dataService.set(this.scenario);
    this.router.navigate(['/create-scenario']);
  }

}
