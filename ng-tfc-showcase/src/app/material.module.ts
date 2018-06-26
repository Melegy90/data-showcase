import { NgModule } from '@angular/core';
import {MatButtonModule, 
  MatCheckboxModule, 
  MatMenuModule,
  MatIconModule,
MatTabsModule,
MatInputModule,
MatFormFieldModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, 
    MatCheckboxModule, 
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule],
  exports: [MatButtonModule, 
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule],
})
export class MaterialModule { }