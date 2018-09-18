import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IZPlanType } from 'app/shared/model/z-plan-type.model';
import { Principal } from 'app/core';
import { ZPlanTypeService } from './z-plan-type.service';

@Component({
    selector: 'jhi-z-plan-type',
    templateUrl: './z-plan-type.component.html'
})
export class ZPlanTypeComponent implements OnInit, OnDestroy {
    zPlanTypes: IZPlanType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private zPlanTypeService: ZPlanTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.zPlanTypeService.query().subscribe(
            (res: HttpResponse<IZPlanType[]>) => {
                this.zPlanTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInZPlanTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IZPlanType) {
        return item.id;
    }

    registerChangeInZPlanTypes() {
        this.eventSubscriber = this.eventManager.subscribe('zPlanTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
