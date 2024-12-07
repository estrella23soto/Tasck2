import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { Respuesta } from '../../models/Respuesta';
import { Usuario } from '../../models/Usuario';
import { FormBuilder, FormGroup, NgForm, Validators, UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  readonly dialog = inject(MatDialog);

  constructor(
      private _autenticacionService: AuthService,
      private _formBuilder: UntypedFormBuilder,
      private _router: Router,
      private fb: FormBuilder
  ) { }

  @ViewChild('registroNgForm') registroNgForm!: NgForm;

    alert: { message: string } = {
     // type   : 'success',
      message: '',
    };
    showAlert: boolean = false;
    public formularioRegistro!:FormGroup;


  ngOnInit(): void
    {
        this.formularioRegistro = this._formBuilder.group({
            name:        ['',[Validators.required]],
            email:       ['',[Validators.required, Validators.email]],
            password:    ['',[Validators.required]],
            //role:        ['',[Validators.required]]
        });
    }

    // openDialog() {
    //   const dialogRef = this.dialog.open(DialogContentExampleDialog);

    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log(`Dialog result: ${result}`);
    //   });
    // }

    private errorRespuesta(error:string){
      // Re-enable the form
      this.formularioRegistro.enable();

      // Reset the form
      this.formularioRegistro.reset();

      // Set the alert
      this.alert = {
          message: error,
      };

      // Show the alert
      this.showAlert = true;
 }

  public registrarUsuario(){
    this.formularioRegistro.disable();
    this.showAlert = false;
    const usuario = new Usuario();
    usuario.name = this.formularioRegistro.get('name')?.value;
    usuario.email = this.formularioRegistro.get('email')?.value;
    usuario.password = this.formularioRegistro.get('password')?.value;
    //usuario.role = this.formularioRegistro.get('role').value;
    console.log(usuario)
    this._autenticacionService.registrarUsuario(usuario).subscribe({
    next:(respuesta:Respuesta) =>{
        this.formularioRegistro.reset();
        this.showAlert = true;
        // Set the alert

        this.alert = {
            //type   : 'success',
            message: respuesta.msg,
        };

        this._autenticacionService.decodificarPorId(respuesta);
    },
    error:(error)=>{
        console.log(error)
        this.errorRespuesta(error.error.msg)
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
