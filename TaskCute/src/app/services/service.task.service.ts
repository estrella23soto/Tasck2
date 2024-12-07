import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/env'; // Asegúrate de tener esta importación para usar variables de entorno

interface Tarea {
  _id: string;
  nombre: string;
  descripcion?: string;
  fechaVencimiento?: Date;
  completada: boolean;
  idUsuario?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {
  private apiUrl = `http://192.168.49.2:30333/api/tasks`; // URL base para la API de tareas

  constructor(private http: HttpClient) {}

  // Crear una nueva tarea
  createTask(task: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, task);
  }

  // Obtener todas las tareas
  getTasks(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}`);
  }


  // Obtener tareas por ID de usuario
  getTasksByUserId(idUsuario: string): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  // Actualizar una tarea
  updateTask(id: string, task: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, task);
  }

  // Eliminar una tarea
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
