import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { Client } from './../../models/client';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public clients: Client[] = [];
  public username: string;

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.list();
  }

  public list(): void {
    this.usersService.list()
      .subscribe(res => this.clients = res);
  }

  public download(): void {
    console.log(this.username);
    this.usersService.download(this.username)
      .subscribe(resp => {
        const blob = new Blob([resp], {type: 'application/octet-stream'});
        saveAs(blob, this.username + '.pdf');
        this.snackBar.open('Boleto gerado com sucesso.', 'Fechar', {
          duration: 2000,
        });
      }, error => {
        this.snackBar.open('O boleto não pode ser gerado.', 'Fechar', {
          duration: 2000,
        });
      });
  }

}
