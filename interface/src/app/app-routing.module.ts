import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateScenarioComponent } from './components/create-scenario/create-scenario.component';
import { CreateStageComponent } from './components/create-stage/create-stage.component';
import { HomeComponent } from './components/home/home.component';
import { VisualScenarioComponent } from './components/visual-scenario/visual-scenario.component';
import { VisualStageComponent } from './components/visual-stage/visual-stage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  {path: 'visual-scenario/:id', component: VisualScenarioComponent },
  { path: 'visual-stage/:id', component: VisualStageComponent },
  { path: 'create-scenario/:id', component: CreateScenarioComponent },
  { path: 'create-stage/:id', component: CreateStageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
