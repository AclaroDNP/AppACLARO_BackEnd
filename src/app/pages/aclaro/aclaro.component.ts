import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aclaro',
  templateUrl: './aclaro.component.html',
  styleUrls: ['./aclaro.component.css']
})

export class AclaroComponent {

  constructor(private router: Router) {}

  navToSection(idR: string): void {
    this.router.navigate(['./description'], { fragment: idR });
  }

  showButton = false;

  changeButton() {
		this.showButton = !this.showButton;
	}
}


