import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualCharacSheetComponent } from './visual-charac-sheet.component';

describe('VisualCharacSheetComponent', () => {
  let component: VisualCharacSheetComponent;
  let fixture: ComponentFixture<VisualCharacSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualCharacSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualCharacSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
