import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

export interface Model {
  // color: string;
  // cols: number;
  // rows: number;
  name: string;
  category: string;
  img: string;
}

export interface Category {
  name: string;
  value: string;
  selected: boolean;
}

export interface OnInit {
  ngOnInit(): void;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  selectedIndex = 0;
  activeTab1 = 'active-tab';
  activeTab2 = '';
  loader = 0;
  breakpoint: number;

  models: Model[] = [
    {name: 'Marketing optimization', category: 'BussinessVallueCreation', img: 'marketing-optimization.svg'},
    {name: 'Cross-sell', category: 'BussinessVallueCreation', img: 'cross-sell.svg'},
    {name: 'Prospect ranking', category: 'BussinessVallueCreation', img: 'prospect-ranking.svg'},
    {name: 'Customer retention', category: 'BussinessVallueCreation', img: 'customer-retention.svg'},
    {name: 'Dynamic pricing', category: 'BussinessVallueCreation', img: 'dynamic-pricing.svg'},
    {name: 'Risk based pricing', category: 'BussinessVallueCreation', img: 'risk-based-pricing.svg'},
    {name: 'Campaing Analytics', category: 'BussinessVallueCreation', img: 'campaing-analytics.svg'},
    {name: 'Testing bussiness hypothesis', category: 'BussinessVallueCreation', img: 'testing-bussiness-hypothesis.svg'},

    {name: 'Default risk prediction', category: 'RiskReduction', img: 'default-risk-prediction.svg'},
    {name: 'Credit risk assessment', category: 'RiskReduction', img: 'credit-risk-assessment.svg'},
    {name: 'Stress testing model development', category: 'RiskReduction', img: 'stress-testing-model-development.svg'},
    {name: 'Estimate collateral worth', category: 'RiskReduction', img: 'estimate-collateral-worth.svg'},
    {name: 'Client fraud analytics', category: 'RiskReduction', img: 'client-fraud-analytics.svg'},
    {name: 'Employee fraud detection', category: 'RiskReduction', img: 'employee-fraud-detection.svg'},
    {name: 'Issue detection and early warning', category: 'RiskReduction', img: 'issue-detection-and-early-warning.svg'},
    {name: 'Legal entity risk attribution', category: 'RiskReduction', img: 'legal-entity-risk-attribution.svg'},

    {name: 'Automated client acceptance', category: 'InternalCostReduction', img: 'automated-client-acceptance.svg'},
    {name: 'Automated credit scoring', category: 'InternalCostReduction', img: 'automated-credit-scoring.svg'},
    {name: 'Call center optimization', category: 'InternalCostReduction', img: 'call-center-optimization.svg'},
    {name: 'Document scanning & handling', category: 'InternalCostReduction', img: 'document-scanning-&-handling.svg'},
    {name: 'Text info extraction and struching', category: 'InternalCostReduction', img: 'text-info-extraction-and-struching.svg'},
    {name: 'Preventive maintenance', category: 'InternalCostReduction', img: 'preventive-maintenance.svg'},
    {name: 'Compliance test automation', category: 'InternalCostReduction', img: 'compliance-test-automation.svg'},
    {name: 'Workforce analytics', category: 'InternalCostReduction', img: 'workforce-analytics.svg'},

    {name: 'Social media sentiment analysis', category: 'SupportingInsights', img: 'social-media-sentiment-analysis.svg'},
    {name: 'Document scanning & handling', category: 'SupportingInsights', img: 'document-scanning-&-handling-.svg'},
    {name: 'Logistics & planning', category: 'SupportingInsights', img: 'logistics-&-planning.svg'},
    {name: 'Workforce analytics', category: 'SupportingInsights', img: 'workforce-analytics-.svg'}
  ];

  categories: Category[] = [
    {name: 'Bussiness Vallue Creation', value: 'BussinessVallueCreation', selected: true},
    {name: 'Risk Reduction', value: 'RiskReduction', selected: true},
    {name: 'Internal Cost Reduction', value: 'InternalCostReduction', selected: true},
    {name: 'Supporting Insights', value: 'SupportingInsights', selected: true}
  ];

  // models: Model[] = [
  //   {name: 'Customer LifecycleEducation', category: 'BussinessValueCreation', img: 'marketing-optimization.png'},
  //   {name: 'Social Media education', category: 'SupportingInsights', img: 'social-media-sentiment-analysis.png'},
  //   {name: 'Manufacturing', category: 'InternalCostReduction', img: 'automated-client-acceptance.png'},
  //   {name: 'Retail', category: 'InternalCostReduction', img: 'automated-credit-scoring.png'},
  //   {name: 'Government', category: 'RiskReduction', img: 'default-risk-prediction.png'},
  //   {name: 'Healthcare', category: 'RiskReduction', img: 'credit-risk-assessment.png'},
  //   {name: 'Insurance', category: 'RiskReduction', img: 'stress-testing-model-development.png'},
  //   {name: 'Finance', category: 'RiskReduction', img: 'estimate-collateral-worth.png'}
  // ];

  // categories: Category[] = [
  //   {name: 'Bussiness Value Creation', value: 'BussinessVallueCreation', selected: true},
  //   {name: 'Supporting Insights', value: 'SupportingInsights', selected: true},
  //   {name: 'Internal Cost Reduction', value: 'InternalCostReduction', selected: true},
  //   {name: 'Risk Reduction', value: 'RiskReduction', selected: true}
  // ];

  modelNameSearchQuery: string;

  displayedColumns: string[] = ['img', 'name', 'category'];
  dataSource = new MatTableDataSource(this.models);

  @ViewChild(MatSort) sort: MatSort;


  // Get selected checkboxes array
  get modelcategorySearchQuery() { // right now: ['1','3']
  return this.categories
            .filter(cat => cat.selected)
            .map(cat => cat.value);
  }

  onResize(event) {
    const element = event.target.innerWidth;
    this.responsiveGrid(element);
  }

  responsiveGrid(element) {
    if (element >= 1024) {
      this.breakpoint = 6;
    } else if (element >= 768) {
      this.breakpoint = 4;
    } else if (element >= 300) {
      this.breakpoint = 2;
    }
  }

  selectTab(index: number): void {
    this.selectedIndex = index;

    if (index === 0) {
      this.activeTab1 = 'active-tab';
      this.activeTab2 = '';
    }
    if (index === 1) {
      this.activeTab1 = '';
      this.activeTab2 = 'active-tab';
    }

  }

  ngOnInit() {

console.log('================================');
console.log(this.dataSource.sort);

    this.dataSource.sort = this.sort;

    console.log('=+++++++++++++++++++++++++++++++=');
    console.log(this.dataSource.sort);

    const element = window.innerWidth;
    this.responsiveGrid(element);
  }

}
