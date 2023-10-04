import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ArmyType} from "../../shared/models/system/armyType";
import {distinct, map, shareReplay} from "rxjs/operators";
import {of} from "rxjs";
import {Area} from "../../shared/models/system/area";
import {Vacancy} from "../../shared/models/vacancy/vacancy";
import {vacancyParams} from "./params";
import {IPagination} from "../../shared/helpers/pagination";
import {ArmyRegion} from "../../shared/models/system/armyRegion";
import {IResponse} from "../../shared/models/common/response";
import {AppConfigService} from "../../shared/services/app.config.service";

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  armyTypes: ArmyType[] = [];
  areas: Area[] = [];
  armyRegions: ArmyRegion[] = [];
  positionId:number = 0
  vacancies: Vacancy[] = [];
  vacancyParams = new vacancyParams();
  //@ts-ignore
  pagination: IPagination<Vacancy>;
  baseApiUrl: string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  getArmyTypes() {
    if (this.armyTypes.length > 0) {
      return of(this.armyTypes);
    }
    return this.http.get<ArmyType[]>(this.baseApiUrl + "/armyType/getAll").pipe(
      map(response => {
        //@ts-ignore
        this.armyTypes = response.data
        //@ts-ignore
        return response.data
      }),
      distinct(),
      shareReplay()
    );
  }

  getAreas() {
    if (this.areas.length > 0) {
      return of(this.areas)
    }

    return this.http.get<Area[]>(this.baseApiUrl + "/area/getAll").pipe(
      map(response => {
        //@ts-ignore
        this.areas = response.data
        //@ts-ignore
        return response.data
      }),
      distinct(),
      shareReplay()
    )
  }

  getArmyRegions() {
    if (this.armyRegions.length > 0) {
      return of(this.armyRegions)
    }

    return this.http.get<ArmyRegion[]>(this.baseApiUrl + "/ArmyRegion/All").pipe(
      map(response => {
        //@ts-ignore
        this.armyRegions = response.data
        //@ts-ignore
        return response.data
      }),
      distinct(),
      shareReplay()
    )
  }

  getVacancies(useCache: boolean) {
    if (!useCache) {
      this.vacancies = []
    }

    if (this.vacancies.length > 0 && useCache) {
      const pagesReceived = Math.ceil(this.vacancies.length / this.vacancyParams.pageSize);

      if (this.vacancyParams.pageIndex <= pagesReceived) {
        this.pagination.data =
          this.vacancies.slice((this.vacancyParams.pageIndex - 1) * this.vacancyParams.pageSize,
            this.vacancyParams.pageIndex * this.vacancyParams.pageSize);

        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.vacancyParams.armyTypeId.length > 0) {
      this.vacancyParams.armyTypeId.forEach((val) => {
        params = params.append('armyTypeId', val.toString());
      })
    }

    if (this.vacancyParams.area.length > 0) {
      this.vacancyParams.area.forEach((val) => {
        params = params.append('areaId', val.toString());
      })
    }

    if (this.vacancyParams.armyRegionId.length > 0) {
      this.vacancyParams.armyRegionId.forEach((val) => {
        params = params.append('armyRegionId', val.toString());
      })
    }

    if (this.vacancyParams.positionId !== 0) {
      params = params.append("positionId", this.vacancyParams.positionId.toString())
    }

    if (this.vacancyParams.search) {
      params = params.append('search', this.vacancyParams.search);
    }

    params = params.append('pageIndex', this.vacancyParams.pageIndex.toString());
    params = params.append('pageSize', this.vacancyParams.pageSize.toString());

    return this.http.get<IPagination<Vacancy>>(this.baseApiUrl + '/vacancy/all', { observe: 'response', params })
      .pipe(
        map(response => {
          // @ts-ignore
          this.vacancies = [...this.vacancies, ...response.body.data];
          // @ts-ignore
          this.pagination = response.body;
          return this.pagination;
        }),
        distinct(),
        shareReplay()
      );
  }

  getVacancyById(id: number) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<IResponse<Vacancy>>(this.baseApiUrl + '/vacancy/get', {observe: 'response', params})
      .pipe(
        map(response => {
          return response
        }),
        distinct(),
        shareReplay()
      )
  }

  getVacancyParams() {
    return this.vacancyParams;
  }

  setVacancyParams(params: vacancyParams) {
    this.vacancyParams = params;
  }
}
