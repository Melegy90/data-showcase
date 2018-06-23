import { NgModule } from '@angular/core';
import {MatButtonModule, 
  MatCheckboxModule, 
  MatMenuModule
,MatIconModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, 
    MatCheckboxModule, 
    MatMenuModule,
    MatIconModule],
  exports: [MatButtonModule, 
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule],
})
export class MaterialModule { }