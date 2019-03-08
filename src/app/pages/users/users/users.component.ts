import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './../../services/users.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { PeriodicElement } from '../../models/periodicElement';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['Nome', 'Sobrenome', 'details', 'update', 'delete'];
  dataSource;
  total: number;
  pageIndex = 1;
  perPage: number;
  page = 1;
  last_page: number;
  splicedData;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.list();
  }

  public list(): void {
    this.usersService.list()
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(resp as any);
        this.dataSource.paginator = this.paginator;
        this.total = resp.length;
      });
  }
}
