import { Component } from '@angular/core';
import { UserStorageService } from './basic/service/storage/user-storage.service';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
[x: string]: any;
  title = 'SpaFrontEnd';

  isClientLoggedIn: boolean = UserStorageService.isClientLoggedIn();

  isCompanyLoggedIn: boolean = UserStorageService.isCompanyLoggedIn();

  constructor(private router: Router) {}

  ngOnInit(){

    this.router.events.subscribe(event => {
      this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
      this.isCompanyLoggedIn = UserStorageService.isCompanyLoggedIn();
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('/login');

  }
}
