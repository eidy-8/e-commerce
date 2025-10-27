import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '../../../../shared/services/loading.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, OnDestroy {

  ordersList: any = [];
  currentPage: number = 1;
  hasNext: boolean = false;
  pageSize: number = 10;

  sellerId!: string;
  buyerId!: string;

  private unsubscribe = new Subject<void>;

  protected isLoading$: Observable<boolean>;

  constructor(public loadingService: LoadingService, private userService: UserService) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {    
    this.userService.getUser().pipe(takeUntil(this.unsubscribe)).subscribe((res: any) => {
      this.sellerId = res.data.sellerId;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
