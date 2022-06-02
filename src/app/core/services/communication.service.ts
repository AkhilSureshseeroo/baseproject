import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { UiLoaderService } from '../components/ui-loader/ui-loader.service';
@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  callStackCount = 0;

  constructor(private http: HttpClient, private uiLoaderService: UiLoaderService) {}

  get<T>(
    apiPath: string,
    loaderText: string = '',
    options: any = null,
    doCache: boolean = false
  ): Observable<T> {
    const showLoader = loaderText ? true : false;
    const cachedResponse = false;
    const httpOptions = {

      headers: new HttpHeaders({

        "Authorization": "Bearer " + options,

      })

    }

    if (doCache && cachedResponse) {
      return of(cachedResponse) as unknown as Observable<T>;
    } else {
      if (showLoader) {
        this.showLoader(loaderText);
      }
      return this.http.get<T>(apiPath, httpOptions  ).pipe(
        tap((response: any) => {
          if (doCache) {
            // this.cacheService.put(apiPath, response as any);
          }
          if (showLoader) {
            this.hideLoader();
          }
        }),
        catchError((error) => {
          if (showLoader) {
            this.hideLoader();
          }
          this.errorMessage(error);
          return throwError(error);
        })
      );
    }
  }

  post<T>(
    apiPath: string,
    data: any,
    loaderText: string = '',
    options: any = null
  ): Observable<T> {
    const showLoader = loaderText ? true : false;
    const httpOptions = {

      headers: new HttpHeaders({

        "Authorization": "Bearer " + options,

      })

    }

    if (showLoader) {
      this.showLoader(loaderText);
    }
    return this.http
      .post<any>(apiPath, data,httpOptions )
      .pipe(
        tap((response: any) => {
          if (showLoader) {
            this.hideLoader();
          }
        }),
        catchError((error) => {
          if (showLoader) {
            this.hideLoader();
          }
          this.errorMessage(error);
          return throwError(error);
        })
      );
  }

  put<T>(
    apiPath: string,
    data: any,
    loaderText: string = '',
    options: any = null
  ): Observable<T> {
    const showLoader = loaderText ? true : false;
    const httpOptions = {

      headers: new HttpHeaders({

        "Authorization": "Bearer " + options,

      })

    }
    if (showLoader) {
      this.showLoader(loaderText);
    }
    return this.http.put<any>(apiPath, data,httpOptions ).pipe(
      tap((response: any) => {
        if (showLoader) {
          this.hideLoader();
        }
      }),
      catchError((error) => {
        if (showLoader) {
          this.hideLoader();
        }
        this.errorMessage(error);
        return throwError(error);
      })
    );
  }

  patch<T>(
    apiPath: string,
    data: any,
    loaderText: string = '',
    options: any = null
  ): Observable<T> {
    const showLoader = loaderText ? true : false;
    const httpOptions = {

      headers: new HttpHeaders({

        "Authorization": "Bearer " + options,

      })

    }
    if (showLoader) {
      this.showLoader(loaderText);
    }
    return this.http
      .patch<any>(apiPath, data,httpOptions )
      .pipe(
        tap((response: any) => {
          if (showLoader) {
            this.hideLoader();
          }
        }),
        catchError((error) => {
          if (showLoader) {
            this.hideLoader();
          }
          this.errorMessage(error);
          return throwError(error);
        })
      );
  }

  delete<T>(
    apiPath: string,
    loaderText: string = '',
    options: any = null
  ): Observable<T> {
    const showLoader = loaderText ? true : false;
    const httpOptions = {

      headers: new HttpHeaders({

        "Authorization": "Bearer " + options,

      })

    }
    if (showLoader) {
      this.showLoader(loaderText);
    }
    return this.http.delete<T>(apiPath,httpOptions).pipe(
      tap((data: T) => {
        if (showLoader) {
          this.hideLoader();
        }
      }),
      catchError((error) => {
        if (showLoader) {
          this.hideLoader();
        }
        this.errorMessage(error);
        return throwError(error);
      })
    );
  }

  /* Private Methods */
  private showLoader(loaderText: string): void {
    if (this.callStackCount === 0) {
      this.uiLoaderService.start(loaderText);
    }
    this.callStackCount++;
}

private hideLoader(): void {
    if (this.callStackCount === 1) {
        this.uiLoaderService.stop();
    }
    if (this.callStackCount > 0) {
        this.callStackCount--;
    }
}

  private errorMessage(message: string): void {
    // alert(JSON.stringify(message));
    console.log(message , "Api Response")
  }
}
