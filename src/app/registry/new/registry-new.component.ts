import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  templateUrl: './registry-new.component.html',
  styleUrls: ['./registry-new.component.css']
})
export class RegistryNewComponent {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar) { }


  submitJson(): void {
    this.snackBar.open('Registro cargado con exito', 'Cerrar', {
      duration: 2000,
    });
    this.router.navigate([`/registry/list`]);
  }

}
