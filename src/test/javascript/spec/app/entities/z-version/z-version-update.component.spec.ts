/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhiTestModule } from '../../../test.module';
import { ZVersionUpdateComponent } from 'app/entities/z-version/z-version-update.component';
import { ZVersionService } from 'app/entities/z-version/z-version.service';
import { ZVersion } from 'app/shared/model/z-version.model';

describe('Component Tests', () => {
    describe('ZVersion Management Update Component', () => {
        let comp: ZVersionUpdateComponent;
        let fixture: ComponentFixture<ZVersionUpdateComponent>;
        let service: ZVersionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZVersionUpdateComponent]
            })
                .overrideTemplate(ZVersionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ZVersionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZVersionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ZVersion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zVersion = entity;
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
                    const entity = new ZVersion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.zVersion = entity;
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
