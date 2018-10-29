/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ZVersionService } from 'app/entities/z-version/z-version.service';
import { IZVersion, ZVersion, Zenumer } from 'app/shared/model/z-version.model';

describe('Service Tests', () => {
    describe('ZVersion Service', () => {
        let injector: TestBed;
        let service: ZVersionService;
        let httpMock: HttpTestingController;
        let elemDefault: IZVersion;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ZVersionService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new ZVersion(0, 0, 0, 0, currentDate, Zenumer.COST);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateInUse: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a ZVersion', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateInUse: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateInUse: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new ZVersion(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ZVersion', async () => {
                const returnedFromService = Object.assign(
                    {
                        versionType: 1,
                        accessType: 1,
                        inUse: 1,
                        dateInUse: currentDate.format(DATE_FORMAT),
                        accessType1: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateInUse: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of ZVersion', async () => {
                const returnedFromService = Object.assign(
                    {
                        versionType: 1,
                        accessType: 1,
                        inUse: 1,
                        dateInUse: currentDate.format(DATE_FORMAT),
                        accessType1: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateInUse: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a ZVersion', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
