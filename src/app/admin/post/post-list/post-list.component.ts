import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PostCreateComponent} from '../post-create/post-create.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PostService} from '../post.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  displayedColumns: string[] = ['subject', 'price', 'area', 'typeHouse', 'project', 'address', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(
    private dialog: MatDialog,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.getPostList();
  }

  openDiaLog(): void {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '1050px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  getPostList(): void {
    this.postService.getPostList().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
