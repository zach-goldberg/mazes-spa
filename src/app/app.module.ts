import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MazeComponent } from './maze-page/maze/maze.component';
import { MazeCellComponent } from './maze-page/maze/maze-cell/maze-cell.component';
import { MazePageComponent } from './maze-page/maze-page.component';
import { MazeSetupComponent } from './maze-setup/maze-setup.component';
import { AppRouterModule } from './app-router.module';

@NgModule({
  declarations: [
    AppComponent,
    MazeComponent,
    MazeCellComponent,
    MazePageComponent,
    MazeSetupComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
