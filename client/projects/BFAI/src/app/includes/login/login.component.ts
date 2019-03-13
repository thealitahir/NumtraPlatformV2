import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSourceService } from '../../services/data-source.service';

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
  constructor( private router: Router , public dataSourceService: DataSourceService) { }

  ngOnInit() {
    // reset login status
    this.onlogout();
  }
  onCheckLogin(form: NgForm) {

    console.log(form.value);

    if (form.invalid) {
      return;
    }

    this.dataSourceService.userLogin(form.value).subscribe(datasource => {
      console.log('userlogin response');
      console.log(datasource._body);
      this.user = JSON.parse(datasource._body);
      if (this.user.status === true) {
        this.userId = this.user.data.mongo_id;
        localStorage.setItem('currentUser', JSON.stringify(this.user.data));
        localStorage.setItem('currUserID', JSON.stringify(this.user.data.mongo_id));
        this.router.navigate(['/data-source']);
      } else {
        this.userInvalid = true;
      }
    });

    form.resetForm();

   // this.router.navigate(['/dashboard']);
    return;
      // alert(form.value.password);
  }

  onlogout() {
    localStorage.removeItem('currentUser');
  }
}
