import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IZPlanType } from 'app/shared/model/z-plan-type.model';

type EntityResponseType = HttpResponse<IZPlanType>;
type EntityArrayResponseType = HttpResponse<IZPlanType[]>;

@Injectable({ providedIn: 'root' })
export class ZPlanTypeService {
    private resourceUrl = SERVER_API_URL + 'api/z-plan-types';

    constructor(private http: HttpClient) {}

    create(zPlanType: IZPlanType): Observable<EntityResponseType> {
        return this.http.post<IZPlanType>(this.resourceUrl, zPlanType, { observe: 'response' });
    }

    update(zPlanType: IZPlanType): Observable<EntityResponseType> {
        return this.http.put<IZPlanType>(this.resourceUrl, zPlanType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IZPlanType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IZPlanType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
