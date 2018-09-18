import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IZVersion } from 'app/shared/model/z-version.model';
import { Principal } from 'app/core';
import { ZVersionService } from './z-version.service';

@Component({
    selector: 'jhi-z-version',
    templateUrl: './z-version.component.html'
})
export class ZVersionComponent implements OnInit, OnDestroy {
    zVersions: IZVersion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private zVersionService: ZVersionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.zVersionService.query().subscribe(
            (res: HttpResponse<IZVersion[]>) => {
                this.zVersions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInZVersions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IZVersion) {
        return item.id;
    }

    registerChangeInZVersions() {
        this.eventSubscriber = this.eventManager.subscribe('zVersionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
