import { TestBed } from '@angular/core/testing';
import { registrationLinesLinesService } from './registration-lines.service';

describe('RegistrationLinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: registrationLinesLinesService = TestBed.get(registrationLinesLinesService);
    expect(service).toBeTruthy();
  });
});
