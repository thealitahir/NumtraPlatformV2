import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStageComponent } from './show-stage.component';

describe('ShowStageComponent', () => {
  let component: ShowStageComponent;
  let fixture: ComponentFixture<ShowStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
