import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeHouseListComponent } from './type-house-list/type-house-list.component';
import { RouterModule } from '@angular/router';
import {TypeHouseRoutingModule} from './type-house-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { TypeHouseCreateComponent } from './type-house-create/type-house-create.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TypeHouseDeleteComponent } from './type-house-delete/type-house-delete.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
    TypeHouseListComponent,
    TypeHouseCreateComponent,
    TypeHouseDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    TypeHouseRoutingModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class TypeHouseModule { }
