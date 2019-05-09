import { Component, ElementRef, OnInit, EventEmitter, Output, Input } from '@angular/core';

import * as jQuery from 'jquery';

import * as joint from '../../rappid/library/js/rappid';
import * as _ from 'lodash';
import Position = joint.ui.Halo.HandlePosition;
import { StencilService } from '../../rappid/services/stencil-service';
import { ToolbarService } from '../../rappid/services/toolbar-service';
import { InspectorService } from '../../rappid/services/inspector-service';
import { HaloService } from '../../rappid/services/halo-service';
import { KeyboardService } from '../../rappid/services/keyboard-service';
import RappidService from '../../rappid/services/kitchensink-service';
//import KitchenSinkService from 'dist/numtraPlatformV2/rappid/services/kitchensink-service';
import { CanvasService } from '../services/canvas.service';
import { StageService } from '../services/stage.service';
import { ValueTransformer } from '@angular/compiler/src/util';

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
  selected_stage: string;

  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Input() pipeline_id: any;
  
  private rappid: any;
  paper: any;
  selection: any;
  keyboardService: any;
  graph: any;
  title = 'Rappid App';

  constructor(
    private element: ElementRef,
    public canvasService: CanvasService,
    public stageService: StageService
  ) { }

  ngOnInit() {
    console.log("pipeline id : " + this.pipeline_id);
    console.log("in canvas component");
    this.rappid = new RappidService(
      this.element.nativeElement,
      new StencilService(this.stageService),
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

    this.canvasService.getCanvasModel(this.pipeline_id).subscribe(data =>{
      var stages = data.data;
      var stagesArray = [];
      var linksArray = []
      //drawing all stages
      console.log('All stages');
      console.log(stages);
      for(var i = 0; i < stages.length; i++){
        var stage = new joint.shapes.standard.Image();
        stage.attr(stages[i].shape_attributes);
        stage.position(stages[i].position.x, stages[i].position.y);
        stage.resize(stages[i].shape_size.height, stages[i].shape_size.width);
        stage.attributes.attrs._id = stages[i]._id;
        stage.attributes.attrs.dbValues = stages.stage_attributes;
        stage.addTo(this.graph);
        stagesArray.push(stage);
        stage = new joint.shapes.standard.Image();
      }

      //creating all links
      for(var i = 0; i < stages.length; i++){
        for(var j = 0; j < stages[i].out.length; j++){
          var link = new joint.shapes.standard.Link();
          var source = stagesArray[stagesArray.findIndex(stagesArray => stagesArray.attributes.attrs._id == stages[i]._id)];
          var target = stagesArray[stagesArray.findIndex(stagesArray => stagesArray.attributes.attrs._id == stages[i].out[j])];
          link.source(source);
          link.target(target);
          link.addTo(this.graph);
          linksArray.push(link);
          link = new joint.shapes.standard.Link();
        }
      }
    });
    //link interactions
    this.paper.on('link:mouseenter', function (linkView) {

      var tool = [new joint.linkTools.Remove({})];
      linkView.addTools(new joint.dia.ToolsView({
        name: 'onhover',
        tools: tool
      }));
    });
    this.paper.on('link:mouseleave', function (linkView) {
      if (!linkView.hasTools('onhover')) return;
      linkView.removeTools();
    });

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
      if (keyboard.isActive('ctrl meta', evt)) {
        this.selection.collection.add(elementView.model);
      }
      this.onSearch.emit(elementView);
      this.selected_stage = elementView.model.attributes.attrs._id;
      this.canvasService.saveCanvasModel(
        this.pipeline_id,
        elementView.model.attributes.attrs._id,elementView.model.id,
        elementView.model.attributes.attrs,
        elementView.model.attributes.attrs.dbValues,
        elementView.model.attributes.position, elementView.model.attributes.size,
        elementView.model.attributes.type).subscribe(data => {
          elementView.model.attributes.attrs._id = data.data._id;
        });
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
    });

    this.paper.on('element:delete', (elementView: joint.dia.ElementView, evt: JQuery.Event) => {
      if (keyboard.isActive('ctrl meta', evt)) {
        this.selection.collection.add(elementView.model);
      }
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
    });

    //called when a link is deleted
    this.graph.on('remove', (cell, collection, opt) => {
      var source_id,target_id;
      var array = this.graph.attributes.cells.models;
      if (cell.isLink() && cell.attributes.target.id != null && cell.attributes.target.id != cell.attributes.source.id) {
        source_id = array[array.findIndex(array => array.id == cell.attributes.source.id)].attributes.attrs._id;
        target_id = array[array.findIndex(array => array.id == cell.attributes.target.id)].attributes.attrs._id;
        this.canvasService.removeLink(source_id, target_id).subscribe(data => {


        });
        // a link was removed  (cell.id contains the ID of the removed link)
      }
      else if (!cell.isLink()) {
        this.canvasService.removeStage(cell.attributes.attrs._id).subscribe(data => {

        });
        cell.remove();
      }
    });
    this.graph.on('add', (cell, collection, opt) => {
      if (cell.isLink()) {
        // a link was removed  (cell.id contains the ID of the removed link)
      }
      else if (!cell.isLink()) {
        this.canvasService.saveCanvasModel(
          this.pipeline_id,
          cell.attributes.attrs._id,cell.id,
          cell.attributes.attrs,
          cell.attributes.attrs.dbValues,
          cell.attributes.position, cell.attributes.size,
          cell.attributes.type).subscribe(data => {
            cell.attributes.attrs._id = data.data._id;
          });
      }
    });


    //called when a link is made
    this.paper.on('link:pointerup', (elementView, evt: JQuery.Event) => {
      console.log(elementView);
      var source_id,target_id;
      var array = this.graph.attributes.cells.models;
      if (elementView.model.attributes.target.id != null &&
        elementView.model.attributes.target.id != elementView.model.attributes.source.id) {
        source_id = array[array.findIndex(array => array.id == elementView.sourceView.model.id)].attributes.attrs._id;
        target_id = array[array.findIndex(array => array.id == elementView.targetView.model.id)].attributes.attrs._id;
        this.canvasService.addLink(source_id,target_id).subscribe(data => {
          });
      }
      // Select an element if CTRL/Meta key is pressed while the element is clicked.
      if (keyboard.isActive('ctrl meta', evt)) {
        this.selection.collection.add(elementView.model);
      }

    });
  }

  executePipeline() {
    this.data = { process_id: this.pipeline_id };
    var value = {
      model: {
        attributes: {
          attrs: {
            label: {
              text: ''
            }, _id: ''
          }
        }
      }
    };
    value.model.attributes.attrs.label.text = "executePipeline";
    value.model.attributes.attrs._id = this.pipeline_id;
    this.onSearch.emit(value);
    /* this.stageService.executePipeline(this.data).subscribe(schemadata => {
      console.log(schemadata);
    }); */
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
  selectMode(mode: string) {
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
    let el = jQuery(event.currentTarget);
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
