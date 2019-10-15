import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ResponseHttpInterceptor implements HttpInterceptor {

    constructor(
        private snackBar: MatSnackBar,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse) {
                let message = "Ha ocurrido un error inesperado";
                if (err.error.descripcion != null && err.error.descripcion != "")
                    message = err.error.descripcion;

                this.snackBar.open(message, 'Cerrar', {
                    duration: 2000,
                  });
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

    //   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(request).do((event: HttpEvent<any>) => {
    //       if (event instanceof HttpResponse) {

    //       }
    //     }, (err: any) => {
    //       if (err instanceof HttpErrorResponse) {
    //         let message: string;
    //         switch (err.status) {
    //           case HttpStatus.CONNECTION_ERROR_0:
    //             message = 'Verifique su conexión a internet';
    //             break;
    //           case HttpStatus.CONNECTION_ERROR_1:
    //             message = 'Verifique su conexión a internet';
    //             break;
    //           case HttpStatus.BAD_REQUEST:
    //             // console.log(`${err.error.descripcion}`);
    //             message = err.error.descripcion;
    //             if(err.error.codigo == 'InvalidFormatException') {
    //               message = `Error al convertir los datos`;
    //             }
    //             break;
    //           case HttpStatus.UNAUTHORIZED:
    //             if (this.authService.isUserAuthenticated() == true) {
    //               message = 'Su sesión ha expirado';
    //             }
    //             localStorage.clear();
    //             this.router.navigate(['login']);
    //             break;
    //           case HttpStatus.FORBIDDEN:
    //           message = `Acceso denegado - ${err.url}`;
    //             break;
    //           case HttpStatus.NOT_FOUND:
    //             message = `Recurso no encontrado - ${err.url}`;
    //             break;
    //           case HttpStatus.INTERNAL_SERVER_ERROR:
    //             message = 'Ocurrio un error en el servidor';
    //             break;
    //           case HttpStatus.SERVICE_UNAVAILABLE:
    //             message = 'Ocurrio un error en el servidor';
    //             break;
    //           default:
    //             message = 'Ocurrio un error - Error no capturado';
    //             break;
    //         }
    //         if (message) {
    //           this.snackBar.open(message, null, {
    //             duration: 5000,
    //             verticalPosition: 'top',
    //             horizontalPosition: 'end'
    //           });
    //         }
    //       }
    //     });
    //   }
}
