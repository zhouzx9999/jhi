/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhiTestModule } from '../../../test.module';
import { ZVersionDeleteDialogComponent } from 'app/entities/z-version/z-version-delete-dialog.component';
import { ZVersionService } from 'app/entities/z-version/z-version.service';

describe('Component Tests', () => {
    describe('ZVersion Management Delete Component', () => {
        let comp: ZVersionDeleteDialogComponent;
        let fixture: ComponentFixture<ZVersionDeleteDialogComponent>;
        let service: ZVersionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZVersionDeleteDialogComponent]
            })
                .overrideTemplate(ZVersionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZVersionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZVersionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
