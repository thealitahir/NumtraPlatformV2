import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  constructor( private router: Router ) { }

  onCheckLogin(form: NgForm) {

    console.log(form.value);

    if (form.invalid) {
      return;
    }

    form.resetForm();

    this.router.navigate(['/dashboard']);
    return;
      // alert(form.value.password);
  }

}
