import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Registry } from 'src/app/model/registry';
import { RegistryDay } from 'src/app/model/registry-day';
import { RegistryService } from 'src/app/services/registry/registry.service';
import { RegistryFormComponent } from '../registry-form/registry-form.component';

@Component({
  templateUrl: './registry-list.component.html',
  styleUrls: ['./registry-list.component.css'],
  providers: [DatePipe]
})

export class RegistryListComponent implements OnInit {
  displayedColumns: string[] = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
  // dataSource: RegistryDay = {};
  dataSource: RegistryDay[] = [];
  totalRegistries: number = 0;

  startDate: Date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  endDate: Date = new Date();

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

  openNewRegistryDialog(): void {
    const dialogRef = this.dialog.open(RegistryFormComponent, {
      width: '250px',
      data: { result : this.result }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result: ");
      console.log(result)
      // if (result == true)
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

      // console.log(result);
    })
    return result.sort((a, b) => new Date(a.datetime) > new Date(b.datetime) ? 1 : -1);
  }

  startDateFilter = (date: Date) => date <= this.endDate;
  endDateFilter = (date: Date) => date >= this.startDate;

  getAll(): void {
    this.registryService.getAll(this.startDate, this.endDate).subscribe(resp => {
      // console.log(resp);
      this.dataSource = this.groupByDay(resp);
      this.totalRegistries = resp.length;
    });
  }

  search(): void {
    this.getAll();
  }

  updateRegistry(registry: Registry): void {
    this.registryService.updateRegistry(registry).subscribe(data => {
      console.log(data);
      this.getAll();
    })
  }

  deleteRegistry(registry: Registry): void {
    this.registryService.deleteRegistry(registry).subscribe(data => {
      console.log(data);
      this.getAll();
    })
  }

}
