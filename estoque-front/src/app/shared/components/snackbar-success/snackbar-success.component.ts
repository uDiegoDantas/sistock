import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-snackbar-success',
  imports: [
    MatSnackBarAction,
    MatSnackBarModule,
    MatIcon,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './snackbar-success.component.html',
  styleUrl: './snackbar-success.component.scss',
})
export class SnackbarSuccessComponent implements OnInit {
  progressBarValue = 100;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public message: string,
    public snackBarRef: MatSnackBarRef<SnackbarSuccessComponent>
  ) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      if (this.progressBarValue <= 0) return;

      this.progressBarValue = this.progressBarValue - 99 / 40;
    }, 90);
    setTimeout(() => {
      window.clearInterval(interval);
    }, 4000);
  }
}
