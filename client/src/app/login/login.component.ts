import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/user.service';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: any;
  usermongoID: any;
  userId: any;
  userInvalid: any;
  constructor( private router: Router , public userService: UsersService, public roleService: RolesService) {

   }

  ngOnInit() {
    this.onlogout();
  }

  onCheckLogin(form: NgForm) {

    console.log(form.value);

    if (form.invalid) {
      return;
    }

    this.userService.userLogin(form.value).subscribe(userdata => {
      console.log(userdata);
      this.user = userdata.user;
      if (this.user.status == true) {
        this.userId = this.user.data._id;
        localStorage.setItem('currentUser', JSON.stringify(this.user.data));
        localStorage.setItem('currUserID', this.user.data._id);

        this.roleService.getById(this.user.data.role).subscribe(roleDetail => {
          localStorage.setItem('role', JSON.stringify(roleDetail.data));
          localStorage.setItem('permissions', JSON.stringify(roleDetail.data.permissions));
        });

        this.router.navigate(['/select-application']);
      } else {
        this.userInvalid = true;
      }
      console.log('user logged in ');
    });

    form.resetForm();
    return;
  }

  onlogout() {
    localStorage.clear();
  }
}
