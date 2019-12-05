import { TestBed } from '@angular/core/testing';

import { CollageService } from './collage.service';

describe('CollageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollageService = TestBed.get(CollageService);
    expect(service).toBeTruthy();
  });
});
