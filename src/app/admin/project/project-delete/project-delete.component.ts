import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.scss']
})
export class ProjectDeleteComponent implements OnInit {

  id: any;
  constructor(
    private dialogRef: MatDialogRef<ProjectDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private projectService: ProjectService
  ) {
    this.id = data;
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.projectService.deleteProject(this.id.id).subscribe(data => {
      this.projectService.getDataToListenSaveOrEdit();
      this.dialogRef.close();
    });
  }
}
