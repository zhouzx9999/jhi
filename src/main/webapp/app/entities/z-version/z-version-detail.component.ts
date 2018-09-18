import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IZVersion } from 'app/shared/model/z-version.model';

@Component({
    selector: 'jhi-z-version-detail',
    templateUrl: './z-version-detail.component.html'
})
export class ZVersionDetailComponent implements OnInit {
    zVersion: IZVersion;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zVersion }) => {
            this.zVersion = zVersion;
        });
    }

    previousState() {
        window.history.back();
    }
}
