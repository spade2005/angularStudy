import {Component, OnInit} from '@angular/core';
import {ArrayDataSource} from '@angular/cdk/collections';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatDialog} from '@angular/material/dialog';
import {PageFolderCreateComponent} from "../page-folder-create/page-folder-create.component";

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
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
  },
];

@Component({
  selector: 'app-page-folder',
  templateUrl: './page-folder.component.html',
  styleUrls: ['./page-folder.component.css']
})
export class PageFolderComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  folder = {name: '', mark: '', sort_by: 0, parent_id: 0, parent_list: []};

  openDialog(): void {
    const dialogRef = this.dialog.open(PageFolderCreateComponent, {
      width: '250px',
      data: this.folder,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      // this.folder = result;
    });
  }
}
