import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';


export interface Source {
  name: string,
  label: string
}

export interface Sink {
  name: string,
  label: string
}

export interface Operation {
  name: string,
  label: string
}

export interface IOT {
  name: string,
  label: string
}

export interface ML {
  name: string,
  label: string
}

export interface Extension {
  name: string,
  label: string
}

export interface CT {
  name: string,
  label: string
}

export interface Template {
  name: string,
  label: string
}


@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: ['./sub-nav.component.css']
})

export class SubNavComponent {

  @Output() rightColMenu = new EventEmitter<string>();

  selectedIndex = 0;
  selectedItem: string;
  showSubNav = false;

  selectedRightNav: string;
  selectedRightNavVal = '';


  sources: Source[] = [
    { name: 'hdfs-source', label: 'HDFS' },
    { name: 'amazonS3-source', label: 'S3' },
    { name: 'kafka-source', label: 'Kafka' },
    { name: 'staging-source', label: 'Data Lake' },
    { name: 'sql-server-source', label: 'RDBMS' },
    { name: 'staging-source', label: 'Kraken' },
    { name: 'twitter-source', label: 'Twitter' },
    { name: 'aerospike-source', label: 'Aerospike' },
    { name: 'gis-map-source', label: 'GIS Map' },
    { name: 'amazonS3-source', label: 'Amazonsqs' },
    { name: 'cassandra-source', label: 'Cassadra' },
    { name: 'file-source', label: 'File' },
    { name: 'ftp-source', label: 'Ftp' },
    { name: 'hana-source', label: 'Hana' },
    { name: 'hbase-source', label: 'Hbase' },
    { name: 'kinesis-source', label: 'Kinesis' },
    { name: 'redshift-source', label: 'Redshift' },
    { name: 'kinesis-source', label: 'Rss Feeds' },
    { name: 'staging-source', label: 'Streaming Lake' },
    { name: 'staging-source', label: 'K-MEANS Streaming' }
  ];

  sinks: Sink[] = [
    { name: 'staging-sink', label: 'Datalake' },
    { name: 'hdfs-sink', label: 'HDFS' },
    { name: 'kafka-sink', label: 'Kafka' },
    { name: 'amazonS3-sink', label: 'S3' },
    { name: 'sql-server-sink', label: 'RDBMS' },
    { name: 'smart-sink', label: 'Smart' },
    { name: 'aerospike-sink', label: 'Aerospike' },
    { name: 'cassandra-sink', label: 'Cassandra' },
    { name: 'gis-map-sink', label: 'GIS' },
    { name: 'hana-sink', label: 'Hana' },
    { name: 'hbase-sink', label: 'HBASE' },
    { name: 'kinesis-sink', label: 'Kinesis' },
    { name: 'redshift-sink', label: 'Redshift' },
    { name: 'amazonS3-sink', label: 'Amazonsqs' },
    { name: 'sensor-sink', label: 'Sensor Network' },
    { name: 'staging-sink', label: 'Streaming Lake' }
  ];

  operations: Operation[] = [
    { name: 'encryption', label: 'Encryption' },
    { name: 'bottom', label: 'Bottom' },
    { name: 'aggregation', label: 'Aggregation' },
    { name: 'timezone', label: 'Date Time' },
    { name: 'top', label: 'Top' },
    { name: 'filling', label: 'Filling' },
    { name: 'filter', label: 'Filter' },
    { name: 'formula', label: 'Formula' },
    { name: 'findreplace', label: 'Find &amp; Replace' },
    { name: 'join-1', label: 'Block Join' },
    { name: 'merge', label: 'Merge' },
    { name: 'split', label: 'Split' },
    { name: 'tag', label: 'Tag' },
    { name: 'union', label: 'Union' },
    { name: 'optimized-join', label: 'Optimized Join' },
    { name: 'rename', label: 'Rename' },
    { name: 'filling', label: 'Sort' },
    { name: 'wrangler', label: 'Wrangler' }
  ];

  IOTs: IOT[] = [
    { name: 'mqtt-iot', label: 'MQTT' },
    { name: 'amqp-iot', label: 'AMQP' },
    { name: 'coap-iot', label: 'CoAP' },
    { name: 'dds-iot', label: 'DDS' },
    { name: 'xmpp-iot', label: 'XMPP' },
    { name: 'azure-iot', label: 'Azure' },
    { name: 'amazonS3-iot', label: 'AWS' },
    { name: 'amazonS3-iot', label: 'ActiveMQ' },
    { name: 'stomp-iot', label: 'STOMP' },
    { name: 'ibm-iot', label: 'IBM' }
  ];

  MLs: ML[] = [
    { name: 'recommender', label: 'Alternating Least Squares' },
    { name: 'decision-tree', label: 'Decision Tree' },
    { name: 'cluster', label: 'Gaussian Mixture' },
    { name: 'gbd', label: 'GBT' },
    { name: 'k-mean', label: 'K-Means (MLlib)' },
    { name: 'logistic-regression', label: 'Logistic Regression' },
    { name: 'linear-regression', label: 'Linear Regression' },
    { name: 'lasso', label: 'Lasso Regression' },
    { name: 'ridge', label: 'Ridge Regression' },
    { name: 'svm', label: 'SVM' },
    { name: 'naive-bayes', label: 'Naive Bayes' },
    { name: 'classifier', label: 'Ngram' },
    { name: 'randomforest', label: 'Random Forest' }
  ];

  extensions: Extension[] = [
    { name: 'interceptor', label: 'Interceptor' },
    { name: 'custom-operation', label: 'Custom Operation' },
    { name: 'custom-query', label: 'Custom Query' }
  ];

  CTs: CT[] = [
    { name: 'gis-filter', label: 'Inrix Filter' },
    { name: 'gis-filter', label: 'Waypoint Filter' }
  ];

  templates: Template[] = [
    { name: 'custom-query', label: 'simon_test_tmpl_1' },
    { name: 'custom-query', label: 'usman_test_temp' },
    { name: 'custom-query', label: 'MyChurnPrediction' },
    { name: 'custom-query', label: 'SJM_sentiment_tmpl' },
    { name: 'custom-query', label: 'SJM_churn_tmpl' },
    { name: 'custom-query', label: 'SJM_tsa' },
    { name: 'custom-query', label: 'TrumpTwitterSentiment' },
    { name: 'custom-query', label: 'TrumpTwitterWithMetrics' },
    { name: 'custom-query', label: 'Sri Test' }
  ];


  selectTab(index: number, value: string): void {
    this.selectedIndex = index;
    this.selectedItem = value;
    this.showSubNav = true;
  }

  hideSubNav() {
    this.showSubNav = false;
    this.selectedItem = '';
  }

  selectRightNav(selectedRightNav: string) {

    if (selectedRightNav !== this.selectedRightNavVal) {
      this.selectedRightNavVal = selectedRightNav;

      this.selectedRightNav = selectedRightNav;
      this.rightColMenu.emit(selectedRightNav);
    } else {
      selectedRightNav = '';
      this.selectedRightNavVal = '';
      this.selectedRightNav = '';
      this.rightColMenu.emit('');
    }

  }

}
