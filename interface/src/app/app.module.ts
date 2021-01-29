import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VisualScenarioComponent } from './components/visual-scenario/visual-scenario.component';
import { CreateScenarioComponent } from './components/create-scenario/create-scenario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateCharacSheetComponent } from './components/create-charac-sheet/create-charac-sheet.component';
import { VisualCharacSheetComponent } from './components/visual-charac-sheet/visual-charac-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisualScenarioComponent,
    CreateScenarioComponent,
    CreateCharacSheetComponent,
    VisualCharacSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
