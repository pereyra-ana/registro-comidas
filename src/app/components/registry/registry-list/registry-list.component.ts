import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Registry } from 'src/app/model/registry';
import { RegistryDay } from 'src/app/model/registry-day';
import { RegistryService } from 'src/app/services/registry/registry.service';

@Component({
  templateUrl: './registry-list.component.html',
  styleUrls: ['./registry-list.component.css'],
  providers: [DatePipe]
})

export class RegistryListComponent implements OnInit {
  displayedColumns: string[] = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
  dataSource: RegistryDay = {};
  totalRegistries: number = 0;

  startDate: Date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  endDate: Date = new Date();

  weekday = [
    "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
  ]

  getWeekDay(d: string){
    let day = d.substring(0,2);
    let month = d.substring(3,5);
    let year = d.substring(6);

    let date = new Date(month + "/" + day + "/" + year);
    return this.weekday[date.getDay() - 1]; 
  }

  constructor(
    private registryService: RegistryService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getAll();
  }

  groupByDay(registries: Registry[]): RegistryDay {
    let registryDays: RegistryDay = {};
    let registriesOrdered = [];
    registriesOrdered = registries.sort((a,b) => a.datetime > b.datetime ? 1 : -1);

    registriesOrdered.forEach(r => {
      let date = this.datePipe.transform(r.datetime, 'dd/MM/yyyy');
      if (Object.keys(registryDays).indexOf(date) === -1) {
        registryDays[date] = [r];
      } else {
        registryDays[date].push(r);
      }

    });
    // console.log(registryDays);
    return registryDays;
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

}
