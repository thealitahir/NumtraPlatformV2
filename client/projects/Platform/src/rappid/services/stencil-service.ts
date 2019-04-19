/*! Rappid v2.4.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2019-01-28


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


import { ui, dia } from '../library/js/rappid';
import { Component, OnInit } from '@angular/core';
import * as appShapes from '../shapes/app-shapes';
import { SourceMapGenerator } from '@angular/compiler/src/output/source_map';
import { createLNodeObject } from '@angular/core/src/render3/instructions';
import { StageService } from '../../app/services/stage.service';
import { Stage } from '../../app/stages/stage.model';


export interface Source {
    name: string,
    label: string,
    type?: any
    stage_attributes?: any
}

export interface Sink {
    name: string,
    label: string,
    type?: string
    stage_attributes?: any
}

export interface Operation {
    name: string,
    label: string,
    type?:any
    stage_attributes?: any
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
    label: string,
}



export class StencilService {
    component : Stage[] =[];
    constructor(public stageService?: StageService) {
        console.log(this.stageService);
        this.stageService.getComponents().subscribe(data =>{
            this.component = data.data;
            console.log("in stencil service");
            console.log(this.component);
        }); 
    }
    
    sources: Source[] = [
        { name: 'hdfs-source', label: 'DBFS', type:'source',
          stage_attributes:{
            "url" : "", 
            "file_type" : "", 
            "dbfs_token" : "", 
            "dbfs_domain" : "", 
            " delimiter" : "",
            "is_header" : "Use Header Line"
          }
        },
        { name: 'amazonS3-source', label: 'Cosmos DB', type:'source',
          stage_attributes:{
            "query" : "",
            "Endpoint" : "", 
            "Database" : "", 
            "Collection" : "", 
            "Masterkey" : "",
            "upsert" : true
          }
        },
        { name: 'kafka-source', label: 'BlobStorage', type:'source',
          stage_attributes:{
            "url" : "", 
            "file_type" : "", 
            "accountname" : "", 
            "accountkey" : "",
            "containername" : "", 
            "blobname" : "", 
            "delimiter" : "", 
            "is_header" : ""
          }
        },
        { name: 'staging-source', label: 'Data Lake' },
        { name: 'sql-server-source', label: 'RDBMS' },
        { name: 'kraken-source', label: 'Kraken' },
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
        { name: 'streaming-lake-source', label: 'Streaming Lake' },
        { name: 'k-means-streaming-source', label: 'K-MEANS Streaming' }
    ];

    operations: Operation[] = [
        { name: 'encryption', label: 'Encryption'},
        { name: 'bottom', label: 'Bottom', type:'operation',
         stage_attributes:{
            "attributes" : {
                "topResults" : 0, 
                "dataType" : "", 
                "columnName" : ""
            }, 
            "parameter" : false, 
            "stage_id" : ""
         }
        },
        { name: 'aggregation', label: 'Aggregation' },
        { name: 'timezone', label: 'Date Time' },
        { name: 'top', label: 'Top', type:'operation',
          stage_attributes:{
            "stage_id" : "", 
            "parameter" : false, 
            "attributes" : {
                "values" : 0, 
                "columnName" : ""
            }
          }
        },
        { name: 'filling', label: 'Query', type:'operation',
          stage_attributes:{
              "query":""
          }
        },
        { name: 'filter', label: 'Filter', type:'operation',
          stage_attributes:{ 
            "regex" : [
            ], 
            "use_regex" : false, 
            "expression" : [
                {
                    "column1_name" : "", 
                    "operator" : "", 
                    "column2_name" : "", 
                    "custom" : false, 
                    "custom_value" : "", 
                    "value_type" : "", 
                    "combinator" : "", 
                    "showOptions" : true
                }
            ], 
            "use_expression" : true
          }
        },
        { name: 'formula', label: 'Formula' },
        { name: 'findreplace', label: 'Find &amp; Replace' },
        { name: 'join-1', label: 'Block Join' },
        { name: 'merge', label: 'Merge' },
        { name: 'split', label: 'Split' },
        { name: 'tag', label: 'Tag' },
        { name: 'union', label: 'Union' },
        { name: 'optimized-join', label: 'Optimized Join' },
        { name: 'rename', label: 'Rename' },
        { name: 'sort', label: 'Sort' },
        { name: 'wrangler', label: 'Wrangler' }
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

    sinks: Sink[] = [
        { name: 'staging-sink', label: 'CosmosDB', type:'sink',
          stage_attributes:{
            "query" : "", 
            "Endpoint" : "", 
            "Database" : "", 
            "Collection" : "", 
            "Masterkey" : "", 
            "upsert" : true
          }
        },
        { name: 'hdfs-sink', label: 'DBFS', type:'sink',
          stage_attributes:{
            "url" : "", 
            "delimiter" : "", 
            "file_type" : "", 
            "dbfs_token" : "", 
            "dbfs_domain" : "", 
            "is_header" : "Use Header Line"
          }
        },
        { name: 'kafka-sink', label: 'BlobStorage', type:'sink', 
          stage_attributes:{
            "url" : "", 
            "file_type" : "", 
            "accountname" : "", 
            "accountkey" : "", 
            "containername" : "", 
            "blobname" : "", 
            "delimiter" : "", 
            "is_header" : "Use Header Line"
          }
        },
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
        { name: 'amazonsqs-sink', label: 'Amazonsqs' },
        { name: 'sensor-sink', label: 'Sensor Network' },
        { name: 'streaming-lake-sink', label: 'Streaming Lake' }
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





    stencil: ui.Stencil;

    create(paperScroller: ui.PaperScroller, snaplines: ui.Snaplines) {

        this.stencil = new ui.Stencil({
            paper: paperScroller,
            snaplines: snaplines,
            width: 240,
            groups: this.getStencilGroups(),
            dropAnimation: true,

            // groupsToggleButtons: true,
            // paperOptions: function () {
            //     return {
            //         model: new dia.Graph({}, {
            //             cellNamespace: appShapes
            //         }),
            //         cellViewNamespace: appShapes
            //     };
            // },
            // search: {
            //     '*': ['type', 'attrs/text/text', 'attrs/.label/text'],
            //     'org.Member': ['attrs/.rank/text', 'attrs/.name/text']
            // },

            // Use default Grid Layout
            layout: {
                columns: 100,
                columnWidth: 60,
                rowHeight: 60,
                resizeToFit: true
            },
            // Remove tooltip definition from clone
            dragStartClone: cell => cell.clone().removeAttr('root/dataTooltip')
        });
    }

    setShapes() {
        this.stencil.load(this.getStencilShapes());
    }

    getStencilGroups() {
        return <{ [key: string]: ui.Stencil.Group }>{
            source: { index: 1, label: 'Souraces' },
            operation: { index: 2, label: 'Operations' },
            ml: { index: 3, label: 'Machine Learning ' },
            sink: { index: 4, label: 'Sinks' },
            iot: { index: 5, label: 'Internet of things' },
            extension: { index: 6, label: 'Extensions' },
            ct: { index: 7, label: 'Custom Transformation' },
            template: { index: 8, label: 'Templates' }
        };
    }

    getStencilShapes() {
        let labelSize = 10;
        let sourceObj = [];
        let sourceLabel = '';
        let type = '';
        let stage_attributes = {};
        this.sources.forEach((source) => {

            sourceLabel = source.label;
            type = source.type;
            stage_attributes = source.stage_attributes;
            if (source.label.length > labelSize) {
                sourceLabel = source.label.slice(0, labelSize) + '...';
            }

            sourceObj.push({
                type: 'standard.Image',
                size: { width: 50, height: 50 },
                attrs: {
                    root: {
                        dataTooltip: source.label,
                        dataTooltipPosition: 'bottom',
                        dataTooltipPositionSelector: '.joint-stencil'
                    },
                    image: {
                        xlinkHref: 'assets/svg/' + source.name + '.svg'
                    },
                    body: {
                        fill: 'transparent',
                        stroke: '#4295d1',
                        strokeWidth: 2,
                        strokeDasharray: '0'
                    },
                    label: {
                        type:type,
                        text: sourceLabel,
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        fill: '#333333',
                    },
                    dbValues: stage_attributes,
                    _id:null
                }
            })
        })

        let operationObj = [];
        let operationLabel = '';
        this.operations.forEach((operation) => {

            operationLabel = operation.label;
            type = operation.type;
            stage_attributes = operation.stage_attributes;
            if (operation.label.length > labelSize) {
                operationLabel = operation.label.slice(0, labelSize) + '...';
            }

            operationObj.push({
                type: 'standard.Image',
                size: { width: 50, height: 50 },
                attrs: {
                    root: {
                        dataTooltip: operation.label,
                        dataTooltipPosition: 'bottom',
                        dataTooltipPositionSelector: '.joint-stencil'
                    },
                    image: {
                        xlinkHref: 'assets/svg/' + operation.name + '.svg'
                    },
                    body: {
                        fill: 'transparent',
                        stroke: '#4295d1',
                        strokeWidth: 2,
                        strokeDasharray: '0'
                    },
                    label: {
                        type: type,
                        text: operationLabel,
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        fill: '#333333'
                    },
                    dbValues: stage_attributes,
                    _id:null
                }
            })
        })

        let sinkObj = [];
        let sinkLabel = '';
        this.sinks.forEach((sink) => {

            sinkLabel = sink.label;
            type = sink.type;
            stage_attributes = sink.stage_attributes;
            if (sink.label.length > labelSize) {
                sinkLabel = sink.label.slice(0, labelSize) + '...';
            }

            sinkObj.push({
                type: 'standard.Image',
                size: { width: 50, height: 50 },
                attrs: {
                    root: {
                        dataTooltip: sink.label,
                        dataTooltipPosition: 'bottom',
                        dataTooltipPositionSelector: '.joint-stencil'
                    },
                    image: {
                        xlinkHref: 'assets/svg/' + sink.name + '.svg'
                    },
                    body: {
                        fill: 'transparent',
                        stroke: '#4295d1',
                        strokeWidth: 2,
                        strokeDasharray: '0'
                    },
                    label: {
                        type: type,
                        text: sinkLabel,
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        fill: '#333333'
                    },
                    dbValues: stage_attributes,
                    _id:null
                }
            })
        })

        let iotObj = [];
        let iotLabel = '';
        this.IOTs.forEach((iot) => {

            iotLabel = iot.label;
            if (iot.label.length > labelSize) {
                iotLabel = iot.label.slice(0, labelSize) + '...';
            }

            iotObj.push({
                type: 'standard.Image',
                size: { width: 50, height: 50 },
                attrs: {
                    root: {
                        dataTooltip: iot.label,
                        dataTooltipPosition: 'bottom',
                        dataTooltipPositionSelector: '.joint-stencil'
                    },
                    image: {
                        xlinkHref: 'assets/svg/' + iot.name + '.svg'
                    },
                    body: {
                        fill: 'transparent',
                        stroke: '#4295d1',
                        strokeWidth: 2,
                        strokeDasharray: '0'
                    },
                    label: {
                        text: iotLabel,
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        fill: '#333333'
                    }
                }
            })
        })

        let mlObj = [];
        let mlLabel = '';
        this.MLs.forEach((ml) => {

            mlLabel = ml.label;
            if (ml.label.length > labelSize) {
                mlLabel = ml.label.slice(0, labelSize) + '...';
            }

            mlObj.push({
                type: 'standard.Image',
                size: { width: 50, height: 50 },
                attrs: {
                    root: {
                        dataTooltip: ml.label,
                        dataTooltipPosition: 'bottom',
                        dataTooltipPositionSelector: '.joint-stencil'
                    },
                    image: {
                        xlinkHref: 'assets/svg/' + ml.name + '.svg'
                    },
                    body: {
                        fill: 'transparent',
                        stroke: '#4295d1',
                        strokeWidth: 2,
                        strokeDasharray: '0'
                    },
                    label: {
                        text: mlLabel,
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        fill: '#333333'
                    }
                }
            })
        })

        let extensionObj = [];
        let extensionLabel = '';
        this.extensions.forEach((extension) => {

            extensionLabel = extension.label;
            if (extension.label.length > labelSize) {
                extensionLabel = extension.label.slice(0, labelSize) + '...';
            }

            extensionObj.push({
                type: 'standard.Image',
                size: { width: 50, height: 50 },
                attrs: {
                    root: {
                        dataTooltip: extension.label,
                        dataTooltipPosition: 'bottom',
                        dataTooltipPositionSelector: '.joint-stencil'
                    },
                    image: {
                        xlinkHref: 'assets/svg/' + extension.name + '.svg'
                    },
                    body: {
                        fill: 'transparent',
                        stroke: '#4295d1',
                        strokeWidth: 2,
                        strokeDasharray: '0'
                    },
                    label: {
                        text: extensionLabel,
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        fill: '#333333'
                    }
                }
            })
        })

        let ctObj = [];
        let ctLabel = '';
        this.CTs.forEach((ct) => {

            ctLabel = ct.label;
            if (ct.label.length > labelSize) {
                ctLabel = ct.label.slice(0, labelSize) + '...';
            }

            ctObj.push({
                type: 'standard.Image',
                size: { width: 50, height: 50 },
                attrs: {
                    root: {
                        dataTooltip: ct.label,
                        dataTooltipPosition: 'bottom',
                        dataTooltipPositionSelector: '.joint-stencil'
                    },
                    image: {
                        xlinkHref: 'assets/svg/' + ct.name + '.svg'
                    },
                    body: {
                        fill: 'transparent',
                        stroke: '#4295d1',
                        strokeWidth: 2,
                        strokeDasharray: '0'
                    },
                    label: {
                        text: ctLabel,
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        fill: '#333333'
                    }
                }
            })
        })

        let templateObj = [];
        let templateLabel = '';
        this.templates.forEach((template) => {

            templateLabel = template.label;
            if (template.label.length > labelSize) {
                templateLabel = template.label.slice(0, labelSize) + '...';
            }

            templateObj.push({
                type: 'standard.Image',
                size: { width: 50, height: 50 },
                attrs: {
                    root: {
                        dataTooltip: template.label,
                        dataTooltipPosition: 'bottom',
                        dataTooltipPositionSelector: '.joint-stencil'
                    },
                    image: {
                        xlinkHref: 'assets/svg/' + template.name + '.svg'
                    },
                    body: {
                        fill: 'transparent',
                        stroke: '#4295d1',
                        strokeWidth: 2,
                        strokeDasharray: '0'
                    },
                    label: {
                        text: templateLabel,
                        fontFamily: 'Roboto Condensed',
                        fontWeight: 'Normal',
                        fontSize: 10,
                        fill: '#333333'
                    }
                }
            })
        })

        return {
            source: sourceObj,
            operation: operationObj,
            sink: sinkObj,
            iot: iotObj,
            ml: mlObj,
            extension: extensionObj,
            ct: ctObj,
            template: templateObj
        };

    }











    getStencilGroups1() {
        return <{ [key: string]: ui.Stencil.Group }>{
            standard: { index: 1, label: 'Standard shapes' },
            fsa: { index: 2, label: 'State machine' },
            pn: { index: 3, label: 'Petri nets' },
            erd: { index: 4, label: 'Entity-relationship' },
            uml: { index: 5, label: 'UML' },
            org: { index: 6, label: 'ORG' }
        };
    }

    getStencilShapes1() {
        return {
            standard: [
                {
                    type: 'standard.Rectangle',
                    size: { width: 5, height: 3 },
                    attrs: {
                        root: {
                            dataTooltip: 'Rectangle',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        body: {
                            rx: 2,
                            ry: 2,
                            width: 50,
                            height: 30,
                            fill: 'transparent',
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0'
                        },
                        label: {
                            text: 'rect',
                            fill: '#c6c7e2',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0
                        }
                    }
                },
                {
                    type: 'standard.Ellipse',
                    size: { width: 5, height: 3 },
                    attrs: {
                        root: {
                            dataTooltip: 'Ellipse',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        body: {
                            width: 50,
                            height: 30,
                            fill: 'transparent',
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0'
                        },
                        label: {
                            text: 'ellipse',
                            fill: '#c6c7e2',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0
                        }
                    }
                },
                {
                    type: 'app.RectangularModel',
                    size: { width: 40, height: 30 },
                    allowOrthogonalResize: false,
                    attrs: {
                        root: {
                            dataTooltip: 'Rectangle with ports',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        body: {
                            fill: 'transparent',
                            rx: 2,
                            ry: 2,
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0'
                        },
                        label: {
                            text: 'rect',
                            fill: '#c6c7e2',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0
                        }
                    },
                    ports: {
                        items: [
                            { group: 'in' },
                            { group: 'in' },
                            { group: 'out' }
                        ]
                    }
                },
                {
                    type: 'app.CircularModel',
                    size: { width: 5, height: 3 },
                    allowOrthogonalResize: false,
                    attrs: {
                        root: {
                            dataTooltip: 'Ellipse with ports',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        body: {
                            fill: 'transparent',
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0',
                        },
                        label: {
                            text: 'ellipse',
                            fill: '#c6c7e2',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0
                        }
                    },
                    ports: {
                        items: [
                            { group: 'in' },
                            { group: 'in' },
                            { group: 'out' }
                        ]
                    }
                },
                {
                    type: 'standard.Polygon',
                    size: { width: 5, height: 3 },
                    attrs: {
                        root: {
                            dataTooltip: 'Rhombus',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        body: {
                            refPoints: '50,0 100,50 50,100 0,50',
                            fill: 'transparent',
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0'
                        },
                        label: {
                            text: 'rhombus',
                            fill: '#c6c7e2',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0
                        }
                    }
                },
                {
                    type: 'standard.Cylinder',
                    size: { width: 5, height: 3 },
                    attrs: {
                        root: {
                            dataTooltip: 'Cylinder',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        body: {
                            fill: 'transparent',
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0'
                        },
                        top: {
                            fill: '#31d0c6',
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0'
                        },
                        label: {
                            text: 'cylinder',
                            fill: '#c6c7e2',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0
                        }
                    }
                },
                {
                    type: 'standard.Image',
                    size: { width: 53, height: 42 },
                    attrs: {
                        root: {
                            dataTooltip: 'Image',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        image: {
                            xlinkHref: 'assets/image-icon1.svg'
                        },
                        body: {
                            fill: 'transparent',
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0'
                        },
                        label: {
                            text: 'image',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            fill: '#c6c7e2'
                        }
                    }
                },
                {
                    type: 'standard.EmbeddedImage',
                    size: { width: 5, height: 3 },
                    attrs: {
                        root: {
                            dataTooltip: 'Card',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        body: {
                            fill: 'transparent',
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0'
                        },
                        image: {
                            xlinkHref: 'assets/image-icon1.svg'
                        },
                        label: {
                            text: 'card',
                            fill: '#c6c7e2',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0
                        }
                    }
                },
                {
                    type: 'standard.InscribedImage',
                    size: { width: 1, height: 1 },
                    attrs: {
                        root: {
                            dataTooltip: 'Icon',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        border: {
                            stroke: '#31d0c6',
                            strokeWidth: 3,
                            strokeDasharray: '0'
                        },
                        background: {
                            fill: 'transparent'
                        },
                        image: {
                            xlinkHref: 'assets/image-icon1.svg'
                        },
                        label: {
                            text: 'icon',
                            fill: '#c6c7e2',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0
                        }
                    }
                },
                {
                    type: 'standard.HeaderedRectangle',
                    size: { width: 5, height: 3 },
                    attrs: {
                        root: {
                            dataTooltip: 'Rectangle with header',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        body: {
                            fill: 'transparent',
                            stroke: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0'
                        },
                        header: {
                            stroke: '#31d0c6',
                            fill: '#31d0c6',
                            strokeWidth: 2,
                            strokeDasharray: '0',
                            height: 20
                        },
                        bodyText: {
                            textWrap: {
                                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie.',
                                width: -10,
                                height: -20,
                                ellipsis: true
                            },
                            fill: '#c6c7e2',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0,
                            refY2: 12,
                        },
                        headerText: {
                            text: 'header',
                            fill: '#f6f6f6',
                            fontFamily: 'Roboto Condensed',
                            fontWeight: 'Normal',
                            fontSize: 11,
                            strokeWidth: 0,
                            refY: 12
                        }
                    }
                }
            ],
            fsa: [

                {
                    type: 'fsa.StartState',
                    preserveAspectRatio: true,
                    attrs: {
                        root: {
                            dataTooltip: 'Start State',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        circle: {
                            width: 50,
                            height: 30,
                            fill: '#61549c',
                            'stroke-width': 0
                        },
                        text: {
                            text: 'startState',
                            fill: '#c6c7e2',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11,
                            'stroke-width': 0
                        }
                    }
                },
                {
                    type: 'fsa.EndState',
                    preserveAspectRatio: true,
                    attrs: {
                        root: {
                            dataTooltip: 'End State',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.inner': {
                            fill: '#6a6c8a',
                            stroke: 'transparent'
                        },
                        '.outer': {
                            fill: 'transparent',
                            stroke: '#61549c',
                            'stroke-width': 2,
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'endState',
                            fill: '#c6c7e2',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11,
                            'stroke-width': 0
                        }
                    }
                },
                {
                    type: 'fsa.State',
                    preserveAspectRatio: true,
                    attrs: {
                        root: {
                            dataTooltip: 'State',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        circle: {
                            fill: '#6a6c8a',
                            stroke: '#61549c',
                            'stroke-width': 2,
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'state',
                            fill: '#c6c7e2',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11,
                            'stroke-width': 0
                        }
                    }
                }
            ],
            pn: [

                {
                    type: 'pn.Place',
                    preserveAspectRatio: true,
                    tokens: 3,
                    attrs: {
                        root: {
                            dataTooltip: 'Place',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.root': {
                            fill: 'transparent',
                            stroke: '#61549c',
                            'stroke-width': 2,
                            'stroke-dasharray': '0'
                        },
                        '.tokens circle': {
                            fill: '#6a6c8a',
                            stroke: '#000',
                            'stroke-width': 0
                        },
                        '.label': {
                            text: '',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal'
                        }
                    }
                },
                {
                    type: 'pn.Transition',
                    preserveAspectRatio: true,
                    attrs: {
                        root: {
                            dataTooltip: 'Transition',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        rect: {
                            rx: 3,
                            ry: 3,
                            width: 12,
                            height: 50,
                            fill: '#61549c',
                            stroke: '#7c68fc',
                            'stroke-width': 0,
                            'stroke-dasharray': '0'
                        },
                        '.label': {
                            text: 'transition',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'stroke-width': 0,
                            'fill': '#222138'
                        }
                    }
                }
            ],
            erd: [

                {
                    type: 'erd.Entity',
                    attrs: {
                        root: {
                            dataTooltip: 'Entity',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.outer': {
                            rx: 3,
                            ry: 3,
                            fill: '#31d0c6',
                            'stroke-width': 2,
                            stroke: 'transparent',
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'Entity',
                            'font-size': 11,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            fill: '#f6f6f6',
                            'stroke-width': 0
                        }
                    }
                },
                {
                    type: 'erd.WeakEntity',
                    attrs: {
                        root: {
                            dataTooltip: 'Weak Entity',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.outer': {
                            fill: 'transparent',
                            stroke: '#feb663',
                            'stroke-width': 2,
                            points: '100,0 100,60 0,60 0,0',
                            'stroke-dasharray': '0'
                        },
                        '.inner': {
                            fill: '#feb663',
                            stroke: 'transparent',
                            points: '97,5 97,55 3,55 3,5',
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'Weak entity',
                            'font-size': 11,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            fill: '#f6f6f6',
                            'stroke-width': 0
                        }
                    }
                },
                {
                    type: 'erd.Relationship',
                    attrs: {
                        root: {
                            dataTooltip: 'Relationship',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.outer': {
                            fill: '#61549c',
                            stroke: 'transparent',
                            'stroke-width': 2,
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'Relation',
                            'font-size': 11,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            fill: '#f6f6f6',
                            'stroke-width': 0
                        }
                    }
                },
                {
                    type: 'erd.IdentifyingRelationship',
                    attrs: {
                        root: {
                            dataTooltip: 'Identifying Relationship',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.outer': {
                            fill: 'transparent',
                            stroke: '#6a6c8a',
                            'stroke-dasharray': '0'
                        },
                        '.inner': {
                            fill: '#6a6c8a',
                            stroke: 'transparent',
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'Relation',
                            'font-size': 11,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            fill: '#f6f6f6',
                            'stroke-width': 0
                        }
                    }
                },
                {
                    type: 'erd.ISA',
                    attrs: {
                        root: {
                            dataTooltip: 'ISA',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        text: {
                            text: 'ISA',
                            fill: '#f6f6f6',
                            'letter-spacing': 0,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11
                        },
                        polygon: {
                            fill: '#feb663',
                            stroke: 'transparent',
                            'stroke-dasharray': '0'
                        }
                    }
                },
                {
                    type: 'erd.Key',
                    attrs: {
                        root: {
                            dataTooltip: 'Key',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.outer': {
                            fill: 'transparent',
                            stroke: '#fe854f',
                            'stroke-dasharray': '0'
                        },
                        '.inner': {
                            fill: '#fe854f',
                            stroke: 'transparent',
                            display: 'block',
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'Key',
                            'font-size': 11,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            fill: '#f6f6f6',
                            'stroke-width': 0
                        }
                    }
                },
                {
                    type: 'erd.Normal',
                    attrs: {
                        root: {
                            dataTooltip: 'Normal',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.outer': {
                            fill: '#feb663',
                            stroke: 'transparent',
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'Normal',
                            'font-size': 11,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            fill: '#f6f6f6',
                            'stroke-width': 0
                        }
                    }
                },
                {
                    type: 'erd.Multivalued',
                    attrs: {
                        root: {
                            dataTooltip: 'Mutltivalued',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.outer': {
                            fill: 'transparent',
                            stroke: '#fe854f',
                            'stroke-dasharray': '0'
                        },
                        '.inner': {
                            fill: '#fe854f',
                            stroke: 'transparent',
                            rx: 43,
                            ry: 21,
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'MultiValued',
                            'font-size': 11,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            fill: '#f6f6f6',
                            'stroke-width': 0
                        }
                    }
                },
                {
                    type: 'erd.Derived',
                    attrs: {
                        root: {
                            dataTooltip: 'Derived',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.outer': {
                            fill: 'transparent',
                            stroke: '#fe854f',
                            'stroke-dasharray': '0'
                        },
                        '.inner': {
                            fill: '#feb663',
                            stroke: 'transparent',
                            'display': 'block',
                            'stroke-dasharray': '0'
                        },
                        text: {
                            text: 'Derived',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11,
                            'stroke-width': 0
                        }
                    }
                }
            ],
            uml: [

                {
                    type: 'uml.Class',
                    name: 'Class',
                    attributes: ['+attr1'],
                    methods: ['-setAttr1()'],
                    size: {
                        width: 150,
                        height: 100
                    },
                    attrs: {
                        root: {
                            dataTooltip: 'Class',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.uml-class-name-rect': {
                            top: 2,
                            fill: '#61549c',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8
                        },
                        '.uml-class-attrs-rect': {
                            top: 2,
                            fill: '#61549c',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8
                        },
                        '.uml-class-methods-rect': {
                            top: 2,
                            fill: '#61549c',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8
                        },
                        '.uml-class-name-text': {
                            ref: '.uml-class-name-rect',
                            'ref-y': 0.5,
                            'y-alignment': 'middle',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11
                        },
                        '.uml-class-attrs-text': {
                            ref: '.uml-class-attrs-rect',
                            'ref-y': 0.5,
                            'y-alignment': 'middle',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11
                        },
                        '.uml-class-methods-text': {
                            ref: '.uml-class-methods-rect',
                            'ref-y': 0.5,
                            'y-alignment': 'middle',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11
                        }
                    }
                },
                {
                    type: 'uml.Interface',
                    name: 'Interface',
                    attributes: ['+attr1'],
                    methods: ['-setAttr1()'],
                    size: {
                        width: 150,
                        height: 100
                    },
                    attrs: {
                        root: {
                            dataTooltip: 'Interface',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.uml-class-name-rect': {
                            fill: '#fe854f',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8
                        },
                        '.uml-class-attrs-rect': {
                            fill: '#fe854f',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8
                        },
                        '.uml-class-methods-rect': {
                            fill: '#fe854f',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8
                        },
                        '.uml-class-name-text': {
                            ref: '.uml-class-name-rect',
                            'ref-y': 0.5,
                            'y-alignment': 'middle',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11
                        },
                        '.uml-class-attrs-text': {
                            ref: '.uml-class-attrs-rect',
                            'ref-y': 0.5,
                            'y-alignment': 'middle',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-size': 11
                        },
                        '.uml-class-methods-text': {
                            ref: '.uml-class-methods-rect',
                            'ref-y': 0.5,
                            'y-alignment': 'middle',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11
                        }
                    }
                },
                {
                    type: 'uml.Abstract',
                    name: 'Abstract',
                    attributes: ['+attr1'],
                    methods: ['-setAttr1()'],
                    size: {
                        width: 150,
                        height: 100
                    },
                    attrs: {
                        root: {
                            dataTooltip: 'Abstract',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.uml-class-name-rect': {
                            fill: '#6a6c8a',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8
                        },
                        '.uml-class-attrs-rect': {
                            fill: '#6a6c8a',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8
                        },
                        '.uml-class-methods-rect': {
                            fill: '#6a6c8a',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8
                        },
                        '.uml-class-name-text': {
                            ref: '.uml-class-name-rect',
                            'ref-y': 0.5,
                            'y-alignment': 'middle',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11
                        },
                        '.uml-class-attrs-text': {
                            ref: '.uml-class-attrs-rect',
                            'ref-y': 0.5,
                            'y-alignment': 'middle',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11
                        },
                        '.uml-class-methods-text': {
                            ref: '.uml-class-methods-rect',
                            'ref-y': 0.5,
                            'y-alignment': 'middle',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 11
                        }
                    }
                },

                {
                    type: 'uml.State',
                    name: 'State',
                    events: ['entry/', 'create()'],
                    size: {
                        width: 150,
                        height: 100
                    },
                    attrs: {
                        root: {
                            dataTooltip: 'State',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.uml-state-body': {
                            fill: '#feb663',
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            rx: 8,
                            ry: 8,
                            'stroke-dasharray': '0'
                        },
                        '.uml-state-separator': {
                            stroke: '#f6f6f6',
                            'stroke-width': 1,
                            'stroke-dasharray': '0'
                        },
                        '.uml-state-name': {
                            fill: '#f6f6f6',
                            'font-size': 11,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal'
                        },
                        '.uml-state-events': {
                            fill: '#f6f6f6',
                            'font-size': 11,
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal'
                        }
                    }
                }
            ],
            org: [

                {
                    type: 'org.Member',
                    attrs: {
                        root: {
                            dataTooltip: 'Member',
                            dataTooltipPosition: 'left',
                            dataTooltipPositionSelector: '.joint-stencil'
                        },
                        '.rank': {
                            text: 'Rank',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-size': 12,
                            'font-weight': 'Bold',
                            'text-decoration': 'none'
                        },
                        '.name': {
                            text: 'Person',
                            fill: '#f6f6f6',
                            'font-family': 'Roboto Condensed',
                            'font-weight': 'Normal',
                            'font-size': 10
                        },
                        '.card': {
                            fill: '#31d0c6',
                            stroke: 'transparent',
                            'stroke-width': 0,
                            'stroke-dasharray': '0'
                        },
                        image: {
                            width: 32,
                            height: 32,
                            x: 16,
                            y: 13,
                            ref: <string>null,
                            'ref-x': <number>null,
                            'ref-y': <number>null,
                            'y-alignment': <string>null,
                            'xlink:href': 'assets/member-male.png'
                        }
                    }
                }
            ]
        };
    }
}
