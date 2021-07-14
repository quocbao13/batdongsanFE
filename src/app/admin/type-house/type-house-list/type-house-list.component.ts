import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TypeHouseCreateComponent} from '../type-house-create/type-house-create.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TypeHouseService} from '../type-house.service';
import {MatTableDataSource} from '@angular/material/table';
import {TypeHouseDeleteComponent} from '../type-house-delete/type-house-delete.component';

@Component({
  selector: 'app-type-house-list',
  templateUrl: './type-house-list.component.html',
  styleUrls: ['./type-house-list.component.scss']
})
export class TypeHouseListComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'deleteFlag', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private dialog: MatDialog,
    private typeHouseService: TypeHouseService
  ) {
  }

  ngOnInit(): void {
    this.getTypeHouseList();
  }

  openDiaLog(): void {
    const dialogRef = this.dialog.open(TypeHouseCreateComponent, {
      width: '1050px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTypeHouseList();
    });
  }

  openDiaLogWithId(id: any): void {
    const dialogRef = this.dialog.open(TypeHouseCreateComponent, {
      width: '1050px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTypeHouseList();
    });
  }

  openDiaLogDeleteWithId(id: any): void {
    const dialogRef = this.dialog.open(TypeHouseDeleteComponent, {
      width: '1050px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTypeHouseList();
    });
  }

  getTypeHouseList(): void {
    this.typeHouseService.getTypeHouseList().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
