import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
      // Todo: Componentes
    RegisterComponent,
    LoginComponent
   ],
  imports: [
    NgOptimizedImage,
      BrowserModule,
      CommonModule,
      // LayoutModule,
      RouterLink,
      RouterModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      MatIconModule,
      MatSelectModule,
      MatCheckboxModule,
      ReactiveFormsModule,
      MatProgressSpinnerModule,
      MatDialogModule,
  ],
  exports: [
    RegisterComponent,
    LoginComponent
  ]
})
export class AuthModule {}
