import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Registry } from 'src/app/model/registry';
import { RegistryDay } from 'src/app/model/registry-day';
import { RegistryService } from 'src/app/services/registry/registry.service';
import { RegistryFormComponent } from '../registry-form/registry-form.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

@Component({
  templateUrl: './registry-list.component.html',
  styleUrls: ['./registry-list.component.css'],
  providers: [DatePipe]
})

export class RegistryListComponent implements OnInit {
  displayedColumns: string[] = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
  dataSource: RegistryDay[] = [];
  totalRegistries: number = 0;

  startDate: Date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  endDate: Date = new Date();
  valor: string;

  weekday = [
    "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
  ]

  getWeekDay(d: string) {
    let day = d.substring(0, 2);
    let month = d.substring(3, 5);
    let year = d.substring(6);

    let date = new Date(month + "/" + day + "/" + year);
    return date.getDay() != 0 ? this.weekday[date.getDay() - 1] : this.weekday[this.weekday.length - 1]
  }

  result: boolean;

  constructor(
    private registryService: RegistryService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAll();
  }

  openNewRegistryDialog(registry: Registry, oneRegistry: boolean): void {
    const dialogRef = this.dialog.open(RegistryFormComponent, {
      width: '250px',
      data: { result: this.result, registry: registry, oneRegistry: oneRegistry }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getAll();
    });
  }

  dateAlreadyInResult(result: RegistryDay[], d: string) {
    let aux = 0;
    let found = false;
    result.forEach(e => {
      if (e.datetime === d) {
        found = true;
        return;
      }
      aux += 1;
    });
    return found ? aux : -1;
  }

  groupByDay(registries: Registry[]): RegistryDay[] {
    let result: RegistryDay[] = [];

    registries.forEach(r => {
      let date = this.datePipe.transform(r.datetime, 'dd/MM/yyyy');

      let index = this.dateAlreadyInResult(result, date);
      if (index == -1) {
        let rd = new RegistryDay();
        rd.datetime = date;
        rd.registries = [r];
        result.push(rd);
      } else {
        result[index].registries.push(r)
      }

    })
    return result.sort((a, b) => {
      let aauxD = a.datetime.substring(0, 2);
      let aauxM = a.datetime.substring(3, 5);
      let aauxY = a.datetime.substring(6);

      let bauxD = b.datetime.substring(0, 2);
      let bauxM = b.datetime.substring(3, 5);
      let bauxY = b.datetime.substring(6);

      return new Date(`${aauxM}/${aauxD}/${aauxY}`) > new Date(`${bauxM}/${bauxD}/${bauxY}`) ? -1 : 1
    });
  }

  startDateFilter(): any {
    if (this.endDate){
      return (date: Date) => date <= this.endDate;
    } else {
      return (date: Date) => date <= new Date();
    }
  };

  endDateFilter(): any {
    if (this.startDate){
      return (date: Date) => date >= this.startDate;
    } else {
      return (date: Date) => date >= new Date("01/01/2000");
    }
  }

  getAll(): void {
    this.registryService.getAll(this.startDate, this.endDate, this.valor).subscribe(resp => {
      this.dataSource = this.groupByDay(resp);
      this.totalRegistries = resp.length;
    });
  }

  search(): void {
    this.getAll();
  }

  updateRegistry(registry: Registry): void {
    this.registryService.updateRegistry(registry).subscribe(data => {
      this.getAll();
    })
  }

  deleteRegistry(registry: Registry): void {
    this.registryService.deleteRegistry(registry).subscribe(data => {
      this.getAll();
    })
  }

  confirm: boolean;

  openConfirmDeleteDialog(registry: Registry): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: { confirm: this.confirm }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteRegistry(registry);
    });
  }

}
