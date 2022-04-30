import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { interval, Subscription } from 'rxjs';
import { DeviceState } from 'src/app/devicePanel-module/models/deviceState';
import { DeviceSystemLogs } from 'src/app/devicePanel-module/models/deviceSystemLogs';
import { DevicesStorageService } from 'src/app/devicePanel-module/services/deviceStorage/devices-storage.service';

@Component({
    selector: 'app-device-performance-graph',
    templateUrl: './device-performance-graph.component.html',
    styleUrls: ['./device-performance-graph.component.less']
})
export class DevicePerformanceGraphComponent implements OnInit, OnDestroy {
    public lineChartType: ChartType = 'line';
    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                yAxisID: 'y-axis-0',
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                fill: 'origin',
            },
        ],
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    };
    public lineChartOptions: ChartOptions = {
        responsive: false,
        maintainAspectRatio: false,
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            'y-axis-0' : {
                max: 100,
                min: 0
            }
        }
    };

    private _graphUpdater!: Subscription;
    @ViewChild(BaseChartDirective) 
    private _chart!: BaseChartDirective;

    constructor(private _storage: DevicesStorageService) {}

    public ngOnInit(): void {
        this._graphUpdater = this._storage
            .onSelectedLogsRefresh$
            .subscribe((logs: DeviceSystemLogs) => {
                this.lineChartData.datasets.forEach((dataset: ChartDataset) => {
                    dataset.data = logs.cpuPerformanceGraph ?? [];
                    this._chart?.update();
                });
            });
    }

    public ngOnDestroy(): void {
        this._graphUpdater.unsubscribe();
    }
}