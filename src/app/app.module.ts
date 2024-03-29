import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
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
import { ColorLevelsDialogComponent } from './dialogs/color-levels-dialog/color-levels-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrushColorDialogComponent } from './dialogs/brush-color-dialog/brush-color-dialog.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { ThresholdingDialogComponent } from './dialogs/thresholding-dialog/thresholding-dialog.component';
import { BrushSizeDialogComponent } from './dialogs/brush-size-dialog/brush-size-dialog.component';
import { ResizeImageDialogComponent } from './dialogs/resize-image-dialog/resize-image-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ContrastDialogComponent } from './dialogs/contrast-dialog/contrast-dialog.component';
import { HueSaturationDialogComponent } from './dialogs/hue-saturation-dialog/hue-saturation-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { AboutDialogComponent } from './dialogs/about-dialog/about-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ToolbarComponent,
    BrightnessDialogComponent,
    NewDialogComponent,
    ColorLevelsDialogComponent,
    BrushColorDialogComponent,
    ThresholdingDialogComponent,
    BrushSizeDialogComponent,
    ResizeImageDialogComponent,
    SidenavComponent,
    ContrastDialogComponent,
    HueSaturationDialogComponent,
    FooterComponent,
    AboutDialogComponent
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
    ReactiveFormsModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
