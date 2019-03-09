import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
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
    public dialogRef: MatDialogRef<UserTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public onFileInput(file: FileList): void {
    this.file = file[0];
    const ext = this.file.name.split('.').pop();
    if (this.file.size > 439940) {
      this.snackBar.open('Envie um arquivo de até 432 KB.', 'Fechar', {
        duration: 2000,
      });
      this.file = null;
    }

   if(ext !== 'pdf') {
    this.snackBar.open('Selecione um arquivo .PDF.', 'Fechar', {
      duration: 2000,
    });
    this.file = null;
   }
  }

  public send(): void {

    if (!this.file) {
      this.snackBar.open('Selecione um arquivo válido.', 'Fechar', {
        duration: 2000,
      });
      return;
    }

    this.usersService.upload(this.file, this.data.user_id)
      .subscribe(resp => {
        this.successMessage();
        this.close();
      }, error => {
        this.errorMessage();
      });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public successMessage(): void {
    this.snackBar.open('Upload realizado com sucesso', 'Fechar', {
      duration: 2000,
    });
  }

  public errorMessage(): void {
    this.snackBar.open('Houve um erro ao realizar upload.', 'Fechar', {
      duration: 2000,
    });
  }

}
