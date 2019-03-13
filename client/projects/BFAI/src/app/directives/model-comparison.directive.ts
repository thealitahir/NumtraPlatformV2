import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import * as EasyPieChart from '../../assets/easy-pie-chart/jquery.easy-pie-chart.js';

@Directive({
  selector: 'easy-pie-chart'
})
export class EasyPieChartDirective implements OnInit {

  private pie: any;
  private _percent: number;

  @Input()
  set percent(value) {
    this._percent = value;
    if (this.pie)
      this.pie.update(value);
  };
  get percent() { return this._percent };

  @Input()
  options: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.pie = new EasyPieChart(this.element.nativeElement, this.options);
    this.pie.update(this.percent)
  }
}
