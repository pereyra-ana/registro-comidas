import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

@Component({
    selector: 'app-chart-line',
    templateUrl: 'chart-line.component.html',
    styleUrls: []
})
export class LineChartComponent implements OnInit {

    @Input()
    set labels(labels: Label[]) {
        if (labels) {
            this.lineChartLabels = labels;
        }
    }

    @Input()
    set amounts(amounts: ChartDataSets[]) {
        if (amounts) {
            this.lineChartData = amounts;
        }
    }

    @Input()
    set chartName(chartName: string) {
    }

    public lineChartData: ChartDataSets[] = [
        { data: [], label: '' }
        // { data: [45, 46, 45.5, 45.2, 44], label: 'Series A' },
        // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
    ];
    public lineChartLabels: Label[] = [
        // 'January', 'February', 'March', 'April', 'May'
    ];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left',
                },
                {
                    id: 'y-axis-1',
                    position: 'right',
                    gridLines: {
                        color: 'rgba(255,0,0,0.3)',
                    },
                    ticks: {
                        fontColor: 'red',
                    }
                }
            ]
        },
        annotation: {
            annotations: [
                {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 'March',
                    borderColor: 'orange',
                    borderWidth: 2,
                    label: {
                        enabled: true,
                        fontColor: 'orange',
                        content: 'LineAnno'
                    }
                },
            ],
        },
    };
    public lineChartColors: Color[] = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

    constructor() { }

    ngOnInit() {
    }
}