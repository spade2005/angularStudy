import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-page-folder-create',
  templateUrl: './page-folder-create.component.html',
  styleUrls: ['./page-folder-create.component.css']
})
export class PageFolderCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PageFolderCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { name: "", sort_by: 0, parent_id: 0, parent_list: [] },) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
