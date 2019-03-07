import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { Client } from './../../models/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public clients: Client[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.list();
  }

  public list(): void {
    this.usersService.list()
      .subscribe(res => this.clients = res);
  }

}
