import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ApiDataService } from '../../../private/services/api-data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header-sub-logged',
  templateUrl: './header-sub-logged.component.html',
  styleUrl: './header-sub-logged.component.css'
})
export class HeaderSubLoggedComponent implements OnInit, OnDestroy {
  protected username!: string;

  private unsubscribe = new Subject<void>;

  constructor(private authService: AuthService, private apiData: ApiDataService) {}
  
  ngOnInit(): void {
    this.apiData.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {      
      this.username = res.data.userLogged.username;
    })
  }

  protected logout() {
    this.authService.logout();

    window.location.reload();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
