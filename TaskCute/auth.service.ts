import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { enviromentAuth } from '../../environments/environment.auth';
import { Respuesta } from '../../models/Respuesta';
import { Usuario } from '../../models/Usuario';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public fechaExpiracion: any;

  constructor(private httpClient: HttpClient, private _router: Router) { }

  private url: string = `${enviromentAuth.urlAuth}/api/auth`;
  private _usuario: ReplaySubject<Usuario> = new ReplaySubject<Usuario>(1);
  public autenticado: boolean = false;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  set usuario(value: Usuario) {
    this._usuario.next(value);
  }

  get usuario$(): Observable<Usuario> {
    return this._usuario.asObservable();
  }

  get headers() {
    return {
      headers: {
        'x-token': this.accessToken
      }
    }
  }

  checharAutenticacion(): Observable<boolean> {
    if (this.accessToken) {
      console.log("autenticado checharAutenticacion")
      return of(true);
    }
    console.log('no false 2')
    return of(false);
  }

  public signOut(): Observable<any> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('usuario');
    this.autenticado = false;
    return of(true);
  }

  validarToken(): Observable<boolean> {
    console.log("Validar Token");
    return this.httpClient.get(`${this.url}/renovar`, {
      headers: {
        'x-token': this.accessToken
      }
    }).pipe(
      map((resp: any) => {
        console.log(resp);
        const { email, nombre, role, uid } = resp.usuarioDB;
        this.usuario = new Usuario(nombre, email, '', role, uid);
        console.log("renovar" + resp.token);
        this.fechaExpiracion = this.decodeToken();
        localStorage.setItem('fechaExpiracion', this.fechaExpiracion.exp);
        return true;
      }),
    );
  }

  public decodeToken(): any {
    const token = this.accessToken;
    console.log("decodeToken" +token)
    if (!token) {
      throw new Error('No token found');
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken;
  }

  public decodificarPorId(respuesta: Respuesta) {
    console.log( "respuesta backend: usuario registrador"+ this.accessToken);
    this.accessToken = respuesta.data;
    console.log( "access token decodificarPorId"+ this.accessToken);
    this.autenticado = true;
    this.fechaExpiracion = this.decodeToken();
    localStorage.setItem('fechaExpiracion', this.fechaExpiracion.exp)
    console.log('fechaExpiracion')
    console.log(this.fechaExpiracion)
    const numero: any = this.decodeToken();

    this.buscarPorId(numero._id).subscribe(data => {
      console.log(data)
      this.usuario = data.data;
      setTimeout(() => {
        localStorage.setItem('usuario', JSON.stringify(data.data))
      }, 2000)
    });
  }

  checharLocalStorage() {
    console.log("checharLocalStorage");
    const usuario = localStorage.getItem('usuario');
    if (usuario !== '' && usuario !== null && usuario !== undefined) {
      localStorage.removeItem('usuario');
    }
  }

  public registrarUsuario(usuario: Usuario): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>(`${this.url}/nuevo`, usuario, this.httpOptions);
  }

  public iniciarSesion(usuario: Usuario): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>(`${this.url}/`, usuario);
  }

  public buscarPorId(_id: string): Observable<Respuesta> {
    return this.httpClient.get<Respuesta>(`${this.url}/buscar_id/${_id}`);
  }
}
