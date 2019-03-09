import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public no(): void {
    this.dialogRef.close();
  }

  public yes(): void {
    this.usersService.delete(this.data.user_id)
      .subscribe(resp => {
        console.log(resp);
      }, error => console.log(error));
  }

}
