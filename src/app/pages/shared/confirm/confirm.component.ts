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
    this.dialogRef.close(false);
  }

  public yes(): void {
    this.usersService.delete(this.data.user_id)
      .subscribe(resp => {
        this.snackBar.open('Registro excluído com sucesso.', 'Fechar', {
          duration: 2000,
        });
        this.dialogRef.close(true);
      }, error => {
        this.snackBar.open('Houve um erro ao excluir registro.', 'Fechar', {
          duration: 2000,
        });
      });
  }

}
