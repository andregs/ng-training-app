import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../entity/model';
import { UserService } from '../user.service';

@Component({
  selector: 'mc-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
  ) {
    // empty
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }

  delete(user: User) {
    this.service.delete(user)
      .subscribe(() => {
        this.users = this.users.filter(u => u !== user);
      });
  }

  // test() {
  //   this.service.test(this.user).subscribe(
  //     res => {
  //       console.log('response', res);
  //       const id = res.headers!.get('Location')!.split('/').pop()!;
  //       console.log(res.headers!.get('Location'), id);
  //       this.user.id = +id;
  //     },
  //     err => {
  //       console.error('http error', err);
  //     },
  //   );
  //   return false;
  // }

}
