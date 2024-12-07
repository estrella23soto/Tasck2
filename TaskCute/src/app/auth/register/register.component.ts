import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { Respuesta } from '../../models/Respuesta';
import { Usuario } from '../../models/Usuario';
import { FormBuilder, FormGroup, NgForm, Validators, UntypedFormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  readonly dialog = inject(MatDialog);

  openPrivacyPolicy(): void {
    window.open('../../../assets/Politica de privacidad.html', '_blank');
  }

  constructor(
    private _autenticacionService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  @ViewChild('registroNgForm') registroNgForm!: NgForm;

  alert: { type: string, message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  public formularioRegistro!: FormGroup;


  ngOnInit(): void {
    this.formularioRegistro = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required,this.validatePassword],
      //role:        ['',[Validators.required]]
    });
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogContentExampleDialog);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  private errorRespuesta(error: string) {
    // Re-enable the form
    this.formularioRegistro.enable();

    // Reset the form
    this.formularioRegistro.reset();

    // Set the alert
    this.alert = {
      type: 'success',
      message: error,
    };

    // Show the alert
    this.showAlert = true;
  }
  public validatePassword(control: FormControl): Promise<any> | Observable<any> {
    const password = control.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    console.log(control)
    return new Promise((resolve) => {
      if (passwordRegex.test(password)) {
        resolve({ invalidPassword: true });
        console.log('false')
      } else {
        console.log('true')
        resolve({ invalidPassword: true });
      }
    });
  }

  public registrarUsuario() {
    this.formularioRegistro.disable();
    this.showAlert = false;
    const usuario = new Usuario();
    usuario.name = this.formularioRegistro.get('name')?.value;
    usuario.email = this.formularioRegistro.get('email')?.value;
    usuario.password = this.formularioRegistro.get('password')?.value;
    //usuario.role = this.formularioRegistro.get('role').value;
    console.log(usuario)
    this._autenticacionService.registrarUsuario(usuario).subscribe({
      next: (respuesta: Respuesta) => {
        this.toastr.success(respuesta.msg);
        this.formularioRegistro.reset();
        // Set the alert

        this.alert = {
          type: 'success',
          message: respuesta.msg,
        };

        this._autenticacionService.decodificarPorId(respuesta);
        this.formularioRegistro.enable();

      },
      error: (error) => {
        this.errorRespuesta(error.error.msg);
        console.error('Error al resgistrarte', error.error.msg);
        this.toastr.error('Error al resgistrarte', error.error.msg);
      }
    })

  }

  // signUp(): void
  //   {
  //       // Do nothing if the form is invalid
  //       if ( this.signUpForm.invalid )
  //       {
  //           return;
  //       }

  //       // Disable the form
  //       this.registroNgForm.disable();

  //       // Hide the alert
  //       this.showAlert = false;

  //       // Sign up
  //       this._autenticacionService.signUp(this.registroNgForm.value)
  //           .subscribe(
  //               (response) =>
  //               {
  //                   // Navigate to the confirmation required page
  //                   this._router.navigateByUrl('/confirmation-required');
  //               },
  //               (response) =>
  //               {
  //                   // Re-enable the form
  //                   this.registroNgForm.enable();

  //                   // Reset the form
  //                   this.registroNgForm.resetForm();

  //                   // Set the alert
  //                   this.alert = {
  //                       //type   : 'error',
  //                       message: 'Something went wrong, please try again.',
  //                   };

  //                   // Show the alert
  //                   this.showAlert = true;
  //               },
  //           );
  //   }

}
