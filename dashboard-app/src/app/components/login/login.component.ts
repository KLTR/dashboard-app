import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

private default_username = 'soc-admin'
private default_password = '1q2w3e$r'
private username:string;
private password:string;
private isLogged : Boolean
  constructor(private router: Router,
   private flashMessage: FlashMessagesService
  ) { }


  ngOnInit() {
    if(this.isLogged){
      this.router.navigate(['/admin']);
    }
  }

login(){
  if(this.username == this.default_username && this.password == this.default_password ){
    this.isLogged = true;
     this.flashMessage.show("Success ! You are being redirected ..", {cssClass: 'alert-success', timeout: 3000});
     this.flashMessage.grayOut(true);
      setTimeout((router: Router) => {
        this.router.navigate(['/admin']);
    }, 1500); 
}
else{
   this.flashMessage.show("Wrong username or password", {cssClass: 'alert-warning', timeout: 3000});


}
}
}