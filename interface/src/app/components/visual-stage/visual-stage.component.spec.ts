import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualStageComponent } from './visual-stage.component';

describe('VisualStageComponent', () => {
  let component: VisualStageComponent;
  let fixture: ComponentFixture<VisualStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
