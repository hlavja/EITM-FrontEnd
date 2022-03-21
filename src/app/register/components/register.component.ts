import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebcamImage} from "ngx-webcam";
import {UserService} from "../../shared/generated/services/user.service";
import {UserRegistrationDto} from "../../shared/generated/models/user-registration-dto";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  disableSubmitButton$:BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  registerFrom: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: [],
    lastName: []
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
    return this.registerFrom.controls;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.subscription.forEach(sub => sub.unsubscribe);
  }

  onSubmit(){
    this.trigger.next();
    this.submitted = true;
    if (this.registerFrom.valid) {
      this.showError = false;
      this.showLoading = true;
      this.register();
    } else {
      this.submitted = false;
      this.showError = true;
      this.errorMessage = "Need to fill form!"
    }
  }

  register(): void {
    console.log(this.webcamImage.imageAsBase64);
    let newUser: UserRegistrationDto = {
      email: this.registerFrom.get('email').value,
      firstName: this.registerFrom.get('firstName').value,
      lastName: this.registerFrom.get('lastName').value,
      image: this.webcamImage.imageAsBase64
    }
    this.userService.registerUser$Response({body: newUser}).toPromise().then( response => {
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
