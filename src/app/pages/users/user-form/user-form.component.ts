import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public title: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute.url['value'][0].path);
    if (this.activatedRoute.url['value'][0].path === 'new') {
      this.actionsToSave();
    } else {
      this.actionsToEdit();
    }
  }

  public actionsToSave(): void {
    this.title = 'Criar';
  }


  public actionsToEdit(): void {
    this.title = 'Editar';
  }

}
