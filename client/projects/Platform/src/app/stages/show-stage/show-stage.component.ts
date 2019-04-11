import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StageService } from '../../services/stage.service';
import { Section } from '../section.model';
import { Stage } from '../stage.model';

@Component({
  selector: 'app-show-stage',
  templateUrl: './show-stage.component.html',
  styleUrls: ['./show-stage.component.css']
})
export class ShowStageComponent implements OnInit {
  stage: Stage = null;
  constructor(private router: Router , public stageService: StageService) { }
  displayedColumns: string[] = ['title', 'subType','section','actions'];
  ngOnInit() {
    console.log("in show stage");
    this.stageService.getComponents().subscribe(stages => {
      this.stage = stages.data;
      console.log(this.stage);
      if (stages.status == true) {
        /* this.userId = this.user.data._id;
        localStorage.setItem('currentUser', this.user.data);
        localStorage.setItem('currUserID', this.user.data._id);
        this.router.navigate(['/dashboard']); */
      } else {
        //this.userInvalid = true;
      }
    });
  }
  addComponent(){
    this.router.navigate(['/platform/stages/new']);
  }
  removeStage(id: string){
    console.log("in remove stage " + id);
    
  }
  editStage(id: string){
    console.log("in edit stage " + id);
    this.router.navigate(['/platform/stages/'+id]);
  }
}
