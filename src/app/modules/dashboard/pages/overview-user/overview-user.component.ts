import { Subject } from 'rxjs';
import { Response } from './../../../../shared/models/response.model';
import { DashboardConfigService } from 'src/app/modules/dashboard/services/dashboard-config.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'octo-overview-user',
  templateUrl: './overview-user.component.html',
  styleUrls: ['./overview-user.component.scss']
})
export class OverviewUserComponent implements OnInit, OnDestroy {

  public usersList = [];
  $unsubscribe = new Subject<void>();

  constructor(private dashboardConfigService: DashboardConfigService) { }

  ngOnInit(): void {
    this.dashboardConfigService.getUsers();
    this.dashboardConfigService.$usersList.pipe().subscribe((users: any[]) => {
      this.usersList = users;
    });
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
  }

  lockUser(email: string, lock: boolean): void {
    this.dashboardConfigService.lockUser({ email, lock: !lock }).subscribe((res: Response<{ isLocked: boolean }>) => {
      const selectedUser = this.usersList.find(u => u.email === email);
      selectedUser.isLocked = res.data.isLocked;
    })
  }

  editUser(email: string) {
    alert(email)
  }

  onSelectChange(event: any, email: string) {
    const role = event.target.value;
    this.dashboardConfigService.changeRole({ email, role }).subscribe();
  }

}
