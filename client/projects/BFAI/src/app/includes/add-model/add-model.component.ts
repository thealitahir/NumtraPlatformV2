import { Component } from '@angular/core';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent {

  selectedIndex = 0;

  selectTab(index: number): void {
    this.selectedIndex = index;
  }

}
