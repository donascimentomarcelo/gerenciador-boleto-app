import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public title: string;
  public formGroup: FormGroup;
  public path;
  public user_id;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.path = this.activatedRoute.url['value'][0].path === 'new';
    this.initForm();
    if (this.path) {
      this.actionsToSave();
    } else {
      this.actionsToEdit();
    }
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [this.path === 'new' ? [null, [Validators.required]] : {value: null, disabled: true}],
      client: this.formBuilder.group({
        name: [null, [Validators.required]],
        lastname: [null],
      })
    });
  }

  public actionsToSave(): void {
    this.title = 'Criar';
  }


  public actionsToEdit(): void {
    this.title = 'Editar';
    this.findUser();
  }

  public findUser(): void {
    const user = this.activatedRoute.url['value'][0].path;
    this.usersService.findOne(user)
      .subscribe(resp => {
        this.user_id = resp.id;
        this.formGroup.controls['password'].disable();
        this.formGroup.controls['username'].setValue(resp.username);
        this.formGroup.controls['client']['controls'].name.setValue(resp['client'].name);
        this.formGroup.controls['client']['controls'].lastname.setValue(resp['client'].lastname);
      });
  }

  public save(): void {
    const user: User = this.formGroup.value;
    if (this.path === 'new') {
      this.create(user);
    } else {
      this.update(user, this.user_id);
    }
  }

  public create(user: User): void {
    this.usersService.save(user)
    .subscribe(resp => {
      this.successMessage();
      this.back();
    }, error => {
      console.log(error);
      this.errorMessage();
    });
  }

  public update(user: User, id: number): void {
    this.usersService.update(user, id)
      .subscribe(resp => {
        this.successMessage();
        this.back();
      }, error => {
        console.log(error);
        this.errorMessage();
      });
  }

  public back(): void {
    this.router.navigate(['/users']);
  }


  public successMessage(): void {
    this.snackBar.open('Registro salvo com sucesso', 'Fechar', {
      duration: 2000,
    });
  }

  public errorMessage(): void {
    this.snackBar.open('Houve um erro ao salvar registro.', 'Fechar', {
      duration: 2000,
    });
  }

}
