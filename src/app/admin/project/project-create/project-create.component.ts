import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  projectForm: FormGroup = this.fb.group({
    id: [],
    name: ['', Validators.required],
    manager: ['', Validators.required],
    scale: ['', Validators.required],
    description: ['', Validators.required],
    deleteFlag: [false],
  });
  id: any;
  title = 'Thêm mới Dự Án';
  constructor(
    private dialogRef: MatDialogRef<ProjectCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder,
    private projectService: ProjectService,
  ) {
    this.id = data;
  }

  ngOnInit(): void {
    this.initForm();
    if (this.id !== undefined) {
      this.projectService.getProject(this.id.id).subscribe(data => {
        this.projectForm.setValue(data);
      });
      this.title = 'Sửa Dự Án';
    }
  }
  initForm(): void {
    this.projectForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      manager: ['', Validators.required],
      scale: ['', Validators.required],
      description: ['', Validators.required],
      deleteFlag: ['false'],
    });
  }

  submitForm(): void {
    if (this.projectForm.valid) {
      this.projectForm.get('description')?.setValue(unescape(decodeURIComponent(this.projectForm.get('description')?.value)));
      this.projectService.saveProject(this.projectForm.getRawValue()).subscribe(data => {
        this.dialogRef.close();
        this.projectService.getDataToListenSaveOrEdit();
      });
    }
  }
}
