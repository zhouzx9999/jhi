/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhiTestModule } from '../../../test.module';
import { ZVersionComponent } from 'app/entities/z-version/z-version.component';
import { ZVersionService } from 'app/entities/z-version/z-version.service';
import { ZVersion } from 'app/shared/model/z-version.model';

describe('Component Tests', () => {
    describe('ZVersion Management Component', () => {
        let comp: ZVersionComponent;
        let fixture: ComponentFixture<ZVersionComponent>;
        let service: ZVersionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhiTestModule],
                declarations: [ZVersionComponent],
                providers: []
            })
                .overrideTemplate(ZVersionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ZVersionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZVersionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ZVersion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.zVersions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
