/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhiTestModule } from '../../../test.module';
import { ZPlanTypeComponent } from 'app/entities/z-plan-type/z-plan-type.component';
import { ZPlanTypeService } from 'app/entities/z-plan-type/z-plan-type.service';
import { ZPlanType } from 'app/shared/model/z-plan-type.model';

describe('Component Tests', () => {
    describe('ZPlanType Management Component', () => {
        let comp: ZPlanTypeComponent;
        let fixture: ComponentFixture<ZPlanTypeComponent>;
        let service: ZPlanTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZPlanTypeComponent],
                providers: []
            })
                .overrideTemplate(ZPlanTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ZPlanTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZPlanTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ZPlanType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.zPlanTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
