import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Registry } from 'src/app/model/registry';
import { RegistryService } from 'src/app/services/registry/registry.service';

export interface DialogData {
  oneRegistry: boolean;
  result: boolean;
  registry: Registry
}

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.css']
})
export class RegistryFormComponent implements OnInit {

  tiposDeEvento: string[] = ['Bebida', 'Desayuno', 'Almuerzo', 'Cena', 'Colación', 'Síntoma', 'Actividad Física', 'Medicación', 'Misceláneo'];

  platosList: string[] = [];
  bebidasList: string[] = [];
  notFoodRegistryValue: string;

  fecha: Date;
  tipoEvento: string;
  horaRegistro: string;
  minutosRegistro: string;

  registros: Registry[] = [];
  registriesJson: any;

  constructor(
    public dialogRef: MatDialogRef<RegistryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private registroService: RegistryService,
    private snackBar: MatSnackBar) { }

  update: boolean = false;
  registryBackup: Registry;
  oneRegistry: boolean;

  ngOnInit() {
    if (this.data.registry != null) {
      this.registryBackup = JSON.parse(JSON.stringify(this.data.registry));
      this.update = true;
      this.tipoEvento = this.data.registry.tipoEvento;
      this.platosList = this.data.registry.tipo == 'comida' ? this.data.registry.cantidad > 1 ? [[this.data.registry.valor, this.data.registry.cantidad].join("|")] : [this.data.registry.valor] : []
      this.fecha = new Date(this.data.registry.datetime);
      this.bebidasList = this.data.registry.tipo == 'bebida' ? this.data.registry.cantidad > 1 ? [[this.data.registry.valor, this.data.registry.cantidad].join("|")] : [this.data.registry.valor] : []
      this.notFoodRegistryValue = this.data.registry.tipo != 'comida' && this.data.registry.tipo != 'bebida' ? this.data.registry.valor : null;
      this.horaRegistro = new Date(this.data.registry.datetime).getHours().toString();
      this.minutosRegistro = new Date(this.data.registry.datetime).getMinutes().toString();
    }
    else {
      this.fecha = new Date();
      this.horaRegistro = new Date().getHours().toString();
      this.minutosRegistro = new Date().getMinutes().toString();
    }

    this.oneRegistry = this.data.oneRegistry;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewPlato(): void {
    let aux = '';
    this.platosList.push(aux);
  }

  addNewBebida(): void {
    let aux = '';
    this.bebidasList.push(aux);
  }

  removePlato(i: number): void {
    this.platosList.splice(i, 1);
  }

  removeBebida(i: number): void {
    this.bebidasList.splice(i, 1);
  }

  assemblyRegistrosAndSubmit(): void {
    this.data.result = true;

    if (this.tipoEvento != 'Síntoma' && this.tipoEvento != 'Actividad Física' && this.tipoEvento != 'Medicación' && this.tipoEvento != 'Misceláneo'){
      this.platosList.filter(rp => rp != null && rp != '').forEach(p => {
        let r = new Registry();
        r.tipo = 'comida';

        this.fecha.setHours(+this.horaRegistro);
        this.fecha.setMinutes(+this.minutosRegistro);
        r.datetime = this.fecha;

        r.tipoEvento = this.tipoEvento;
        r.valor = p.split("|")[0];
        r.cantidad = p.split("|")[1] ? +p.split("|")[1] : 1
        this.registros.push(r)
      });

      this.bebidasList.filter(rp => rp != null && rp != '').forEach(b => {
        let r = new Registry();
        r.tipo = 'bebida';

        this.fecha.setHours(+this.horaRegistro);
        this.fecha.setMinutes(+this.minutosRegistro);
        r.datetime = this.fecha;

        r.tipoEvento = this.tipoEvento;
        r.valor = b.split("|")[0];
        r.cantidad = b.split("|")[1] ? +b.split("|")[1] : 1
        this.registros.push(r)
      });
    } else {
      if (this.notFoodRegistryValue != null && this.notFoodRegistryValue != '') {
        let r = new Registry();
        r.tipoEvento = this.tipoEvento;

        this.fecha.setHours(+this.horaRegistro);
        this.fecha.setMinutes(+this.minutosRegistro);
        r.datetime = this.fecha;

        r.tipo = this.tipoEvento;
        r.valor = this.notFoodRegistryValue;
        this.registros.push(r);
      }
    }

    if (this.update == true) {
      this.registroService.deleteRegistry(this.registryBackup).subscribe(data => {
        console.log(data);
      }, error => {
        this.snackBar.open('Error realizando acción', 'Cerrar', {
          duration: 2000,
        });
        return;
      })
    }
    this.registroService.createRegistry(this.registros).subscribe(resp => {
      console.log(resp);
      if (this.update == false)
        this.snackBar.open('Registro cargado con éxito', 'Cerrar', {
          duration: 2000,
        });
      else
        this.snackBar.open('Registro actualizado con éxito', 'Cerrar', {
          duration: 2000,
        });
    }, error => {
      this.snackBar.open('Error realizando acción', 'Cerrar', {
        duration: 2000,
      });
      return;
    });

  }

  trackByFn(index: any, item: any) {
    return index;
  }

  submit(): void {
    this.assemblyRegistrosAndSubmit();
  }

  submitJson(): void {
    let parsedJson = JSON.parse(this.registriesJson);
    this.registroService.addRegistries(parsedJson).subscribe(data => {
      this.snackBar.open('Registros cargados con éxito', 'Cerrar', {
        duration: 2000,
      });
    }, error => {
      this.snackBar.open('Error realizando acción', 'Cerrar', {
        duration: 2000,
      });
      return;
    });
  }

  isJsonValid(json: string): boolean {
    if (json != null && json != '') {
      try {
        JSON.parse(json);
        return true;
      } catch {
        return false;
      }
    } return false;
  }

}