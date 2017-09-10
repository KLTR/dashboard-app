import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
logo : String;
  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  this.logo =  '../../../assets/images/Verint_logo.png';
  }

  logout(){
    this.router.navigate(['/user'])
  }

}
