import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbfsSinkComponent } from './dbfs-sink.component';

describe('DbfsSinkComponent', () => {
  let component: DbfsSinkComponent;
  let fixture: ComponentFixture<DbfsSinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbfsSinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbfsSinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
