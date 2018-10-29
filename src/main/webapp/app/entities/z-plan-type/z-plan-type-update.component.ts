import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IZPlanType } from 'app/shared/model/z-plan-type.model';
import { ZPlanTypeService } from './z-plan-type.service';

@Component({
    selector: 'jhi-z-plan-type-update',
    templateUrl: './z-plan-type-update.component.html'
})
export class ZPlanTypeUpdateComponent implements OnInit {
    zPlanType: IZPlanType;
    isSaving: boolean;

    constructor(private zPlanTypeService: ZPlanTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ zPlanType }) => {
            this.zPlanType = zPlanType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.zPlanType.id !== undefined) {
            this.subscribeToSaveResponse(this.zPlanTypeService.update(this.zPlanType));
        } else {
            this.subscribeToSaveResponse(this.zPlanTypeService.create(this.zPlanType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IZPlanType>>) {
        result.subscribe((res: HttpResponse<IZPlanType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
