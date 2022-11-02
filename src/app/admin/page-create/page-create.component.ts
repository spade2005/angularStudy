import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.css']
})
export class PageCreateComponent implements OnInit {

  page = {title: "", type: "", content: ""}

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.page);
    const redirectUrl = '/admin/page';
    this.router.navigate([redirectUrl]);
  }

}
