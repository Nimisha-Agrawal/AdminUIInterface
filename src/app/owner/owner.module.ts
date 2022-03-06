import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerRoutingModule } from './owner-routing/owner-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [OwnerListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    OwnerRoutingModule,
    FlexLayoutModule,
    FormsModule,
  ],
})
export class OwnerModule {}
