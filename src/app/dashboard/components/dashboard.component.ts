import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../shared/generated/services/user.service";
import {UserDto} from "../../shared/generated/models/user-dto";
import {AuthService} from "../../guard/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {LoginDashboardModel} from "../models/loginDashboardModel.model";
import moment from "moment";
import {Logins} from "../../shared/generated/models/logins";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userLoginDto: UserDto;
  image: any;
  userLogins: Array<LoginDashboardModel> = [];
  userAdministrationDto: Array<UserDto>;
  waitingForResponse = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userLoginDto = this.authService.getUserFromStorage();
    this.mapLogins();
    this.image = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(this.userLoginDto.image) as any).changingThisBreaksApplicationSecurity;
  }

  ngAfterViewInit() {
    this.handleChange({index: 0});
  }

  handleChange(event: any) {
    switch (event.index) {
      case 0: {
        break;
      }
      case 1: {
        this.getOtherUsers();
        break;
      }
      default: {
        break;
      }
    }
  }

  getImage(image: string) {
    return 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(image) as any).changingThisBreaksApplicationSecurity;
  }

  logout() {
    this.userService.logoutUser$Response({body: {email: this.userLoginDto.email}}).pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.authService.logout();
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Logout failed!'});
        }
      })
    ).toPromise().then().catch(err => {
      this.messageService.add({severity:'error', summary: 'Error', detail: err.status + ": " + err.statusText});
    });
  }

  private mapLogins() {
    if (this.userLoginDto.logins != undefined) {
      Object.entries(this.userLoginDto.logins).forEach(([key, value]) => {
        let prefix = key;
        prefix = prefix.replace(/[0-9]/, '');
        let id = key;
        id = id.replace('login', '');
        id = id.replace('logout', '');
        if (prefix == 'login') {
          let tmp = this.userLogins.find(login => login.logoutId == id);
          if (tmp == undefined) {
            let object : LoginDashboardModel = {
              loginId: id,
              from: value.replace('[UTC]', '')
            };
            this.userLogins.push(object);
          } else {
            tmp.from = value.replace('[UTC]', '');
            tmp.loginId = id;
            this.countHoursAndMinutes(tmp);
          }
        }
        if (prefix == 'logout') {
          let tmp = this.userLogins.find(login => login.loginId == id);
          if (tmp == undefined) {
            let object : LoginDashboardModel = {
              logoutId: id,
              to: value.replace('[UTC]', '')
            };
            this.userLogins.push(object);
          } else {
            tmp.to = value.replace('[UTC]', '');
            tmp.logoutId = id;
            this.countHoursAndMinutes(tmp);
          }
        }
      });
      this.userLogins.sort((a, b) => a.loginId < b.loginId ? 1 : -1);
    }
    console.log(this.userLogins);
  }

  countHoursAndMinutes(tmp: LoginDashboardModel) {
    let hours = moment.duration(moment(tmp.to).diff(moment(tmp.from))).asHours();
    if (hours < 1) {
      tmp.numberMinutes = Math.floor(hours * 60);
      tmp.numberHours = 0;
    } else {
      tmp.numberHours = Math.floor(hours);
      tmp.numberMinutes = Math.floor((hours - tmp.numberHours) * 60);
    }
  }

  getOtherUsers() {
    if (this.userAdministrationDto == undefined) {
      this.waitingForResponse = true;
      this.userService.dashboardData$Response().pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.userAdministrationDto = response.body;
            this.waitingForResponse = false;
          } else {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Get users failed!'});
            this.waitingForResponse = false;
          }
        })
      ).toPromise().then().catch(err => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err.status + ": " + err.statusText});
        this.waitingForResponse = false;
      });
    }
  }

  getLastLogin(logins: Logins) {
    if (logins != undefined) {
      let maxLogin = 0;
      let maxLoginTime;
      Object.entries(this.userLoginDto.logins).forEach(([key, value]) => {
        let prefix = key;
        prefix = prefix.replace(/[0-9]/, '');
        let id = key;
        id = id.replace('login', '');
        id = id.replace('logout', '');
        if (prefix === 'login' && parseInt(id) > maxLogin) {
          maxLogin = parseInt(id);
          maxLoginTime = moment(value.replace('[UTC]', ''));
        }
      });
      return maxLoginTime;

    }
  }
}
