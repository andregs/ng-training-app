import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mc-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  kind: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    // empty
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => this.kind = data.kind,
    );
  }

}
