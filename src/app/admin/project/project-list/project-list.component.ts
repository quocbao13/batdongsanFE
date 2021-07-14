import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProjectCreateComponent} from '../project-create/project-create.component';
import {ProjectService} from '../project.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectDeleteComponent} from '../project-delete/project-delete.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'manager', 'scale', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService
  ) {
    this.onloadProjectList();
  }

  ngOnInit(): void {
    this.getProjectList();
  }

  onloadProjectList(): void {
    this.projectService.listenSaveOrEdit().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDiaLog(): void {
    const dialogRef = this.dialog.open(ProjectCreateComponent, {
      width: '1050px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getProjectList(): void {
    this.projectService.getProjectList().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogWithId(id: number): void {
    const dialogRef = this.dialog.open(ProjectCreateComponent, {
      width: '1050px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(ProjectDeleteComponent, {
      width: '600px',
      data: {id}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
