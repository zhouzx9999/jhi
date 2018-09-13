/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhiTestModule } from '../../../test.module';
import { ZEntityUpdateComponent } from 'app/entities/z-entity/z-entity-update.component';
import { ZEntityService } from 'app/entities/z-entity/z-entity.service';
import { ZEntity } from 'app/shared/model/z-entity.model';

describe('Component Tests', () => {
    describe('ZEntity Management Update Component', () => {
        let comp: ZEntityUpdateComponent;
        let fixture: ComponentFixture<ZEntityUpdateComponent>;
        let service: ZEntityService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZEntityUpdateComponent]
            })
                .overrideTemplate(ZEntityUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ZEntityUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZEntityService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ZEntity(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zEntity = entity;
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
                    const entity = new ZEntity();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zEntity = entity;
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
