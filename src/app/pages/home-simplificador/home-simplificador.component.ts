import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { PalabrasComplejasService } from 'src/app/services/palabras-complejas.service';
import { SugerenciasPalabraComplejaService } from 'src/app/services/sugerencias-palabra-compleja.service';
import { SaveTextService } from 'src/app/services/save-text.service';


@Component({
  selector: 'app-home-simplificador',
  templateUrl: './home-simplificador.component.html',
  styleUrls: ['./home-simplificador.component.css'],
  providers: [PalabrasComplejasService,SugerenciasPalabraComplejaService]
})

export class HomeSimplificadorComponent implements OnInit {

  public textoNuevo: any;
  public wordComplex: any;
  public textoPalabras: Array<any> = [];
  public arraySuggestions: Array<any> = [];

  public boolTemplate: boolean= true;
  public ii: any;

  textPrevious: string= "";

  constructor(
    private _palabrasComplejasService: PalabrasComplejasService,
    private _SugerenciasPalabraComplejaService: SugerenciasPalabraComplejaService,
    private data: SaveTextService
  ) { 
    this.textoNuevo ={
      "texto": "",
      "initIndex": "Null",
      "lenTarget": "Null",
      "Word": "Null",
      "wordFreq" : "Null",
      "indWord": "Null",
    }
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(textPrevious => this.textPrevious = textPrevious)
  }

  newTextoString(valueT:string){
    this.textoNuevo.texto  = valueT;
    if(valueT.length > 0){
      this.data.changeText(this.textoNuevo.texto)
    }
  }

  saveChangeText(){
    this.data.changeText(this.Array_T.join(''))
  }

  getTextoPrevious(){
    this.showTextarea()
    this.Array_T.push(this.textPrevious);
    this.Array_Underline.push(0);
    this.cumsumArray = this.Array_Underline.concat();
    this.Array_WordTarget.push(0)
    this.Array_Highlights = new Array(this.cumsumArray.length).fill(false);
  }

  /*------------------------------------------*/
  /*------------------------------------------*/
  
 
  @ViewChild("tempPopupThree") tempPopupThree!: ElementRef;
  
  hidePopup() {
    if(this.showPopupTwo === true){
      this.tempPopupThree.nativeElement.style.display = 'none';
    }   
  }

  /*----------------------------------------*/
  /*----------------------------------------*/
  cargaPalabrasComplejas(){
    this._palabrasComplejasService.getText(this.textoNuevo).subscribe(
      response => {
        this.textoPalabras = response;
        console.log('textoPalabras',this.textoPalabras)
        if(response){
          this.hideloader();
          this.notErrors();
          this.applyUnderline();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  sugerenciasPalabraCompleja(index:any){
    
    this.textoNuevo.initIndex = this.textoPalabras[index].initIndex
    this.textoNuevo.lenTarget = this.textoPalabras[index].lenTarget
    this.textoNuevo.Word      = this.textoPalabras[index].targetText
    this.textoNuevo.wordFreq  = this.textoPalabras[index].wordFreq
    this.textoNuevo.indWord   = index

    this._SugerenciasPalabraComplejaService.getText(this.textoNuevo).subscribe(
      response =>{
        console.log('response',response.length);

        if(response.length !== 0){
          this.arraySuggestions = this.arraySuggestions.concat(response);
        } else
        this.arraySuggestions = this.arraySuggestions.concat('error');
        
        console.log('arraySuggestions',this.arraySuggestions);
        if(response){
          this.hideloader();
          this.notErrors();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  //---------------------------------------------
  //---------------------------------------------
  
  ignoreWord(index:any){
    this.Array_WordTarget[index]= 0;
    this.Array_Underline[index]= 0;
  }
  /*---------------*/
  changeWordTargetTwo(index: any,indexTwo: any ,jj: any, ignore: boolean){
   
    if(ignore == true){
      this.Array_T[this.Array_WordTargetTwo[indexTwo]] = this.Array_T[this.Array_WordTargetTwo[indexTwo]];
    }else if(false === ignore){
      
      this.Array_T[this.Array_WordTargetTwo[indexTwo]] = this.arraySuggestions[indexTwo].options[jj]
    }
    this.Array_WordTarget[this.Array_WordTargetTwo[indexTwo]] = 0
    this.Array_WordTargetTwo.splice(indexTwo, 1);
    this.arraySuggestions.splice(indexTwo, 1);

  }
  //---------------------------------------------
  //---------------------------------------------
  public kk: any;
  
  getIndex(index_ii: any){
    this.kk = index_ii
    this.boolTemplate = false;
  }

  public showIndex: any;
  public showDialog: boolean = false;

  clicked(i: any) {
    this.showDialog = true;
    this.showIndex = i;
  }
  //---------------------------------------------
  //---------------------------------------------
  
  onClearKeyword(keyw: any): void {
    if (keyw !== -1) {
      this.textoPalabras.splice(keyw - 1, 1);
    }
  }

  onClearSuggestions(keyw: any): void {
    if (keyw !== -1) {
      this.arraySuggestions.splice(keyw - 1, 1);
    }
  }

  clearText(){
    this.textoNuevo.texto = '';
    this.textoPalabras = [];
    this.arraySuggestions = [];
    this.Array_T =  [];
    this.Array_Underline = [];
    this.Array_WordTarget = [];
    this.Array_Highlights = [];
    this.cumsumArray = [];
    this.text_lowerU= '';
    this.text_topU= '';
    this.wordU= '';
  }
  
  //---------------------------------------------
  //---------------------------------------------

  displayBool: any;

  hideloader() {
    this.displayBool = false;
  }
  displaySpinner(){
    this.displayBool = true;
  }

  //---------------------------------------------
  //---------------------------------------------
  displayErrors: any;
  notErrors(){
    if(this.textoPalabras.length === 0){
      this.displayErrors = true;
    }else{
      this.displayErrors = false;
    };

  }
  Errors(){
    this.displayErrors = false;
  }
  
  //---------------------------------------------
  //---------------------------------------------
  changeText: any;

  checkText(){
    this.changeText = this.textoNuevo.texto
  };

  //---------------------------------------------
  //---------------------------------------------
  
  removeBreaks(){
    return this.textoNuevo.texto = this.textoNuevo.texto.trim();
  }

  //---------------------------------------------
  //---------------------------------------------

  public text_lowerU: any;
  public text_topU: any;
  public wordU: any;
  public Array_T:string[]= [];
  public array_text:string[]= [];
  public Array_Underline:number[]= [];
  public Array_WordTarget:number[]= [];
  public Array_Highlights:boolean[]=[];
  public sumArrayU: any;
  public cumsumArray: any;

  applyUnderline(){

    this.arraySuggestions = [];
    
    let fullText: string= this.textoNuevo.texto;
    let length_aux = 0;
    let offset_aux = 0;
    this.sumArrayU = 0;
    let array_text = [];
    this.Array_T =  [];
    this.Array_Underline = [];
    this.Array_WordTarget = [];
    this.Array_Highlights = [];
    this.cumsumArray = [];

    if(this.textoPalabras.length > 0 ){
      for(let tt = 0; tt < this.textoPalabras.length; tt++){

        this.text_lowerU = fullText.substring(0,this.textoPalabras[tt].initIndex - length_aux );
        this.wordU = fullText.substring(this.textoPalabras[tt].initIndex - length_aux,this.textoPalabras[tt].initIndex - length_aux  + this.textoPalabras[tt].lenTarget);
        this.text_topU  = this.textoNuevo.texto.substring(this.textoPalabras[tt].initIndex + this.textoPalabras[tt].lenTarget);

        offset_aux = (this.textoPalabras[tt].initIndex  + this.textoPalabras[tt].lenTarget) - length_aux;
        fullText = fullText.substring(offset_aux);
        length_aux = (this.textoPalabras[tt].initIndex  + this.textoPalabras[tt].lenTarget) ;

        if(this.text_lowerU.length > 0){
          array_text.push(this.text_lowerU)
          this.Array_T.push(this.text_lowerU)
          this.Array_Underline.push(0)
          this.Array_WordTarget.push(0)
        }
      
        this.Array_T.push(this.wordU)
        this.Array_Underline.push(1)
        this.Array_WordTarget.push(0)
        this.sumArrayU += 1;
      };

      if(this.text_topU.length > 0){
        this.Array_T.push(this.text_topU)
        this.Array_Underline.push(0) 
        this.Array_WordTarget.push(0)
      }

      this.cumsumArray = this.Array_Underline.concat(); //Copy initial array

      for (var ii = 1; ii < this.Array_Underline.length; ii++) {
        this.cumsumArray[ii] = this.cumsumArray[ii-1] + this.Array_Underline[ii];
      }
      
      for (var ii = 0; ii < this.cumsumArray.length; ii++) {
        if(this.cumsumArray[ii] > 0){
          this.cumsumArray[ii] = this.cumsumArray[ii] - 1;
        }
      }

      this.Array_Highlights = new Array(this.cumsumArray.length).fill(false);
    
    }else{

      this.Array_T.push(this.textoNuevo.texto);
      this.Array_Underline.push(0);
      this.cumsumArray = this.Array_Underline.concat();
      this.Array_Highlights = new Array(this.cumsumArray.length).fill(false);
      this.Array_WordTarget.push(0);
    
    }
    console.log('Array_T',this.Array_T)
    /*console.log('Array_Underline',this.Array_Underline)
    console.log('Array_WordTarget',this.Array_WordTarget)*/
  }

  ReadMore:boolean = true
  visible:boolean = false

  onclick(){
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }

  public showIndexTwo: any;
  public showPopupTwo: boolean = false;

  clickedTwo(i: any) {
    this.showPopupTwo = !this.showPopupTwo;
    this.showIndexTwo = i;
  }

  applyHighlightsTwo(index:any,showHighlights: any){
    if(showHighlights){
      this.Array_Highlights[index] = true;
    }else{
      this.Array_Highlights[index] = false;
    }
   
  }


  displayTextarea: boolean = true;
  async showTextarea(){
    this.displayTextarea = !this.displayTextarea
  }

  DeleteUnderline(index_u: any){
    this.Array_Underline[index_u] = 0;
  }
  
  
  public Array_WordTargetTwo:number[]= [];

  highlightWordTarget(index_u: any){
    this.Array_WordTarget[index_u] = 1;
    this.Array_WordTargetTwo = this.Array_WordTargetTwo.concat(index_u)
  }

  //---------------------------------------------
  //---------------------------------------------
  showTT = true;
  onClick2() {
        this.showTT= !this.showTT;
  }


  popupPosition = { top: '0', left: '0' };

  positionPopup(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement; // El elemento en el que se hizo clic
    const rect = buttonElement.getBoundingClientRect();
    
    const popupTop = rect.bottom + window.scrollY ;
    const popupLeft = rect.left + window.scrollX + 15;
    this.popupPosition = { top: `${Math.floor(popupTop)}px`, left: `${Math.floor(popupLeft)}px`};
    console.log('popupTop',popupTop)
    console.log('popupLeft',popupLeft)
    
  }

}
