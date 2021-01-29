import { TestBed } from '@angular/core/testing';

import { SheetSectionsService } from './sheet-sections.service';

describe('SheetSectionsService', () => {
  let service: SheetSectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetSectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
