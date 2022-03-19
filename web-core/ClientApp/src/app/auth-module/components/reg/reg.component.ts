import { Component } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
    selector: 'app-reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

    constructor() { }

    public ngOnInit(): void {
      let nib: number = 0;
      nib = 1;
    }
}
