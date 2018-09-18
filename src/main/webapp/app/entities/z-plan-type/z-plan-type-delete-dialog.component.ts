import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IZPlanType } from 'app/shared/model/z-plan-type.model';
import { ZPlanTypeService } from './z-plan-type.service';

@Component({
    selector: 'jhi-z-plan-type-delete-dialog',
    templateUrl: './z-plan-type-delete-dialog.component.html'
})
export class ZPlanTypeDeleteDialogComponent {
    zPlanType: IZPlanType;

    constructor(private zPlanTypeService: ZPlanTypeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.zPlanTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'zPlanTypeListModification',
                content: 'Deleted an zPlanType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-z-plan-type-delete-popup',
    template: ''
})
export class ZPlanTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zPlanType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ZPlanTypeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.zPlanType = zPlanType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
