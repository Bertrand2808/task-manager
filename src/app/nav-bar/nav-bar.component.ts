import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router) { }
  goToTasks(){
    this.router.navigate(['/display']);
  }
  goToDate() {
    this.router.navigate(['/date']);
  }
  goToNewTask() {
    this.router.navigate(['/add']);
  }
}
