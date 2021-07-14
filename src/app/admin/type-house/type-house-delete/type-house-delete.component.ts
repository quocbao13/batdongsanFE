import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TypeHouseService} from '../type-house.service';

@Component({
  selector: 'app-type-house-delete',
  templateUrl: './type-house-delete.component.html',
  styleUrls: ['./type-house-delete.component.scss']
})
export class TypeHouseDeleteComponent implements OnInit {

  id: any;
  constructor(
    private dialogRef: MatDialogRef<TypeHouseDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private typeHouseService: TypeHouseService
  ) {
    this.id = data;
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.typeHouseService.deleteTypeHouse(this.id.id).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      if (error.status === 200) {
        this.dialogRef.close();
      }
    });
  }
}
