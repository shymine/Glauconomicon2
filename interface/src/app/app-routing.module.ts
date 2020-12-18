import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateScenarioComponent } from './components/create-scenario/create-scenario.component';
import { HomeComponent } from './components/home/home.component';
import { VisualScenarioComponent } from './components/visual-scenario/visual-scenario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'visual-scenario', component: VisualScenarioComponent },
  { path: 'create-scenario', component: CreateScenarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
