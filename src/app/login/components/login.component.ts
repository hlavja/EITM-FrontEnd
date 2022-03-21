import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import {UserService} from "../../shared/generated/services/user.service";
import {UserLoginDto} from "../../shared/generated/models/user-login-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  disableSubmitButton$:BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });
  submitted: boolean;
  subscription: Subscription[] = [];
  showError = false;
  showLoading = false;
  errorMessage: string;
  trigger: Subject<void> = new Subject<void>();
  webcamImage: WebcamImage;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.subscription[0] = this.disableSubmitButton$.subscribe(submitted => this.submitted = submitted);
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.subscription.forEach(sub => sub.unsubscribe);
  }

  onSubmit(){
    this.trigger.next();
    this.submitted = true;
    if (this.loginForm.valid) {
      this.showError = false;
      this.showLoading = true;
      this.login();
    } else {
      this.submitted = false;
      this.showError = true;
      this.errorMessage = "Need to fill form!"
    }
  }

  login(): void {
    console.log(this.webcamImage.imageAsBase64);
    let loginUser: UserLoginDto = {
      email: this.loginForm.get('email').value,
      image: this.webcamImage.imageAsBase64
    }
    this.userService.registerUser$Response({body: loginUser}).toPromise().then( response => {
      if (response.status === 200) {
        this.showLoading = false;
      } else {
        this.showLoading = false;
      }
    }).catch(err => {
      this.showLoading = false;
    });

  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

}
