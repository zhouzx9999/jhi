import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IZEntity } from 'app/shared/model/z-entity.model';

type EntityResponseType = HttpResponse<IZEntity>;
type EntityArrayResponseType = HttpResponse<IZEntity[]>;

@Injectable({ providedIn: 'root' })
export class ZEntityService {
    private resourceUrl = SERVER_API_URL + 'api/z-entities';

    constructor(private http: HttpClient) {}

    create(zEntity: IZEntity): Observable<EntityResponseType> {
        return this.http.post<IZEntity>(this.resourceUrl, zEntity, { observe: 'response' });
    }

    update(zEntity: IZEntity): Observable<EntityResponseType> {
        return this.http.put<IZEntity>(this.resourceUrl, zEntity, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IZEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IZEntity[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
