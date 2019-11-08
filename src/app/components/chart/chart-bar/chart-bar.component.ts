import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css']
})
export class ChartBarComponent implements OnInit {

  @Input()
  set labels(labels: Label[]) {
    if (labels) {
      this.barChartLabels = labels;
      // if (this.pieChartData) {
      //   this.pieChartColors = this.generateXColors(this.pieChartData.length);
      //   this.chartReady = true;
      // }
    }
  }

  @Input()
  set amounts(amounts: ChartDataSets[]) {
    if (amounts) {
      this.barChartData = amounts;
      // if (this.pieChartLabels) {
      //   this.pieChartColors = this.generateXColors(this.pieChartData.length);
      //   this.chartReady = true;
      // }
    }
  }

  @Input()
  set chartName(chartName: string) {
    // this.pieChartOptions.legend.display = this.getDisplayLabels(chartName);
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          debugger;
          let data1 = data.datasets[0].data[tooltipItem.index];
          let data2 = data.datasets[1].data[tooltipItem.index];
          let sumData = +data1 + +data2;

          let allData = data.datasets[tooltipItem.datasetIndex].data;
          var tooltipLabel = data.datasets[tooltipItem.datasetIndex].label
          var tooltipData = allData[tooltipItem.index];
          var p = +tooltipData * 100 / sumData;

          return tooltipLabel + ": " + p.toString().substring(0, 5) + "%";
        }
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' },
    { data: [], label: '' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#89E1CD' },
    { backgroundColor: '#E18990' },
  ]

  constructor() { }

  ngOnInit() {
  }

}
