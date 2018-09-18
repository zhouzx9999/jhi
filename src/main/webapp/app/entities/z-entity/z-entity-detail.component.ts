import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IZEntity } from 'app/shared/model/z-entity.model';

@Component({
    selector: 'jhi-z-entity-detail',
    templateUrl: './z-entity-detail.component.html'
})
export class ZEntityDetailComponent implements OnInit {
    zEntity: IZEntity;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zEntity }) => {
            this.zEntity = zEntity;
        });
    }

    previousState() {
        window.history.back();
    }
}
