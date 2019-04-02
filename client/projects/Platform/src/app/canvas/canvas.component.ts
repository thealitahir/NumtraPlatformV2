import { Component, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import * as jQuery from 'jquery';

import * as joint from '../../rappid/library/js/rappid';
import * as _ from 'lodash';

import { StencilService } from '../../rappid/services/stencil-service';
import { ToolbarService } from '../../rappid/services/toolbar-service';
import { InspectorService } from '../../rappid/services/inspector-service';
import { HaloService } from '../../rappid/services/halo-service';
import { KeyboardService } from '../../rappid/services/keyboard-service';
import RappidService from '../../rappid/services/kitchensink-service';
//import KitchenSinkService from 'dist/numtraPlatformV2/rappid/services/kitchensink-service';
import { CanvasService } from '../services/canvas.service';
import { StageService } from '../services/stage.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  selectedRightNav: string;
  selectedMode = 'development';
  dataExplorerView = 0;
  data: any;

  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  private rappid: any;
  paper: any;
  selection: any;
  keyboardService: any;
  graph: any;
  title = 'Rappid App';

  constructor(
    private element: ElementRef,
    public canvasService: CanvasService,
    public stageService: StageService,
    ) {}

  ngOnInit() {
    this.rappid = new RappidService(
      this.element.nativeElement,
      new StencilService(),
      new ToolbarService(),
      new InspectorService(),
      new HaloService(),
      new KeyboardService()
    );
    this.rappid.startRappid();
    this.paper = this.rappid.getPaper();
    this.keyboardService = this.rappid.getKeyboard();
    const keyboard = this.keyboardService.keyboard;
    this.selection = this.rappid.getSelection();
    this.graph = this.rappid.getGraph();
    var link = new joint.shapes.standard.Link();
    /* this.canvasService.getCanvasModel().subscribe(data =>{
      console.log("model from db");
      console.log(data);
      for(var i = 0; i < data.data.length; i++){
        var rect = new joint.shapes.standard.Rectangle();
        rect.position(data.data[i].position.x, data.data[i].position.y);
        rect.resize(data.data[i].shape_size.height, data.data[i].shape_size.width)
        rect.attr(data.data[i].shape_attributes);
        rect.addTo(this.graph);
        var rect = new joint.shapes.standard.Rectangle();
      }
      //this.graph.attributes.cells.models = data.data.model;
      console.log(this.graph);
    }); */
    console.log("this is graph");
    console.log(this.graph);

    //called when clicked anywhere on screen
    this.paper.on('blank:pointerup', (elementView: joint.dia.ElementView, evt: JQuery.Event) => {
      if (keyboard.isActive('ctrl meta', evt)) {
        this.selection.collection.add(elementView.model);
      }
      this.onSearch.emit(elementView);
      
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
    });

    //called when an element is added
    this.paper.on('element:pointerup', (elementView: joint.dia.ElementView, evt: JQuery.Event) => {
      console.log("this is graph");
      console.log(this.graph);
      console.log("element clicked");
      console.log(elementView);
      if (keyboard.isActive('ctrl meta', evt)) {
        this.selection.collection.add(elementView.model);
      }
      this.onSearch.emit(elementView);
      this.canvasService.saveCanvasModel(elementView.model.attributes.attrs,
        elementView.model.attributes.position,elementView.model.attributes.size,
        elementView.model.attributes.type).subscribe(data=>{

      });
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
    });

    //called when an element is deleted
    this.paper.on('element:delete', (elementView: joint.dia.ElementView, evt: JQuery.Event) => {
      if (keyboard.isActive('ctrl meta', evt)) {
        this.selection.collection.add(elementView.model);
      }
      /* this.canvasService.saveCanvasModel(this.graph.attributes.cells.models).subscribe(data=>{

      }); */
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
    });

    //called when a link is deleted
    this.paper.on('link:delete', (elementView: joint.dia.ElementView, evt: JQuery.Event) => {
      if (keyboard.isActive('ctrl meta', evt)) {
        this.selection.collection.add(elementView.model);
      }
      /* this.canvasService.saveCanvasModel(this.graph.attributes.cells.models).subscribe(data=>{

      }); */
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
    });

    //called when a link is made
    this.paper.on('link:pointerup', (elementView, evt: JQuery.Event) => {
      console.log(elementView);
      if(elementView.model.attributes.target.id != null &&
         elementView.model.attributes.target.id != elementView.model.attributes.source.id){
          console.log(elementView.sourceView.model.attributes.attrs.label.text);
          console.log(elementView.targetView.model.attributes.attrs.label.text);
          this.canvasService.onConnection(elementView.sourceView.model.attributes.attrs.label.text,
          elementView.targetView.model.attributes.attrs.label.text).subscribe(data => {
            console.log(data);
          });
      }
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
      if (keyboard.isActive('ctrl meta', evt)) {
          this.selection.collection.add(elementView.model);
      }

    });
  }

  executePipeline() {
    this.data = {process_id: '5c51641b607a223b3ef0ea61'};
    this.stageService.executePipeline(this.data).subscribe(schemadata => {
      console.log(schemadata);
    });
  }

  dataExplorer() {
    if (this.dataExplorerView === 1) {
      this.dataExplorerView = 0;
    } else {
      this.dataExplorerView = 1;
    }
  }

  openRightCol(selectedNav: string) {
    this.selectedRightNav = selectedNav;
  }
  selectMode(mode: string){
    this.selectedMode = mode;
  }

  showStencilGroup(event, group) {
    let el = jQuery(event.currentTarget);
    let li = jQuery('.sub-nav li');
    let gp = jQuery('*[data-name="' + group + '"]');
    let cl = jQuery('.close-stencil-container');

    if (el.hasClass('active')) {
      li.removeClass('active');
      gp.slideUp();
      cl.fadeOut();
      return false;
    }

    li.removeClass('active');
    el.addClass('active');

    jQuery('.stencil-wrap .group').hide();
    jQuery('.toolbar-container').hide();
    gp.slideDown();
    cl.fadeIn();
  }

  hideStencilGroup() {
    jQuery('.sub-nav li').removeClass('active');
    jQuery('.stencil-wrap .group').slideUp();
    jQuery('.toolbar-container').slideUp();
    jQuery('.close-stencil-container').fadeOut();
  }

  showCanvasSetting(event) {
    let  el = jQuery(event.currentTarget);
    let li = jQuery('.sub-nav li');
    let gp = jQuery('.stencil-wrap .group');
    let cl = jQuery('.close-stencil-container');
    let tb = jQuery('.toolbar-container');

    if (el.hasClass('active')) {
      li.removeClass('active');
      el.removeClass('active');
      tb.slideUp();
      cl.fadeOut();
      return false;
    }

    li.removeClass('active');
    el.addClass('active');
    gp.hide();
    tb.slideDown();
    cl.fadeIn();
  }
}
