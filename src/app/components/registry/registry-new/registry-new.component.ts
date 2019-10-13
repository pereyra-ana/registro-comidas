import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { RegistryService } from 'src/app/services/registry/registry.service';

@Component({
  templateUrl: './registry-new.component.html',
  styleUrls: ['./registry-new.component.css']
})

export class RegistryNewComponent {

  registriesJson: string;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private registryService: RegistryService) { }

  submitJson(): void {
    let parsedJson = null;
    try {
      parsedJson = JSON.parse(this.registriesJson);
      this.registryService.addRegistry(parsedJson).subscribe(data => {
        console.log(data);

        this.snackBar.open('Registro cargado con éxito', 'Cerrar', {
          duration: 2000,
        });
        this.router.navigate([`/registry/list`]);
      })
    }
    catch (error) {
      this.snackBar.open('Formato inválido', 'Cerrar', {
        duration: 2000,
      });
    }
  }

}
