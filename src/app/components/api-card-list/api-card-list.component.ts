import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { PageEvent } from '@angular/material/paginator';
import { switchMap, tap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { SpinnerService } from '../../services/spinner/spinner.service';
import {
  IApiListData,
  IApiSummary,
  ISearchCriteria,
  ISearchResult,
} from '../../interfaces/ICommunication';

@Component({
  selector: 'app-api-card-list',
  templateUrl: './api-card-list.component.html',
  styleUrls: ['./api-card-list.component.scss'],
})
export class ApiCardListComponent implements OnInit {
  apis: IApiSummary[] = [];
  totalSize = 0;
  ready = false;
  searchCriteria: ISearchCriteria = {
    filters: [
      {
        name: 'name',
        value: '*',
        operator: 'like',
      },
    ],
    paging: {
      page: 1,
      pageSize: 8,
    },
  };

  @Input() listType = '';

  constructor(
    public apiService: ApiService,
    public loadingSpinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.apis = [];
    if (this.listType === 'api') {
      this.getApiList();
    } else if (this.listType === 'featuredApi') {
      this.getFeaturedApis();
    }
  }

  OnInput(event: any): void {
    this.searchCriteria.paging.page = 1;
    this.searchCriteria.filters[0].value = '*' + event.target.value + '*';
    this.getApiList();
  }

  OnPageChange(event: PageEvent): void {
    this.searchCriteria.paging.page = event.pageIndex + 1;
    this.searchCriteria.paging.pageSize = event.pageSize;
    this.getApiList();
  }

  getApiList(): void {
    const docsAvailable: Array<Observable<boolean>> = [];
    const result: ISearchResult = { apis: [], totalSize: 0 };

    this.loadingSpinnerService.startWaiting();
    this.ready = false;

    this.apiService
      .searchApis(this.searchCriteria)
      .pipe(
        // switch from SearchResultsBeanApiSummaryBean to ISearchResult
        switchMap((searchResult) => {
          result.apis = searchResult.beans;
          result.totalSize = searchResult.totalSize;
          return of(result);
        }),
        tap((searchResult) => {
          // Check API docs for every API
          searchResult.apis.forEach((api) => {
            docsAvailable.push(this.checkApiDocs(api));
          });
          // Set docsAvailable once every Request has finished
          forkJoin(docsAvailable).subscribe((result) => {
            result.forEach((eachResult, index) => {
              searchResult.apis[index].docsAvailable = eachResult;
            });
            this.loadingSpinnerService.stopWaiting();
            this.ready = true;
          });
        })
      )
      .subscribe((searchResult) => {
        this.apis = searchResult.apis;
        this.totalSize = searchResult.totalSize;
      });
  }

  checkApiDocs(api: IApiListData): Observable<boolean> {
    return this.apiService.getLatestApiVersion(api.organizationId, api.id).pipe(
      tap((apiVersion) => (api.latestVersion = apiVersion.version)),
      switchMap((apiVersion) => {
        return of(
          apiVersion.status === 'Published' &&
            apiVersion.definitionType !== null &&
            apiVersion.definitionType !== 'None'
        );
      })
    );
  }

  getFeaturedApis(): void {
    this.apiService
      .getFeaturedApis(this.searchCriteria)
      .subscribe((searchResult) => {
        this.apis = searchResult.beans;
      });
  }
}
