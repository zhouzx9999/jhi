/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhiTestModule } from '../../../test.module';
import { ZPlanTypeDeleteDialogComponent } from 'app/entities/z-plan-type/z-plan-type-delete-dialog.component';
import { ZPlanTypeService } from 'app/entities/z-plan-type/z-plan-type.service';

describe('Component Tests', () => {
    describe('ZPlanType Management Delete Component', () => {
        let comp: ZPlanTypeDeleteDialogComponent;
        let fixture: ComponentFixture<ZPlanTypeDeleteDialogComponent>;
        let service: ZPlanTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZPlanTypeDeleteDialogComponent]
            })
                .overrideTemplate(ZPlanTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZPlanTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZPlanTypeService);
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
