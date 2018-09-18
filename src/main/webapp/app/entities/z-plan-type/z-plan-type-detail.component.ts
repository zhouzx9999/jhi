import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IZPlanType } from 'app/shared/model/z-plan-type.model';

@Component({
    selector: 'jhi-z-plan-type-detail',
    templateUrl: './z-plan-type-detail.component.html'
})
export class ZPlanTypeDetailComponent implements OnInit {
    zPlanType: IZPlanType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zPlanType }) => {
            this.zPlanType = zPlanType;
        });
    }

    previousState() {
        window.history.back();
    }
}
