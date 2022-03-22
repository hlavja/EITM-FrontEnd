import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../shared/generated/services/user.service";
import {UserDto} from "../../shared/generated/models/user-dto";
import {AuthService} from "../../guard/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userLoginDto: UserDto;
  image: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userLoginDto = this.authService.getUserFromStorage();
    console.log(this.userLoginDto.logins);
    this.image = 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(this.userLoginDto.image) as any).changingThisBreaksApplicationSecurity;
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
}
