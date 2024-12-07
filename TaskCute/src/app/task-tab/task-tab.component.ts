import { Component, OnInit } from '@angular/core';
import { ServiceTaskService } from '../services/service.task.service';
import { ToastrService } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Tarea {
  _id: string;
  nombre: string;
  descripcion?: string;
  fechaVencimiento?: Date;
  completada: boolean;
  idUsuario?: string;  // Añade esta propiedad si es relevante para tu lógica
}

@Component({
  selector: 'app-task-tab',
  templateUrl: './task-tab.component.html',
  styleUrls: ['./task-tab.component.css']
})
export class TaskTabComponent implements OnInit {
  tareas: Tarea[] = [];

  nuevaTarea: Tarea = { _id: "", nombre: '', descripcion: '', fechaVencimiento: undefined, completada: false };

  constructor(private tareasService: ServiceTaskService, private toastr: ToastrService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas(): void {
    this.tareasService.getTasks().subscribe(
      (respuesta: any) => {
        console.log('Respuesta del servicio:', respuesta);
        this.tareas = respuesta.tasks; // Accede a la propiedad 'tasks' del objeto
        // this.toastr.success('Tareas obtenidas exitosamente');
        this.logTareas();
      },
      error => {
        console.error('Error al obtener tareas', error);
        this.toastr.error('Error al obtener tareas');
      }
    );
  }


  eliminarTarea(id: string): void {
    //const confirmacion = confirm('¿Estás seguro de que quieres eliminar esta tarea?');
  
   
      console.log("Iddddddddddddddd", id.toString());
      this.tareasService.deleteTask(id.toString()).subscribe(
        () => {
          this.tareas = this.tareas.filter(tarea => tarea._id !== id);
          this.toastr.success('Tarea eliminada exitosamente');
          this.logTareas();
        },
        error => {
          console.error('Error al eliminar tarea', error);
          this.toastr.error('Error al eliminar tarea');
        }
      );
    
  }
  

  actualizarTarea(tarea: Tarea): void {
    this.tareasService.updateTask(tarea._id.toString(), tarea).subscribe(
      () => {
        this.toastr.success('Tarea actualizada exitosamente');
        this.logTareas();

      },
      error => {
        console.error('Error al actualizar tarea', error);
        this.toastr.error('Error al actualizar tarea');
      }
    );
  }



  get tareasPendientes(): Tarea[] {
    const hoy = new Date();
    const pendientes = (this.tareas || []).filter(tarea => {
      const vencimientoValido = !tarea.fechaVencimiento || new Date(tarea.fechaVencimiento) > hoy;
      return !tarea.completada && vencimientoValido;
    });
    console.log('Tareas pendientes:', pendientes);
    return pendientes;
  }


  get tareasCompletadas(): Tarea[] {
    const completadas = this.tareas.filter(tarea => tarea.completada);
    console.log('Tareas completadas:', completadas);
    return completadas;
  }

  get tareasVencidas(): Tarea[] {
    const hoy = new Date(); // Fecha actual en la zona horaria local
    console.log('Fecha de hoy:', hoy);

    const vencidas = this.tareas.filter(tarea => {
      if (tarea.fechaVencimiento) {
        const fechaVencimiento = new Date(tarea.fechaVencimiento); // Convierte a Date
        // Comparar las fechas en UTC para evitar problemas de zona horaria
        const hoyUTC = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate()));
        const vencimientoUTC = new Date(Date.UTC(fechaVencimiento.getUTCFullYear(), fechaVencimiento.getUTCMonth(), fechaVencimiento.getUTCDate()));

        console.log('Fecha de vencimiento:', vencimientoUTC);
        return !tarea.completada && vencimientoUTC < hoyUTC;
      }
      return false; // Si no hay fecha de vencimiento, no es vencida
    });

    console.log('Tareas vencidas:', vencidas);
    return vencidas;
  }

  private logTareas(): void {
    console.log('Todas las tareas:', this.tareas);
    console.log('Tareas pendientes:', this.tareasPendientes);
    console.log('Tareas completadas:', this.tareasCompletadas);
    console.log('Tareas vencidas:', this.tareasVencidas);
  }
}
