import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

const exporting = [NavigationBarComponent];

@NgModule({
  declarations: [...exporting],
  imports: [CommonModule, RouterModule],
  exports: [...exporting],
})
export class NavigationModule {}
