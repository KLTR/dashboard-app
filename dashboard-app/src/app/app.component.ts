import { Component,Inject } from '@angular/core';

  import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  sandstone = '../assets/styles and themes/sandstone.css';
  superhero = '../assets/styles and themes/superhero.css';
  color = 'Sandstone'
  constructor(@Inject(DOCUMENT) private document ){

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
}
