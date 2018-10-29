import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IZVersion } from 'app/shared/model/z-version.model';
import { ZVersionService } from './z-version.service';

@Component({
    selector: 'jhi-z-version-update',
    templateUrl: './z-version-update.component.html'
})
export class ZVersionUpdateComponent implements OnInit {
    zVersion: IZVersion;
    isSaving: boolean;
    dateInUseDp: any;

    constructor(private zVersionService: ZVersionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ zVersion }) => {
            this.zVersion = zVersion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.zVersion.id !== undefined) {
            this.subscribeToSaveResponse(this.zVersionService.update(this.zVersion));
        } else {
            this.subscribeToSaveResponse(this.zVersionService.create(this.zVersion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IZVersion>>) {
        result.subscribe((res: HttpResponse<IZVersion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
