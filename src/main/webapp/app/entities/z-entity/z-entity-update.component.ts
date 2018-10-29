import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IZEntity } from 'app/shared/model/z-entity.model';
import { ZEntityService } from './z-entity.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-z-entity-update',
    templateUrl: './z-entity-update.component.html'
})
export class ZEntityUpdateComponent implements OnInit {
    zEntity: IZEntity;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private zEntityService: ZEntityService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ zEntity }) => {
            this.zEntity = zEntity;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.zEntity.id !== undefined) {
            this.subscribeToSaveResponse(this.zEntityService.update(this.zEntity));
        } else {
            this.subscribeToSaveResponse(this.zEntityService.create(this.zEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IZEntity>>) {
        result.subscribe((res: HttpResponse<IZEntity>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
