import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { DOCUMENT } from '@angular/platform-browser';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
declare let $: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('modal') modal:ElementRef;

logo : String;
sandstone = '../assets/styles and themes/sandstone.css';
superhero = '../assets/styles and themes/superhero.css';
color = 'Superhero'
  constructor(@Inject(DOCUMENT) private document, 
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  this.logo =  '../../../assets/images/Verint_logo.png';
  }

  logout(){
    this.router.navigate(['/home'])
  }
  login(){
    this.router.navigate(['/login']);
  }
  showCharts(){
    this.router.navigate(['/charts'])
  }
  showTrending(){
    this.router.navigate(['/trending'])
  }
  showSnowIncidents(){

  }
  changeTheme(){
    if(this.color == 'Superhero'){
      this.document.getElementById('theme').setAttribute('href', this.sandstone);
      this.color = 'Sandstone';    
      
    }else{ //color == 'sandstone'
      this.document.getElementById('theme').setAttribute('href', this.superhero);
      this.color='Superhero'    
      
    }
  }
  public openModal():void {   
        $(this.modal.nativeElement).modal('show'); 
    }

}
