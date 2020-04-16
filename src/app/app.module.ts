import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MazeComponent } from './maze/maze.component';
import { MazeCellComponent } from './maze/maze-cell/maze-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MazeComponent,
    MazeCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
