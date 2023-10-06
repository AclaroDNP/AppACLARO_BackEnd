import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { AclaroComponent } from "./pages/aclaro/aclaro.component";
import { HomeCorrectorComponent } from "./pages/home-corrector/home-corrector.component";
import { ComentariosComponent } from "./pages/comentarios/comentarios.component";
import { HomeSimplificadorComponent } from "./pages/home-simplificador/home-simplificador.component";
import { HomeResumenComponent } from "./pages/home-resumen/home-resumen.component";
import { HomeMetricasComponent } from "./pages/home-metricas/home-metricas.component";
import { DescriptionComponent } from "./pages/description/description.component";
import { BoardComponent } from "./pages/board/board.component";
import { PreguntasComponent } from "./pages/preguntas/preguntas.component";

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
  };

const routes: Routes = [
    {path: 'home-corrector', component: HomeCorrectorComponent, data: { titulo: 'Corrector'}},
    {path: 'home-simplificador', component: HomeSimplificadorComponent, data: { titulo: 'Simplificador'}},
    {path: 'home-resumen', component: HomeResumenComponent, data: {titulo: 'Resumen'}},
    {path: 'home-metricas', component: HomeMetricasComponent, data: {titulo: 'Metricas'}},
    {path: 'comentarios', component: ComentariosComponent, data: {titulo: 'Comentarios'}},
    {path: 'description', component: DescriptionComponent, data: {titulo: 'Conoce Aclaro'}},
    {path: 'board', component: BoardComponent, data: { titulo: 'Tablero'}},
    {path: 'aclaro', component: AclaroComponent, data: { titulo: 'Inicio'}},
    {path: 'preguntas', component: PreguntasComponent, data: { titulo: 'Preguntas'}},
    {path:  '**', redirectTo: '/aclaro', pathMatch: 'full'},

];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}