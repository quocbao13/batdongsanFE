import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../account.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AccountAddComponent} from '../account-add/account-add.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'phone', 'cardId', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
  ) {
  }

  openDiaLog(): void {
    const dialogRef = this.dialog.open(AccountAddComponent, {
      width: '1050px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit(): void {
    this.getAccountList();
  }

  getAccountList(): void {
    this.accountService.getAccountList().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
