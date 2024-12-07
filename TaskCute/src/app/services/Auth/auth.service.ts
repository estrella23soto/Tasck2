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

  private url: string = enviromentAuth?.urlAuth 
  ? `${enviromentAuth.urlAuth}/api/auth`
  : `http://192.168.49.2:30333/api/auth`;
  
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
    return of(!!this.accessToken);
  }

  public signOut(): Observable<any> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('usuario');
    this.autenticado = false;
    return of(true);
  }

  validarToken(): Observable<boolean> {
    return this.httpClient.get(`${this.url}/renovar`, {
      headers: {
        'x-token': this.accessToken
      }
    }).pipe(
      map((resp: any) => {
        const { email, nombre, role, uid } = resp.usuarioDB;
        this.usuario = new Usuario(nombre, email, '', role, uid);
        this.fechaExpiracion = this.decodeToken();
        localStorage.setItem('fechaExpiracion', this.fechaExpiracion.exp);
        return true;
      })
    );
  }

  public decodeToken(): any {
    const token = this.accessToken;
    if (!token) throw new Error('No token found');
    return jwtDecode(token);
  }

  public decodificarPorId(respuesta: Respuesta) {
    this.accessToken = respuesta.data;
    this.autenticado = true;
    this.fechaExpiracion = jwtDecode(this.accessToken);
    localStorage.setItem('fechaExpiracion', this.fechaExpiracion.exp);
    const id = this.decodeToken()._id;
    this.buscarPorId(id).subscribe(data => {
      this.usuario = data.data;
      localStorage.setItem('usuario', JSON.stringify(data.data));
    });
  }

  checharLocalStorage() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) localStorage.removeItem('usuario');
  }

  public registrarUsuario(usuario: Usuario): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>(`${this.url}/nuevo`, usuario, this.httpOptions);
  }

  public iniciarSesion(usuario: Usuario): Observable<Respuesta> {
    return this.httpClient.post<Respuesta>(`${this.url}/`, usuario, this.httpOptions);
  }

  public buscarPorId(id: string): Observable<Respuesta> {
    return this.httpClient.get<Respuesta>(`${this.url}/buscar/${id}`);
  }
}
