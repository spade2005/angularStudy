import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../guard/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
