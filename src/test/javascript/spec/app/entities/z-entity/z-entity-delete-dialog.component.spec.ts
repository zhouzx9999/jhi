/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhiTestModule } from '../../../test.module';
import { ZEntityDeleteDialogComponent } from 'app/entities/z-entity/z-entity-delete-dialog.component';
import { ZEntityService } from 'app/entities/z-entity/z-entity.service';

describe('Component Tests', () => {
    describe('ZEntity Management Delete Component', () => {
        let comp: ZEntityDeleteDialogComponent;
        let fixture: ComponentFixture<ZEntityDeleteDialogComponent>;
        let service: ZEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZEntityDeleteDialogComponent]
            })
                .overrideTemplate(ZEntityDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZEntityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZEntityService);
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
