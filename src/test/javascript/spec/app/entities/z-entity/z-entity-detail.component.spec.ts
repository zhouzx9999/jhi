/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhiTestModule } from '../../../test.module';
import { ZEntityDetailComponent } from 'app/entities/z-entity/z-entity-detail.component';
import { ZEntity } from 'app/shared/model/z-entity.model';

describe('Component Tests', () => {
    describe('ZEntity Management Detail Component', () => {
        let comp: ZEntityDetailComponent;
        let fixture: ComponentFixture<ZEntityDetailComponent>;
        const route = ({ data: of({ zEntity: new ZEntity(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZEntityDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ZEntityDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZEntityDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.zEntity).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
