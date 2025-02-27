import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ApiDataService } from '../../../private/services/api-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected username!: string;

  private unsubscribe = new Subject<void>;

  public isLogged: boolean = false;
  
  constructor(public authService: AuthService, private apiData: ApiDataService) {}

  async ngOnInit(): Promise<void> {

    if (sessionStorage.getItem('Session-Token')) {
      this.isLogged = await this.authService.isAuthenticated();     
  
      this.apiData.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {      
        this.username = res.data.userLogged.username;
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
