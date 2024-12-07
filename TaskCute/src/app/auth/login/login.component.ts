import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { AuthenticationService } from '../../guards/authentication.service'
import { Respuesta } from '../../models/Respuesta';
import { Usuario } from '../../models/Usuario';
import { FormBuilder, FormGroup, NgForm, Validators, UntypedFormBuilder } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  inicioNgForm: FormGroup;

  // @ViewChild('inicioNgForm') inicioNgForm: NgForm;

    alert: { message: string } = {
      // type   : 'success',
      message: '',
    };
    inicioFormulario:FormGroup;
    showAlert: boolean = false;

    constructor(
      private _activatedRoute: ActivatedRoute,
      private _autenticacionService: AuthService,
      private _authService: AuthenticationService,
      private _formBuilder: UntypedFormBuilder,
      private _router: Router,
    ){}


    ngOnInit(): void
    {
        // Create the form
        // this.signInForm = this._formBuilder.group({
        //     email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
        //     password  : ['admin', Validators.required],
        //     rememberMe: [''],
        // });
        this.inicioFormulario = this._formBuilder.group({
            email   :['',[Validators.required,Validators.email]],
            password:['',[Validators.required]],
            //recaptcha: ['', Validators.required]
        })
    }

    private errorRespuesta(error:string){
      // Re-enable the form
      this.inicioFormulario.enable();

      // Reset the form
      this.inicioFormulario.reset();

      // Set the alert
      this.alert = {
         // type   : 'error',
          message: error,
      };

      // Show the alert
      this.showAlert = true;
    }


    inicioSesion(){
      this.inicioFormulario.disable();
      this.showAlert = false;
      const usuario = new Usuario();
      usuario.email = this.inicioFormulario.get('email').value;
      usuario.password = this.inicioFormulario.get('password').value;
      this._autenticacionService.iniciarSesion(usuario).subscribe((respuesta)=>{
          console.log(respuesta)
          this._router.navigateByUrl('/list-tareas');
          //this._autenticacionService.decodificarPorId(respuesta);
          this.inicioFormulario.reset();
          this.showAlert = true;
          // Set the alert
          this.alert = {
             //type   : 'success',
             message: respuesta.msg,
          };
      },
      (error:any) =>{
          this.errorRespuesta(error.error.msg)
      })

    }


    signIn(): void
    {
        // Return if the form is invalid
        if ( this.inicioNgForm.invalid )
        {
            return;
        }

        // Disable the form
        this.inicioNgForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.inicioNgForm.value)
            .subscribe(
                () =>
                {
                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/list-tareas';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);

                },
                (response) =>
                {
                    // Re-enable the form
                    this.inicioNgForm.enable();

                    // Reset the form
                    this.inicioNgForm.reset();

                    // Set the alert
                    this.alert = {
                        //type   : 'error',
                        message: 'Wrong email or password',
                    };

                    // Show the alert
                    this.showAlert = true;
                },
            );
    }

}
