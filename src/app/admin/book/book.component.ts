import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  // fetchParams = {start: 0, length: 1000, data: {}, sortData: {"id": "DESC"}}
  fetchParams = {start: 0, length: 1000}
  bookList: Book[] | undefined

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.fetchList();
  }

  create() {
    alert("create new ")
  }

  fetchList() {
    this.bookService.list(this.fetchParams).subscribe((res) => {
      console.log(res);
      if (res.data?.code > 0) {
        console.log("fetch book error:", res);
      } else {
        if (res.data.count > 0) {
          this.bookList = res.data.list;
        }
        console.log(this.bookList, "==");
      }
    });
  }

  delBook(id: number) {
    console.log("xxx", id);
  }
}
