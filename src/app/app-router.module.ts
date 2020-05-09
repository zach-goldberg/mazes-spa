import { NgModule } from '@angular/core';
import { MazeSetupComponent } from './maze-setup/maze-setup.component';
import { MazePageComponent } from './maze-page/maze-page.component';
import { RouterModule } from '@angular/router';

const appRoutes = [
  { path: '', component: MazeSetupComponent },
  { path: 'maze', component: MazePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouterModule {

}
