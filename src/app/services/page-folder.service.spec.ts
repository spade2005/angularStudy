import { TestBed } from '@angular/core/testing';

import { PageFolderService } from './page-folder.service';

describe('PageFolderService', () => {
  let service: PageFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
