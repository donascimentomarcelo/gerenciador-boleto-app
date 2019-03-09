import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserTicketComponent implements OnInit {

  file: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService) { }

  ngOnInit() {
    console.log(this.data)
  }

  public onFileInput(file: FileList): void {
    this.file = file[0];
  }

  public send(): void {
    this.usersService.upload(this.file, this.data.user_id)
      .subscribe(resp => {
        console.log(resp);
      }, error => {
        console.log(error);
      });
  }

}
