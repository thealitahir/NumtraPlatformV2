import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStageComponent } from './add-stage.component';

describe('AddStageComponent', () => {
  let component: AddStageComponent;
  let fixture: ComponentFixture<AddStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
