import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VisualScenarioComponent } from './components/visual-scenario/visual-scenario.component';
import { VisualStageComponent } from './components/visual-stage/visual-stage.component';
import { CreateStageComponent } from './components/create-stage/create-stage.component';
import { CreateScenarioComponent } from './components/create-scenario/create-scenario.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisualScenarioComponent,
    VisualStageComponent,
    CreateStageComponent,
    CreateScenarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
