import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IZVersion } from 'app/shared/model/z-version.model';

type EntityResponseType = HttpResponse<IZVersion>;
type EntityArrayResponseType = HttpResponse<IZVersion[]>;

@Injectable({ providedIn: 'root' })
export class ZVersionService {
    private resourceUrl = SERVER_API_URL + 'api/z-versions';

    constructor(private http: HttpClient) {}

    create(zVersion: IZVersion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(zVersion);
        return this.http
            .post<IZVersion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(zVersion: IZVersion): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(zVersion);
        return this.http
            .put<IZVersion>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IZVersion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IZVersion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(zVersion: IZVersion): IZVersion {
        const copy: IZVersion = Object.assign({}, zVersion, {
            dateInUse: zVersion.dateInUse != null && zVersion.dateInUse.isValid() ? zVersion.dateInUse.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateInUse = res.body.dateInUse != null ? moment(res.body.dateInUse) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((zVersion: IZVersion) => {
            zVersion.dateInUse = zVersion.dateInUse != null ? moment(zVersion.dateInUse) : null;
        });
        return res;
    }
}
