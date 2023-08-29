import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager';
  constructor(private router: Router) {
    this.router.navigate(['/display']); // Redirection vers la route "/display"
  }

}
