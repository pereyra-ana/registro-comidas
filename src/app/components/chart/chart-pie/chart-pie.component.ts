import { Component, Input, OnInit } from '@angular/core';
import { faAppleAlt, faBan, faBreadSlice, faCarrot, faCheese, faCoffee, faDrumstickBite, faEgg, faGlassMartiniAlt, faIceCream } from '@fortawesome/free-solid-svg-icons';
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

  chartHasDetail: boolean;

  @Input()
  set chartName(chartName: string) {
    this.pieChartOptions.legend.display = this.getDisplayLabels(chartName);
  }

  @Input()
  hashDataValues: any;

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
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItem, data) {
          var allData = data.datasets[tooltipItem.datasetIndex].data;
          var tooltipLabel = data.labels[tooltipItem.index];
          var tooltipData = allData[tooltipItem.index];
          return tooltipLabel + ": " + tooltipData + "%";
        }
      }
    }
  };

  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors: string[];

  constructor() {
  }

  ngOnInit() {
  }

  getDisplayLabels(chartName: string): boolean {
    if (chartName === 'tiposAlimentosVsTotal') {
      this.chartHasDetail = true;

      if (window.innerWidth < 768) {
        this.pieChartOptions.legend.display = false;
        return false;
      } else {
        this.pieChartOptions.legend.display = true;
        return true;
      }
    } return false
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

  // fontawesome icons
  faCoffee = faCoffee;
  faApple = faAppleAlt;
  faCarrot = faCarrot;
  faIceCream = faIceCream;
  faBread = faBreadSlice;
  faEgg = faEgg;
  faChicken = faDrumstickBite;
  faDrink = faGlassMartiniAlt;
  faCheese = faCheese;
  faBan = faBan;

}
