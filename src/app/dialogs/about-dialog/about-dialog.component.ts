import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AboutDialogComponent>) { }

  ngOnInit(): void {
  }

  getLogoSrc(): string {
    if (environment.production)
      return "assets/logo_blue.png";
    else
      return "../../assets/logo_blue.png";
  }

}
