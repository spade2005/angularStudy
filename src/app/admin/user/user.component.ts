import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = {username: '', passwordHash: '', phone: '', email: '', nickName: ''};

  constructor(public router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.fetchOne();
  }

  submit() {
    console.log(this.user);
    this.userService.save(this.user).subscribe((res)=>{
      if (res?.code > 0) {
        console.log("fetch user error:", res);
      } else {
        const redirectUrl = '/admin/book';
        this.router.navigate([redirectUrl]);
      }
    })

  }

  fetchOne() {
    this.userService.info().subscribe((res) => {
      if (res?.code > 0) {
        console.log("fetch user error:", res);
      } else {
        this.user = res.data.user;
        this.user.passwordHash='';
      }
    })
  }
}
