import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Registry } from 'src/app/model/registry';
import { RegistryService } from 'src/app/services/registry/registry.service';

export interface DialogData {
  result: boolean;
}

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.css']
})
export class RegistryFormComponent {

  tiposDeEvento: string[] = ['Bebida', 'Desayuno', 'Almuerzo', 'Cena', 'Colación', 'Síntoma', 'Actividad Física'];

  platosList: string[] = [];
  bebidasList: string[] = [];
  notFoodRegistryValue: string;

  fecha: Date;
  tipoEvento: string;

  registros: Registry[] = [];

  constructor(
    public dialogRef: MatDialogRef<RegistryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private registroService: RegistryService,
    private snackBar: MatSnackBar) { }

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

  assemblyRegistrosAndCreate(): void {
    this.data.result = true;

    if (this.tipoEvento != 'Síntoma' && this.tipoEvento != 'Actividad Física') {
      this.platosList.forEach(p => {
        let r = new Registry();
        r.tipo = 'comida';
        r.datetime = this.fecha;
        r.tipoEvento = this.tipoEvento;
        console.log(p);
        console.log(p.split("|"))
        r.valor = p.split("|")[0];
        r.cantidad = p.split("|")[1] ? +p.split("|")[1] : 1
        this.registros.push(r)
      });

      this.bebidasList.forEach(b => {
        let r = new Registry();
        r.tipo = 'bebida';
        r.datetime = this.fecha;
        r.tipoEvento = this.tipoEvento;
        r.valor = b.split("|")[0];
        r.cantidad = b.split("|")[1] ? +b.split("|")[1] : 1
        this.registros.push(r)
      });
    } else {
      let r = new Registry();
      r.tipoEvento = this.tipoEvento;
      r.datetime = this.fecha;
      r.tipo = this.tipoEvento == "Síntoma" ? 'síntoma' : 'misceláneo';
      r.valor = this.notFoodRegistryValue;
      this.registros.push(r);
    }
    console.log(this.registros)

    this.registroService.createRegistry(this.registros).subscribe(resp => {
      console.log(resp);
      this.snackBar.open('Registro cargado con éxito', 'Cerrar', {
        duration: 2000,
      });
      // this.dialogRef.close();
    });

  }

  trackByFn(index: any, item: any) {
    return index;
 }
}