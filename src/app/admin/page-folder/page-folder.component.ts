import {Component, OnInit} from '@angular/core';
import {ArrayDataSource} from '@angular/cdk/collections';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatDialog} from '@angular/material/dialog';
import {PageFolderCreateComponent} from "../page-folder-create/page-folder-create.component";
import {PageFolderService} from "../../services/page-folder.service";
import {ActivatedRoute} from "@angular/router";
import {PageFolder} from "../../models/page-folder";


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

// @ts-ignore
const TREE_DATA: PageFolder[] = [
  {
    id: 0, mark: '', sortBy: 0, parentId: 0, bookId: 0,
    name: 'Fruit',
    children: [
      {id: 0, name: 'Apple', mark: '', sortBy: 0, parentId: 0, bookId: 0,},
      {id: 0, name: 'Banana', mark: '', sortBy: 0, parentId: 0, bookId: 0,},
      {id: 0, name: 'Fruit loops', mark: '', sortBy: 0, parentId: 0, bookId: 0}
    ],
  },
  /*
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },*/
];

@Component({
  selector: 'app-page-folder',
  templateUrl: './page-folder.component.html',
  styleUrls: ['./page-folder.component.css']
})
export class PageFolderComponent implements OnInit {

  constructor(public dialog: MatDialog, private pagefolderservice: PageFolderService, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchList();
  }

  treeControl = new NestedTreeControl<PageFolder>(node => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: PageFolder) => !!node.children && node.children.length > 0;

  bookId: number = 0;
  folder = {name: '', sort_by: 0, parent_id: 0, parent_list: [], bookId: this.bookId};

  openDialog(): void {
    const dialogRef = this.dialog.open(PageFolderCreateComponent, {
      width: '400px',
      data: this.folder,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.folder = result;
    });
  }

  fetchList() {
    this.pagefolderservice.itemType(this.folder.bookId).subscribe((res) => {
      console.log(res);
      if (res?.code > 0) {
        console.log("fetch book error:", res);
      } else {
        this.formatTree(res.data.item, res.data.child)
      }
    })
  }

  formatTree(item: any, child: any) {
    console.log(item,"item")
    console.log(child,"child")
  }
}
