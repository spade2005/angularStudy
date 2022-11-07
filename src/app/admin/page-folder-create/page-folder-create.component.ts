import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PageFolder} from "../../models/page-folder";

@Component({
  selector: 'app-page-folder-create',
  templateUrl: './page-folder-create.component.html',
  styleUrls: ['./page-folder-create.component.css']
})
export class PageFolderCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PageFolderCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { node: PageFolder, list: PageFolder[] }
  ) {
    if (this.data.list.length == 0) {
      this.data.list = [{bookId: 0, children: undefined, mark: "", parentId: 0, sortBy: 0, id: 0, name: "顶级"}];
    }
    console.log(this.data, "page folder start1");
    if (this.data.list && this.data.list[0]["id"] > 0) {
      this.data.list.unshift({bookId: 0, children: undefined, mark: "", parentId: 0, sortBy: 0, id: 0, name: "顶级"});
    }
  }

  ngOnInit(): void {
    console.log(this.data, "page folder start");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
