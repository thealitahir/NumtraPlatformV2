import { Component, ElementRef, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { StencilService } from '../../rappid/services/stencil-service';
import { ToolbarService } from '../../rappid/services/toolbar-service';
import { InspectorService } from '../../rappid/services/inspector-service';
import { HaloService } from '../../rappid/services/halo-service';
import { KeyboardService } from '../../rappid/services/keyboard-service';
import RappidService from '../../rappid/services/kitchensink-service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  selectedRightNav: string;
  selectedMode = 'development';


  private rappid: any;

  title = 'Rappid App';

  constructor(private element: ElementRef) {}

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
