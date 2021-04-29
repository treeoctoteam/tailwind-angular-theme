import { User } from './../../../../core/services/auth.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subject } from 'rxjs';
import { Response } from './../../../../shared/models/response.model';
import { DashboardConfigService } from 'src/app/modules/dashboard/services/dashboard-config.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

interface IUserManagement {
  user: User;
  options: {
    edit: boolean,
    editUsername: boolean,
    editEmail: boolean
  }
}


@Component({
  selector: 'octo-overview-user',
  templateUrl: './overview-user.component.html',
  styleUrls: ['./overview-user.component.scss']
})

export class OverviewUserComponent implements OnInit, OnDestroy {

  public usersList = [];
  public isAdmin = false;
  public isEditingMode = false;
  public currentUserEmail = ''

  public userManagement: IUserManagement[] = [];

  $unsubscribe = new Subject<void>();

  constructor(private dashboardConfigService: DashboardConfigService, private authService: AuthService) { }

  ngOnInit(): void {
    this.dashboardConfigService.getUsers();
    this.dashboardConfigService.$usersList.pipe().subscribe((users: any[]) => {
      this.usersList = users;
      users.forEach((user: User) => {
        this.userManagement.push({ user, options: { edit: false, editEmail: false, editUsername: false } });
      })
    });
    this.isAdmin = this.authService.user.role === 'admin' ? true : false;
    this.currentUserEmail = this.authService.user.email;
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

  activateEdit(um: IUserManagement) {

    if (this.isAdmin) {
      um.options.edit = true;
      um.options.editUsername = true;
      um.options.editEmail = true;
    }
    else if (!this.isAdmin && this.currentUserEmail === um.user.email) {
      um.options.edit = true;
      um.options.editUsername = true;
    }
  }

  editUser(um: IUserManagement) {

    this.dashboardConfigService.updateUser(um.user.email, um.user.username);
    um.options.edit = false;
    um.options.editEmail = false;
    um.options.editUsername = false;

  }

  onSelectChange(event: any, email: string) {
    const role = event.target.value;
    this.dashboardConfigService.changeRole({ email, role }).subscribe();
  }

  resetPassword(email: string) {
    this.dashboardConfigService.resetPaswword(email).subscribe();
  }

}
