import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {

  @Input()
  set labels(labels: Label[]) {
    if (labels) {
      this.pieChartLabels = labels;
      if (this.pieChartData) {
        this.pieChartColors = this.generateXColors(this.pieChartData.length);
        this.chartReady = true;
      }
    }
  }

  @Input()
  set amounts(amounts: number[]) {
    if (amounts) {
      this.pieChartData = amounts;
      if (this.pieChartLabels) {
        this.pieChartColors = this.generateXColors(this.pieChartData.length);
        this.chartReady = true;
      }
    }
  }

  chartReady: boolean = false;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
      display: false
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors: string[];

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  changeLabels() {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  getColor(): string {
    // return "hsl(" + 360 * Math.random() + ',' +
    //   (25 + 70 * Math.random()) + '%,' +
    //   (85 + 10 * Math.random()) + '%)'

    return "hsla(" + ~~(360 * Math.random()) + "," +
      "70%," +
      "80%,1)"
  }


  // Generate x colors
  generateXColors(x: number): string[] {
    let list: string[] = [];
    let colorList: any = {
      backgroundColor: list
    };
    for (var i = x; i--;) {
      list.push(this.getColor());
    }
    return [colorList];
  }

}
