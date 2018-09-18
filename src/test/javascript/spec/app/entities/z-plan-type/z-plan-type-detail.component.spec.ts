/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhiTestModule } from '../../../test.module';
import { ZPlanTypeDetailComponent } from 'app/entities/z-plan-type/z-plan-type-detail.component';
import { ZPlanType } from 'app/shared/model/z-plan-type.model';

describe('Component Tests', () => {
    describe('ZPlanType Management Detail Component', () => {
        let comp: ZPlanTypeDetailComponent;
        let fixture: ComponentFixture<ZPlanTypeDetailComponent>;
        const route = ({ data: of({ zPlanType: new ZPlanType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZPlanTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ZPlanTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZPlanTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.zPlanType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
