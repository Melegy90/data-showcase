import { NgModule } from '@angular/core';
import {MatButtonModule, 
  MatCheckboxModule, 
  MatMenuModule,
  MatIconModule,
MatTabsModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, 
    MatCheckboxModule, 
    MatMenuModule,
    MatIconModule,
    MatTabsModule],
  exports: [MatButtonModule, 
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule],
})
export class MaterialModule { }