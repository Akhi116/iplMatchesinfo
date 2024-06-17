import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  @Input() winPercentage: number = 0;
  @Input() lossPercentage: number = 0;
  @Input() loading: boolean = false;
  showPieChart: boolean = false;
  chart: Chart<'pie'> | undefined;

  chartData: number[] = [];
  labelData: any = ['Win Percentage', 'Loss Percentage'];
  colorData: any = ['#FF6600', '#8a32e8'];

  constructor(private cdr: ChangeDetectorRef) {}

  onDataFetched(eventData: { winPercentage: number; lossPercentage: number }) {
    this.winPercentage = Number(eventData.winPercentage.toFixed(2));
    this.lossPercentage = Number(eventData.lossPercentage.toFixed(2));

    this.showPieChart = true;

    this.chartData = [this.winPercentage, this.lossPercentage];

    this.cdr.detectChanges();
    this.RenderChart(this.chartData);
  }

  isLoaded(eventData: { show: boolean }) {
    this.loading = !eventData.show;
    this.showPieChart = !eventData.show;
    if (eventData.show && this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
    this.cdr.detectChanges();
  }

  RenderChart(chartData: number[]) {
    const canvas = document.getElementById('piechart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    if (this.chart) {
      this.showPieChart = false;
      this.chart.destroy();
    }

    this.chart = new Chart<'pie'>(canvas, {
      type: 'pie',
      data: {
        labels: this.labelData,
        datasets: [
          {
            data: chartData,
            backgroundColor: this.colorData,
            hoverOffset: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }
}
