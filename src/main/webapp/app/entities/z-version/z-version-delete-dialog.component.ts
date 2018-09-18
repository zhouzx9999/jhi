import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IZVersion } from 'app/shared/model/z-version.model';
import { ZVersionService } from './z-version.service';

@Component({
    selector: 'jhi-z-version-delete-dialog',
    templateUrl: './z-version-delete-dialog.component.html'
})
export class ZVersionDeleteDialogComponent {
    zVersion: IZVersion;

    constructor(private zVersionService: ZVersionService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.zVersionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'zVersionListModification',
                content: 'Deleted an zVersion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-z-version-delete-popup',
    template: ''
})
export class ZVersionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zVersion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ZVersionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.zVersion = zVersion;
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
