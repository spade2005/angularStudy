import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFolderComponent } from './page-folder.component';

describe('PageFolderComponent', () => {
  let component: PageFolderComponent;
  let fixture: ComponentFixture<PageFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
