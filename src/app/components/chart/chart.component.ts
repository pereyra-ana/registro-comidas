import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  startDate: Date;
  endDate: Date;

  constructor(
    private chartsService: ChartService
  ) { }

  ngOnInit() {
    this.startDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    this.endDate = new Date();

    this.getDataForCharts();
  }

  startDateFilter = (date: Date) => date <= this.endDate;
  endDateFilter = (date: Date) => date >= this.startDate;

  // datos para graficos por tipo
  labelsAlimentoVsTotal: Label[];
  amountsAlimentoVsTotal: number[];
  hashDataValuesAlimentos: any;

  labelsTiposAlimentoVsTotal: Label[];
  amountsTiposAlimentoVsTotal: number[];
  hashDataValuesTipos: any;

  labelsPermitidosVsNo: Label[];
  amountsPermitidosVsNo: ChartDataSets[];

  labelsSintomas: Label[];
  amountsSintomas: ChartDataSets[];

  labelsActividadFisica: Label[];
  amountsActividadFisica: ChartDataSets[];

  getDataForCharts(): void {
    // datos para alimentos vs total
    this.chartsService.getDataForChart(this.startDate, this.endDate, 'alimentosVsTotal').subscribe(data => {
      // console.log(data);
      this.labelsAlimentoVsTotal = data.labels;
      this.amountsAlimentoVsTotal = data.amounts;
      this.hashDataValuesAlimentos = data.values;
    })

    // datos para tipos alimentos vs total
    this.chartsService.getDataForChart(this.startDate, this.endDate, 'tiposAlimentosVsTotal').subscribe(data => {
      // console.log(data);
      this.labelsTiposAlimentoVsTotal = data.labels; // estas labels deberian venir con las listas de alimentos dentro de cada tipo
      this.amountsTiposAlimentoVsTotal = data.amounts;
      this.hashDataValuesTipos = data.values;
    })

    // datos para permitidos vs no permitidos
    this.chartsService.getDataForChart(null, null, 'permitidosVsNo').subscribe(data => {
      console.log(data);
      this.labelsPermitidosVsNo = data.labels; // estas labels deberian venir con las listas de alimentos dentro de cada tipo
      this.amountsPermitidosVsNo = data.amounts;
    })

    // datos para permitidos vs no permitidos
    this.chartsService.getDataForChart(null, null, 'sintomas').subscribe(data => {
      console.log(data);
      this.labelsSintomas = data.labels; // estas labels deberian venir con las listas de alimentos dentro de cada tipo
      this.amountsSintomas = data.amounts;
    })

    // datos para permitidos vs no permitidos
    this.chartsService.getDataForChart(null, null, 'actividadFisica').subscribe(data => {
      console.log(data);
      this.labelsActividadFisica = data.labels; // estas labels deberian venir con las listas de alimentos dentro de cada tipo
      this.amountsActividadFisica = data.amounts;
    })
  }
}
