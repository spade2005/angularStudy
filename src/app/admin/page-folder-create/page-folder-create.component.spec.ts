import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFolderCreateComponent } from './page-folder-create.component';

describe('PageFolderCreateComponent', () => {
  let component: PageFolderCreateComponent;
  let fixture: ComponentFixture<PageFolderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFolderCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFolderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
