import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacSheetComponent } from './create-charac-sheet.component';

describe('CreateCharacSheetComponent', () => {
  let component: CreateCharacSheetComponent;
  let fixture: ComponentFixture<CreateCharacSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCharacSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCharacSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
