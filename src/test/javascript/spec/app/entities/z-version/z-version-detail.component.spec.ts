/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhiTestModule } from '../../../test.module';
import { ZVersionDetailComponent } from 'app/entities/z-version/z-version-detail.component';
import { ZVersion } from 'app/shared/model/z-version.model';

describe('Component Tests', () => {
    describe('ZVersion Management Detail Component', () => {
        let comp: ZVersionDetailComponent;
        let fixture: ComponentFixture<ZVersionDetailComponent>;
        const route = ({ data: of({ zVersion: new ZVersion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZVersionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ZVersionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ZVersionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.zVersion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
