import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  fetchParams = {start: 0, length: 1000, data: {}, sortData: {"id": "DESC"}}
  // fetchParams = {start: 0, length: 1000}
  bookList: Book[] = [];

  constructor(private bookService: BookService, public dialog: MatDialog) {
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
      if (!res || res?.code > 0) {
        console.log("fetch book error:", res);
      } else {
        if (res.data.count > 0) {
          this.bookList = res.data.list;
        }
        // console.log(this.bookList, "==");
      }
    });
  }

  delBook(id: number, name: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {name: name},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.bookService.del({id: id}).subscribe((res) => {
          console.log(res);
          if (res?.code > 0) {
            console.log("fetch book error:", res);
          } else {
            this.fetchList();
          }
        });
      }

    });

  }
}
