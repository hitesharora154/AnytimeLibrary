import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent implements OnInit {

  title: string;
  bookId: number;
  datePicked: Date;
  dateForm: FormControl;

  dateFilter = (d: Date): boolean => {
    const currentDate = new Date();
    if (d <= currentDate) {
      return false;
    }

    return true;
  }

  constructor(public dialogRef: MatDialogRef<BookingDialogComponent>) { }

  ngOnInit() {
    this.dateForm = new FormControl('', [Validators.required]);
  }
}


