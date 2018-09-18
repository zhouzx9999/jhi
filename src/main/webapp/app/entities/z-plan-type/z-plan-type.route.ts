import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZPlanType } from 'app/shared/model/z-plan-type.model';
import { ZPlanTypeService } from './z-plan-type.service';
import { ZPlanTypeComponent } from './z-plan-type.component';
import { ZPlanTypeDetailComponent } from './z-plan-type-detail.component';
import { ZPlanTypeUpdateComponent } from './z-plan-type-update.component';
import { ZPlanTypeDeletePopupComponent } from './z-plan-type-delete-dialog.component';
import { IZPlanType } from 'app/shared/model/z-plan-type.model';

@Injectable({ providedIn: 'root' })
export class ZPlanTypeResolve implements Resolve<IZPlanType> {
    constructor(private service: ZPlanTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((zPlanType: HttpResponse<ZPlanType>) => zPlanType.body));
        }
        return of(new ZPlanType());
    }
}

export const zPlanTypeRoute: Routes = [
    {
        path: 'z-plan-type',
        component: ZPlanTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zPlanType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'z-plan-type/:id/view',
        component: ZPlanTypeDetailComponent,
        resolve: {
            zPlanType: ZPlanTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zPlanType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'z-plan-type/new',
        component: ZPlanTypeUpdateComponent,
        resolve: {
            zPlanType: ZPlanTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zPlanType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'z-plan-type/:id/edit',
        component: ZPlanTypeUpdateComponent,
        resolve: {
            zPlanType: ZPlanTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zPlanType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const zPlanTypePopupRoute: Routes = [
    {
        path: 'z-plan-type/:id/delete',
        component: ZPlanTypeDeletePopupComponent,
        resolve: {
            zPlanType: ZPlanTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zPlanType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
