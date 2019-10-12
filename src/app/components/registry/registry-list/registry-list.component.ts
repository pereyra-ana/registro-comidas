import { Component, OnInit } from '@angular/core';
import { Registry } from 'src/app/model/registry';
import { RegistryService } from 'src/app/services/registry/registry.service';

let ELEMENT_DATA: Registry[];

@Component({
  templateUrl: './registry-list.component.html',
  styleUrls: ['./registry-list.component.css']
})
export class RegistryListComponent implements OnInit {
  displayedColumns: string[] = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
  dataSource: Registry[];

  constructor(
    private registryService: RegistryService
  ) { }

  ngOnInit() {
    this.registryService.getAll().subscribe(resp => {
      console.log(resp);
      this.dataSource = resp;
    })
  }

}
