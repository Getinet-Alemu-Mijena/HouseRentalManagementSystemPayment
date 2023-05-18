import { TestBed } from '@angular/core/testing';

import { UserTrackerService } from './user-tracker.service';

describe('UserTrackerService', () => {
  let service: UserTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
