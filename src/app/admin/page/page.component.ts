import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../services/page.service";
import {BookBar} from "../../models/book-bar";

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
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})


export class PageComponent implements OnInit {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  bookId: number = 0;

  constructor(private route: ActivatedRoute, public router: Router, private pageService: PageService) {
    this.dataSource.data = TREE_DATA;

  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchList();
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;


  fetchList() {
    if (this.bookId <= 0) {
      return;
    }
    this.pageService.item(this.bookId).subscribe((res) => {
      console.log(res);
      if (!res || res.code > 0) {
        console.log("fetch page item error:", res);
        return;
      }
      // this.formatPage(res.data.item.pages, res.data.item.pageTypes);
    })
  }

  formatPage(pages: any, pageTypes: any): BookBar[] {
    //need pageTypes diff parentId
    let bookBar: BookBar[] = [];
    if (pages) {
      for (let i in pages) {
        let pe = pages[i];
        let obj: BookBar = {
          id: pe.id, name: pe.title, sortBy: pe.sortBy, pageId: pe.id,
          link: "/admin/page/" + pe.bookId + "/" + pe.id, children: []
        };
        bookBar.push(<BookBar>obj);
      }
    }
    if (pageTypes) {
      for (let p in pageTypes) {
        let pt = pageTypes[p];
        let obj: BookBar = {
          id: pt.id, name: pt.name, sortBy: pt.sortBy, pageId: 0, link: "", children: []
        };
        if (pt["listPage"]) {
          for (let i in pt["listPage"]) {
            let pe = pt["listPage"][i];
            let sub: BookBar = {
              id: pe.id, name: pe.title, sortBy: pe.sortBy, pageId: pe.id,
              link: "/admin/page/" + pe.bookId + "/" + pe.id, children: []
            };
            obj.children.push(sub);
          }
        }
        if (pt["children"]) {
          for (let i in pt['children']) {
            let pe = pt["children"][i];
            let sub: BookBar = {
              id: pe.id, name: pe.title, sortBy: pe.sortBy, pageId: 0,
              link: "", children: []
            };
            if(pe["listPage"]){
              for (let ij in pe["listPage"]) {
                let ppe = pe["listPage"][ij];
                let ssub: BookBar = {
                  id: ppe.id, name: ppe.title, sortBy: ppe.sortBy, pageId: ppe.id,
                  link: "/admin/page/" + ppe.bookId + "/" + ppe.id, children: []
                };
                sub.children.push(ssub);
              }
            }
            obj.children.push(sub);
          }
        }
        bookBar.push(<BookBar>obj);
      }
    }
    return bookBar;
  }

}
