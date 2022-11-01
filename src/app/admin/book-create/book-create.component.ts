import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  book = {id:0,name: '', mark: '', sort_by: 100, type: 1 | 2, visit_psss: ''};

  constructor(private route: ActivatedRoute,public router: Router,) {
  }

  ngOnInit(): void {
    this.book.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  submit() {
    console.log(this.book);
    const redirectUrl = '/admin/book';
    this.router.navigate([redirectUrl]);
  }
}
