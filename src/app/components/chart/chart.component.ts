import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  startDate: Date;
  endDate: Date;

  ngOnInit() {
    this.startDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    this.endDate = new Date();
  }

  startDateFilter = (date: Date) => date <= this.endDate;
  endDateFilter = (date: Date) => date >= this.startDate;
}
