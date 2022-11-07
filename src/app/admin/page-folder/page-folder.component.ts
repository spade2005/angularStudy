import {Component, OnInit} from '@angular/core';
import {ArrayDataSource} from '@angular/cdk/collections';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatDialog} from '@angular/material/dialog';
import {PageFolderCreateComponent} from "../page-folder-create/page-folder-create.component";
import {PageFolderService} from "../../services/page-folder.service";
import {ActivatedRoute} from "@angular/router";
import {PageFolder} from "../../models/page-folder";

/*
interface FoodNode {
  name: string;
  children?: FoodNode[];
}
*/
/*
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
];
*/
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
  data: any;
  dataSource: any;
  hasChild = (_: number, node: PageFolder) => !!node.children && node.children.length > 0;

  bookId: number = 0;
  folder: PageFolder = {
    bookId: this.bookId,
    id: 0,
    mark: "",
    name: "",
    parentId: 0,
    children: [],
    sortBy: 100
  };

  openDialog(node: PageFolder | null): void {
    if (node == null) {
      this.folder.name = "";
      this.folder.parentId = 0;
      node = this.folder;
    }
    console.log("new node", node);
    console.log("new node2", this.folder);
    const dialogRef = this.dialog.open(PageFolderCreateComponent, {
      width: '400px',
      data: {node: node, list: this.data},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      console.log('The dialog was closed', result);
      this.saveFolder(result);
      // this.folder = result;
    });
  }

  saveFolder(result: PageFolder) {
    if (result.name == "") {
      return;
    }
    console.log("start update", result.id, "===start end")
    let data = result;
    delete data.children;
    data.bookId = this.bookId;
    if (result.id > 0) {
      //update
      this.pagefolderservice.update(data).subscribe((res) => {
        console.log(res);
        if (!res || res.code > 0) {
          console.log("update book error:", res);
          return;
        }
        this.fetchList();
      })
    } else {
      //create
      this.pagefolderservice.create(data).subscribe((res) => {
        console.log(res);
        if (!res || res.code > 0) {
          console.log("create book error:", res);
          return;
        }
        this.fetchList();
      })

    }
  }

  fetchList() {
    this.pagefolderservice.itemType(this.bookId).subscribe((res) => {
      console.log(res);
      if (!res || res.code > 0) {
        console.log("fetch book error:", res);
        return;
      }
      let data = this.formatTree(res.data.item, res.data.child);
      this.data = data;
      this.dataSource = new ArrayDataSource(data);
    })
  }

  formatTree(item: any, child: any) {
    if (!item) {
      return;
    }
    let cmap: any = {};
    if (child) {
      for (let c in child) {
        let key = "c" + child[c]["parentId"];
        if (!cmap[key]) {
          cmap[key] = [];
        }
        cmap[key].push(child[c]);
      }
    }
    for (let i in item) {
      item[i]["children"] = [];
      let key = "c" + item[i]["id"];
      if (cmap[key]) {
        item[i]["children"] = cmap[key];
      }
    }
    console.log(item, "item")
    // console.log(child, "child")
    // console.log(cmap, "cmap")
    return item;
  }
}
