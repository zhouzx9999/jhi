import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZVersion } from 'app/shared/model/z-version.model';
import { ZVersionService } from './z-version.service';
import { ZVersionComponent } from './z-version.component';
import { ZVersionDetailComponent } from './z-version-detail.component';
import { ZVersionUpdateComponent } from './z-version-update.component';
import { ZVersionDeletePopupComponent } from './z-version-delete-dialog.component';
import { IZVersion } from 'app/shared/model/z-version.model';

@Injectable({ providedIn: 'root' })
export class ZVersionResolve implements Resolve<IZVersion> {
    constructor(private service: ZVersionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((zVersion: HttpResponse<ZVersion>) => zVersion.body));
        }
        return of(new ZVersion());
    }
}

export const zVersionRoute: Routes = [
    {
        path: 'z-version',
        component: ZVersionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zVersion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'z-version/:id/view',
        component: ZVersionDetailComponent,
        resolve: {
            zVersion: ZVersionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zVersion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'z-version/new',
        component: ZVersionUpdateComponent,
        resolve: {
            zVersion: ZVersionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zVersion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'z-version/:id/edit',
        component: ZVersionUpdateComponent,
        resolve: {
            zVersion: ZVersionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zVersion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const zVersionPopupRoute: Routes = [
    {
        path: 'z-version/:id/delete',
        component: ZVersionDeletePopupComponent,
        resolve: {
            zVersion: ZVersionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zVersion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
