import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  createSnack(message: string) {
    this._snackBar.open(message, 'ok', {
      duration: 10000,
      panelClass: ['snackButton', 'snackPanel'],
    });
  }
}
