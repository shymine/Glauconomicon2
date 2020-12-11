import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualScenarioComponent } from './visual-scenario.component';

describe('VisualScenarioComponent', () => {
  let component: VisualScenarioComponent;
  let fixture: ComponentFixture<VisualScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
