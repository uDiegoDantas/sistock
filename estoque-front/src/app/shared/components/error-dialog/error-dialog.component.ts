import { Component, Inject, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
  ],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
})
export class ErrorDialogComponent {
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: string) {}
}
