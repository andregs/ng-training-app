import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../../../entity/model';

@Component({
  selector: 'mc-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  user: User;

  @ViewChild('userForm') form: NgForm;

  @ViewChild('userId') id: NgModel;
  @ViewChild('admin') admin: NgModel;
  @ViewChild('email') email: NgModel;
  @ViewChild('firstName') firstName: NgModel;
  @ViewChild('lastName') lastName: NgModel;
  @ViewChild('birthdate') birthdate: NgModel;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // empty
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  validationClasses(model: NgModel) {
    return {
      'has-success': model.dirty && model.valid,
      'has-danger': model.dirty && model.invalid,
    };
  }

  onSubmit() {
    if (this.form.invalid) return false;
    this.service.save(this.user).subscribe(
      () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    );
  }

}
