import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceTaskService } from '../services/service.task.service';
import { ToastrService } from 'ngx-toastr';

interface Tarea {
  _id: string;
  nombre: string;
  descripcion?: string;
  fechaVencimiento?: Date;
  completada: boolean;
}

@Component({
  selector: 'app-tasck',
  templateUrl: './tasck.component.html',
  styleUrls: ['./tasck.component.css']
})
export class TasckComponent implements OnInit {
  tareas: Tarea[] = [];
  tareaForm: FormGroup;

  constructor(
    private tareasService: ServiceTaskService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,private toastr: ToastrService
  ) {
    this.tareaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaVencimiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  agregarTarea(): void {
    if (this.tareaForm.invalid) {
      return;
    }

    const nuevaTarea: Tarea = {
      ...this.tareaForm.value,
      completada: false, // Valor por defecto para completada
      idUsuario: '1234'  // Valor fijo para idUsuario
    };
    console.log("nueva tarea",nuevaTarea)

    this.tareasService.createTask(nuevaTarea).subscribe(
      response => {
        this.toastr.success('Tarea agregada con éxito');
        this.tareaForm.reset();
      },
      error => {
        console.error('Error al agregar tarea:', error);
        this.mostrarMensaje('Error al agregar la tarea', 'error');
        this.toastr.error('Error al agregar la tarea',error);
      }
    );
  }

  mostrarMensaje(mensaje: string, tipo: string) {
    this.snackBar.open(mensaje, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: tipo === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}
