/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhiTestModule } from '../../../test.module';
import { ZPlanTypeUpdateComponent } from 'app/entities/z-plan-type/z-plan-type-update.component';
import { ZPlanTypeService } from 'app/entities/z-plan-type/z-plan-type.service';
import { ZPlanType } from 'app/shared/model/z-plan-type.model';

describe('Component Tests', () => {
    describe('ZPlanType Management Update Component', () => {
        let comp: ZPlanTypeUpdateComponent;
        let fixture: ComponentFixture<ZPlanTypeUpdateComponent>;
        let service: ZPlanTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZPlanTypeUpdateComponent]
            })
                .overrideTemplate(ZPlanTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ZPlanTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZPlanTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ZPlanType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zPlanType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ZPlanType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zPlanType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
