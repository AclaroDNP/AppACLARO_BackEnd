import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components Pages
import { AppComponent } from './app.component';
import { AclaroComponent } from './pages/aclaro/aclaro.component';
import { BoardComponent } from './pages/board/board.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { DescriptionComponent } from './pages/description/description.component';
import { HomeCorrectorComponent } from './pages/home-corrector/home-corrector.component';
import { HomeSimplificadorComponent } from './pages/home-simplificador/home-simplificador.component';
import { HomeResumenComponent } from './pages/home-resumen/home-resumen.component';
import { HomeMetricasComponent } from './pages/home-metricas/home-metricas.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AclaroComponent,
    BoardComponent,
    ComentariosComponent,
    DescriptionComponent,
    HomeCorrectorComponent,
    HomeSimplificadorComponent,
    HomeResumenComponent,
    HomeMetricasComponent,
    PreguntasComponent,
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxChartsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
