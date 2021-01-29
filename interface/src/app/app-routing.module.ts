import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCharacSheetComponent } from './components/create-charac-sheet/create-charac-sheet.component';
import { CreateScenarioComponent } from './components/create-scenario/create-scenario.component';
import { HomeComponent } from './components/home/home.component';
import { VisualCharacSheetComponent } from './components/visual-charac-sheet/visual-charac-sheet.component';
import { VisualScenarioComponent } from './components/visual-scenario/visual-scenario.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'visual-scenario', component: VisualScenarioComponent },
  { path: 'create-scenario', component: CreateScenarioComponent },
  { path: 'create-sheet', component: CreateCharacSheetComponent },
  { path: 'visual-sheet', component: VisualCharacSheetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
