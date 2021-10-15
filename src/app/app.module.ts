import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaintComponent } from './paint/paint.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrightnessDialogComponent } from './dialogs/brightness-dialog/brightness-dialog.component';
import { NewDialogComponent } from './dialogs/new-dialog/new-dialog.component';
import { FormsModule } from '@angular/forms';
import { ColorDialogComponent } from './dialogs/color-dialog/color-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { BrushColorDialogComponent } from './dialogs/brush-color-dialog/brush-color-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PaintComponent,
    ToolbarComponent,
    BrightnessDialogComponent,
    NewDialogComponent,
    ColorDialogComponent,
    BrushColorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    NgbModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
