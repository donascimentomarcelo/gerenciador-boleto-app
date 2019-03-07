import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MatTabsModule, MatSidenavModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { UsersService } from './../services/users.service';

@NgModule({
  imports: [
CommonModule,
    HomeRoutingModule,
    MatTabsModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  declarations: [HomeComponent],
  providers: [UsersService]
})
export class HomeModule { }
