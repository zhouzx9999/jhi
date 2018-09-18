import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IZEntity } from 'app/shared/model/z-entity.model';
import { ZEntityService } from './z-entity.service';

@Component({
    selector: 'jhi-z-entity-delete-dialog',
    templateUrl: './z-entity-delete-dialog.component.html'
})
export class ZEntityDeleteDialogComponent {
    zEntity: IZEntity;

    constructor(private zEntityService: ZEntityService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.zEntityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'zEntityListModification',
                content: 'Deleted an zEntity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-z-entity-delete-popup',
    template: ''
})
export class ZEntityDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zEntity }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ZEntityDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.zEntity = zEntity;
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
