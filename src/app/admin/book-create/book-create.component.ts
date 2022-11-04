import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  book: Book = {
    id: 0, name: '', mark: '', sortBy: 100, type: "1", visitPass: ''
  };

  constructor(private route: ActivatedRoute, public router: Router, private bookService: BookService) {
  }

  ngOnInit(): void {
    this.book.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchOne();
  }

  submit() {
    console.log(this.book);
    if (this.book.id == 0) {
      this.bookService.create(this.book).subscribe((res) => {
        if(res.code==0){
          this.goHome();
        }
      })
      return;
    }
    if (this.book.id > 0) {
      this.bookService.update(this.book).subscribe((res) => {
        if(res.code==0){
          this.goHome();
        }
      })
      return;
    }

  }

  goHome() {
    const redirectUrl = '/admin/book';
    this.router.navigate([redirectUrl]);
  }

  fetchOne() {
    if (this.book.id == 0) {
      return;
    }
    this.bookService.one(this.book.id).subscribe((res) => {
      console.log(res);
      if (res.code > 0) {
        return;
      }
      this.book = res.data.book;
      this.book.type=this.book.type.toString();
    })
  }
}
