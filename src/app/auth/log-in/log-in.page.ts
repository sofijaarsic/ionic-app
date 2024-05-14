import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

//TODO Navigacija sa login na register i obrnuto
//TODO dodati cekalice (spiner ili loader) tokom trajanja registracije
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onLogIn(logInForm: NgForm) {
    console.log(logInForm);
    if (logInForm.valid) {
      this.authService.logIn(logInForm.value).subscribe({
        next: (resData) => {
          this.router.navigateByUrl('/quotes/tabs/explore');
        },
        error: async (errRes) => {
          let message = 'Incorrect email or password';

          const alert = await this.alertCtrl.create({
            header: 'Authentication failed',
            message,
            buttons: ['Okay'],
          });
          await alert.present();
          logInForm.reset();
        },
      });
    }
  }
}
