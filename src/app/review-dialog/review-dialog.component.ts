import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';

import { BookReviewService } from '../services/book-review.service';
import { BookReview } from '../models/book-review';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {

  ratingForm: any;
  commentForm: any;
  title: string;
  bookId: number;
  userId: string;
  bookingId: number;

  constructor(public dialogRef: MatDialogRef<ReviewDialogComponent>) { }

  ngOnInit() {
    this.ratingForm = new FormControl('', [Validators.required]);
    this.commentForm = new FormControl('');
  }

  submitReview() {
    const bookReview: BookReview = {
      id: -1,
      bookId: this.bookId,
      userId: this.userId,
      rating: this.ratingForm.value,
      review: this.commentForm.value,
      bookingId: this.bookingId
    };
    this.dialogRef.close(bookReview);
  }

}
