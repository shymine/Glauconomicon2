import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ScenarioService } from 'src/app/services/scenario.service';
import { StageService } from 'src/app/services/stage.service';
import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-scenario',
  templateUrl: './create-scenario.component.html',
  styleUrls: ['./create-scenario.component.css']
})
export class CreateScenarioComponent implements OnInit {

  fa_save = faSave;
  fa_close = faTrash;
  fa_plus = faPlus;

  scenario = {
    'title': '',
    '_title': '',
    'created': false,
    'id': undefined,

    'stages': [{
      'title': '',
      '_title': '',
      'description': '',
      '_description': '',
      'id': undefined,
      'created': false
    }],
  };
  sc_index = 0;

  error = '';

  constructor(private scenarioService: ScenarioService,
    private stageService: StageService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.dataService.isPresent()) {
      const data = this.dataService.get();
      this.scenario.title = data.title;
      this.scenario._title = data.title;
      this.scenario.created = true;
      this.scenario.id = data.id;
      this.scenario.stages.pop()!;
      data.stages.forEach((stage: any) => {
        const stg = {
          'title': stage.title,
          '_title': stage.title,
          'description': stage.description,
          '_description': stage.description,
          'id': stage.id,
          'created': true
        }
        this.scenario.stages.push(stg);
      });
    }
  }

  saveScenario(): void {
    // Nothing is created yet, must save all
    if(!this.scenario.created) {
      const scen = { 'title': this.scenario.title, 'stages': [] };

      this.scenarioService.create(scen).subscribe(response => {
        console.log(response);
        this.scenario._title = response.title;
        this.scenario.id = response.id;
        this.scenario.created = true;
        console.log('stages creation: ', this.scenario.stages);
        this.scenario.stages.forEach(stage => {
          const stg = {'title': stage.title, 'description': stage.description};
          this.stageService.create(stg, response.id).subscribe(response => {
            console.log(response);
            stage._title = response.title;
            stage._description = response.description;
            stage.id = response.id;
            stage.created = true;
          }, error => {
            console.error(error);
          });
        });
      }, error => {
        console.error(error);
      });
    } else {
      // check that the scenario have been updated if yes, update it
      // for each stages, check if it has been updated if yes,
      //    check if it has already been created if yes, create it
      //    if not, update it with the given id
      if(this.scenario.title != this.scenario._title) {
        const scen = { 'title': this.scenario.title, 'stages': this.scenario.stages.filter(stage => stage.id != undefined).map(stage => stage.id)};
        console.log(scen);
        this.scenarioService.update(this.scenario.id as unknown as number, scen).subscribe(response => {
          console.log(response);
          this.scenario._title = response.title;
        }, error => {
          console.error(error);
        });
      }
      console.log('stages updating: ', this.scenario.stages.filter(stage => {
        return stage.title != stage._title || stage.description != stage._description;
      }));
      this.scenario.stages.filter(stage => {
        return stage.title != stage._title || stage.description != stage._description;
      }).forEach(stage => {
        if(!stage.created) {
          const stg = {'title': stage.title, 'description': stage.description};
          this.stageService.create(stg, this.scenario.id as unknown as number).subscribe(response => {
            console.log(response);
            stage._title = response.title;
            stage._description = response.description;
            stage.id = response.id;
            stage.created = true;
          }, error => {
            console.error(error);
          });
        } else {
          const stg = {'title': stage.title, 'description': stage.description, 'id': stage.id}
          this.stageService.update(this.scenario.id as unknown as number, stage.id as unknown as number, stg).subscribe(response => {
            console.log(response);
            stage._title = response.title;
            stage._description = response.description;
          }, error => {
            console.error(error);
          });
        }
      });
    }
  }

  visualize(): void {
    // TODO: make it go to the visual-scenario and drop the unsaved elements
    //       the scenario itself must be saved, otherwise, popup that say that it is
    //       not saved and thus cannot be visualized

  }

  addStage(): void {

    this.scenario.stages.push({
      'title': '',
      'description': '',
      '_title': '',
      '_description': '',
      'created': false,
      'id': undefined
    });
    this.sc_index += 1;
  }

  removeStage(): void {
    if (this.scenario.stages.length > 1) {
      const stg = this.scenario.stages[this.sc_index];
      if(stg.created) {
        this.stageService.delete(this.scenario.id as unknown as number, stg.id as unknown as number).subscribe(response => {
          console.log(response);
          this.scenario.stages.splice(this.sc_index, 1);
          this.sc_index -= 1;
          if (this.sc_index < 0) { this.sc_index = 0; }
        }, error => {
          console.error(error);
        });
      } else {
        this.scenario.stages.splice(this.sc_index, 1);
        this.sc_index -= 1;
        if (this.sc_index < 0) { this.sc_index = 0; }
      }
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
