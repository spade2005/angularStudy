import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../services/page.service";
import {PageFolderService} from "../../services/page-folder.service";
import {IdPair} from "../../models/id-pair";

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.css']
})
export class PageCreateComponent implements OnInit {

  bookId: number = 0;
  pageId: number = 0;
  page = {id: 0, title: "", typeId: 0, content: "", sortBy: 100, bookId: this.bookId}
  pageTypes: IdPair[] = [];

  constructor(public router: Router, private route: ActivatedRoute
    , private pageService: PageService
    , private pagefolderservice: PageFolderService,) {
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.pageId = Number(this.route.snapshot.paramMap.get('pid'));
    this.page.bookId = this.bookId;
    this.fetchList();
    this.fetchPage();
  }

  submit() {
    console.log(this.page);
    if (this.page.id == 0) {
      this.pageService.create(this.page).subscribe((res) => {
        console.log(res);
        if (!res || res.code > 0) {
          console.log("create page error:", res);
          return;
        }
        this.goPage();
      })
      return;
    }
    this.pageService.update(this.page).subscribe((res) => {
      console.log(res);
      if (!res || res.code > 0) {
        console.log("create page error:", res);
        return;
      }
      this.goPage();
    })

  }

  goPage() {
    const redirectUrl = '/admin/page/' + this.bookId;
    this.router.navigate([redirectUrl]);
  }

  fetchList() {
    if (this.bookId <= 0) {
      return;
    }
    this.pagefolderservice.itemType(this.bookId).subscribe((res) => {
      console.log(res);
      if (!res || res.code > 0) {
        console.log("fetch book error:", res);
        return;
      }
      let data = this.formatTree(res.data.item, res.data.child);
      data.unshift({id: 0, name: "顶级"});
      this.pageTypes = data;
      console.log(data);
    })
  }

  formatTree(item: any, child: any): IdPair[] {
    if (!item) {
      return [];
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
    let arr: IdPair[] = [];
    for (let i in item) {
      let id: IdPair = {id: item[i]["id"], name: item[i]["name"]};
      arr.push(id);

      let key = "c" + item[i]["id"];
      if (cmap[key]) {
        for (let j in cmap[key]) {
          let id: IdPair = {id: cmap[key][j]["id"], name: item[i]["name"] + '/' + cmap[key][j]["name"]};
          arr.push(id);
        }
      }
    }
    return arr;
  }

  fetchPage() {
    if (this.pageId <= 0) {
      return;
    }
    this.pageService.one(this.pageId).subscribe((res) => {
      console.log(res);
      if (!res || res.code > 0) {
        console.log("fetch page content error:", res);
        return;
      }
      this.page = res.data.page;
      this.page.typeId = Number(this.page.typeId)
    })
  }

}
