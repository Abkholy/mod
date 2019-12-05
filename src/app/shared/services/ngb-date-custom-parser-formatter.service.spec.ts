import { TestBed } from '@angular/core/testing';

import { NgbDateCustomParserFormatterService } from './ngb-date-custom-parser-formatter.service';

describe('NgbDateCustomParserFormatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgbDateCustomParserFormatterService = TestBed.get(NgbDateCustomParserFormatterService);
    expect(service).toBeTruthy();
  });
});
