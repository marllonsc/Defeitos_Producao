import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableDefectsComponent } from './data-table-defects.component';

describe('DataTableDefectsComponent', () => {
  let component: DataTableDefectsComponent;
  let fixture: ComponentFixture<DataTableDefectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableDefectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableDefectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
