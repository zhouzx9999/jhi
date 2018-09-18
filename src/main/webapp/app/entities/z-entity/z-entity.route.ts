import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZEntity } from 'app/shared/model/z-entity.model';
import { ZEntityService } from './z-entity.service';
import { ZEntityComponent } from './z-entity.component';
import { ZEntityDetailComponent } from './z-entity-detail.component';
import { ZEntityUpdateComponent } from './z-entity-update.component';
import { ZEntityDeletePopupComponent } from './z-entity-delete-dialog.component';
import { IZEntity } from 'app/shared/model/z-entity.model';

@Injectable({ providedIn: 'root' })
export class ZEntityResolve implements Resolve<IZEntity> {
    constructor(private service: ZEntityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((zEntity: HttpResponse<ZEntity>) => zEntity.body));
        }
        return of(new ZEntity());
    }
}

export const zEntityRoute: Routes = [
    {
        path: 'z-entity',
        component: ZEntityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'z-entity/:id/view',
        component: ZEntityDetailComponent,
        resolve: {
            zEntity: ZEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'z-entity/new',
        component: ZEntityUpdateComponent,
        resolve: {
            zEntity: ZEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'z-entity/:id/edit',
        component: ZEntityUpdateComponent,
        resolve: {
            zEntity: ZEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const zEntityPopupRoute: Routes = [
    {
        path: 'z-entity/:id/delete',
        component: ZEntityDeletePopupComponent,
        resolve: {
            zEntity: ZEntityResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhiApp.zEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
