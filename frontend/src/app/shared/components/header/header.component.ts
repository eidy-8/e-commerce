import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../private/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected text: string = 'EnriqueOnaga';

  private unsubscribe = new Subject<void>;

  public isLogged: boolean = false;
  
  constructor(public authService: AuthService, private userService: UserService) {}

  async ngOnInit(): Promise<void> {

    if (sessionStorage.getItem('Session-Token')) {
      this.isLogged = await this.authService.isAuthenticated();     
  
      this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
        this.text = res.data.userLogged[0].username;        
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
