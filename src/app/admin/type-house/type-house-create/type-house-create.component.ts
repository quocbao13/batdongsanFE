import {Component, Inject, OnInit} from '@angular/core';
import {TypeHouseService} from '../type-house.service';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-type-house-create',
  templateUrl: './type-house-create.component.html',
  styleUrls: ['./type-house-create.component.scss']
})
export class TypeHouseCreateComponent implements OnInit {

  title = 'Thêm Loại Nhà Đất';
  typeHouseForm: FormGroup = this.fb.group({
    id: [],
    name: ['', Validators.required],
    deleteFlag: ['false']
  });
  id: any;
  checkName = true;

  constructor(
    private typeHouseService: TypeHouseService,
    private dialogRef: MatDialogRef<TypeHouseCreateComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.id = data;
  }

  ngOnInit(): void {
    this.initForm();
    if (this.id !== undefined) {
      this.typeHouseService.getTypeHouse(this.id.id).subscribe(data => {
        this.typeHouseForm.setValue(data);
      });
    }
  }

  initForm(): void {
    this.typeHouseForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      deleteFlag: ['false']
    });
  }

  checkDuplicateName(value: any): void {
    this.typeHouseService.checkDuplicateName(value.target.value).subscribe(data => {
      this.checkName = data;
    });
  }

  submitForm(): void {
    if (this.typeHouseForm.valid && this.checkName) {
      this.typeHouseService.createTypeHouse(this.typeHouseForm.getRawValue()).subscribe(data => {
        this.dialogRef.close();
      });
    }
  }
}
