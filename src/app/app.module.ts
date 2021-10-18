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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorDialogComponent } from './dialogs/color-dialog/color-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrushColorDialogComponent } from './dialogs/brush-color-dialog/brush-color-dialog.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { ThresholdingDialogComponent } from './dialogs/thresholding-dialog/thresholding-dialog.component';
import { BrushSizeDialogComponent } from './dialogs/brush-size-dialog/brush-size-dialog.component';
import { ResizeImageDialogComponent } from './dialogs/resize-image-dialog/resize-image-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PaintComponent,
    ToolbarComponent,
    BrightnessDialogComponent,
    NewDialogComponent,
    ColorDialogComponent,
    BrushColorDialogComponent,
    ThresholdingDialogComponent,
    BrushSizeDialogComponent,
    ResizeImageDialogComponent
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
    MatInputModule,
    MatCheckboxModule,
    NgxMatColorPickerModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
