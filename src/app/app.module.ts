import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MazeComponent } from './maze/maze.component';
import { MaceCellComponent } from './maze/mace-cell/mace-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MazeComponent,
    MaceCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
