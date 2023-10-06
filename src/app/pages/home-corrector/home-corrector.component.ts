import { Component, OnInit, forwardRef } from '@angular/core';
import { CorrectorService } from 'src/app/services/corrector.service';
import { SaveTextService } from 'src/app/services/save-text.service';
import { Input } from '@angular/core';
import { NG_VALUE_ACCESSOR} from "@angular/forms";
import { Renderer2, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-home-corrector',
  templateUrl: './home-corrector.component.html',
  styleUrls: ['./home-corrector.component.css'],
  providers: [CorrectorService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HomeCorrectorComponent),
      multi: true
    }],
})

export class HomeCorrectorComponent implements OnInit {

  public textoNuevo: any;
  @Input() textoNuevo2:any;
  public textoCorregidos: Array<any> = [];

  textPrevious: string= "";

  public highlight: any;
  
  constructor(
    private _correctorService: CorrectorService,
    private data: SaveTextService,
    private renderer: Renderer2,
  ) { 
    this.textoNuevo ={
      "texto": ""
    };
  }
  /*------------------------------------------*/
  /*------------------------------------------*/
  
 
 
  @ViewChild("tempPopupTwo") tempPopupTwo!: ElementRef;
  @ViewChild("editableDivTwo") editableDivTwo!: ElementRef;
  
  hidePopup() {
    if(this.showPopupTwo === true){
      this.tempPopupTwo.nativeElement.style.display = 'none';
      console.log('CLOSE POPUP')
    }
  }
  /*------------------------------------------*/
  /*------------------------------------------*/
  
  ngOnInit() {
    this.data.currentMessage.subscribe(textPrevious => this.textPrevious = textPrevious)
  }
  
  saveChangeText(){
    this.data.changeText(this.Array_T.join(''))
  }

  newTextoString(valueT:string){  
    
    this.textoNuevo.texto  = valueT;
    
    if(valueT.length > 0){
      this.data.changeText(this.textoNuevo.texto)
    }

  }

  closePopup(){
    this.showPopup = false;
    this.showPopupTwo = false;
    this.showIndexTwo = -1;
  }


  getTextPrevious(){
    this.showTextarea()
    this.Array_T.push(this.textPrevious);
    this.Array_Underline.push(0);
    this.cumsumArray = this.Array_Underline.concat();
    this.Array_Highlights = new Array(this.cumsumArray.length).fill(false);
    this.positions.push(0);
    this.Array_Boolean = Array(1).fill(true);
   
  }

  /*----------------------------------------*/
  /*----------------------------------------*/
  public Array_Boolean: boolean[]=[];
  
  cargaCorrectorTwo(){
    
    this._correctorService.getTexto(this.textoNuevo).subscribe(response => 
      {
        console.log('response',response);
        this.textoCorregidos = response;
        if(this.textoCorregidos.length > 0){
          this.hideloader();
          this.applyUnderline();
        }else{
          this.hideloader();
          this.notErrors();
          this.applyUnderline();
          
        }
      }, error => 
      {
        console.log(<any>error);
      }
    );
  }
  /*----------------------------------------*/
  /*----------------------------------------*/
  public boolTemplate: boolean= true;
  public ii: any;
  public kk: any;
  
  getIndex(index_ii: any){
    this.kk = index_ii
    this.boolTemplate = false;
  }

  public showIndex: any;
  public showPopup: boolean = false;

  clicked(i: any) {
    this.showPopup = true;
    this.showIndex = i;
  }

  //---------------------------------------------
  //---------------------------------------------
  
  public text_lower: any;
  public text_top: any;
  public new_text: any;
  
  public aux_len_1: any;
  public aux_len_2: any;

  public value_index: any;
  public aux_len_word: any;
 
changeWordTargetTwo(index: any, jj: any,ff:any, ignore: any, correction:any){
 
  if(correction==false){
    if (ignore === true){
      this.Array_T[index] = this.textoCorregidos[this.cumsumArray[index]].errorText;
    }else if(ignore === false){
      this.Array_T[index] = this.textoCorregidos[this.cumsumArray[index]].replacements[ff];
    }
    this.Array_Underline[index] = 0;
    this.Array_Highlights[index] = false;
    this.Array_Boolean[this.cumsumArray[index]] = false;
  }

  if(correction==true){
    if (ignore === true){
      this.Array_T[this.positions[jj]] = this.textoCorregidos[this.cumsumArray[this.positions[jj]]].errorText;
    }else if(ignore === false){
      this.Array_T[this.positions[jj]] = this.textoCorregidos[this.cumsumArray[this.positions[jj]]].replacements[ff];
    }
    this.Array_Underline[this.positions[jj]] = 0;
    this.Array_Highlights[this.positions[jj]] = false;
    this.Array_Boolean[this.cumsumArray[this.positions[jj]]] = false;
  }
  
  
}
  //---------------------------------------------
  //---------------------------------------------
  

  clearText(){
    this.textoNuevo.texto = '';
    this.textoCorregidos = [];
    
    this.Array_T =  [];
    this.positions =[];
    this.Array_Highlights = [];
    this.Array_Underline = [];
    this.cumsumArray = [];
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
    if(this.textoCorregidos.length === 0){
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

  
  typeError: any;
  

  checkTypeError(index: any): void {
      
    if(this.textoCorregidos[index].ruleId === 'AGREEMENT_DET_NOUN' ||  this.textoCorregidos[index].ruleId === 'LO_LOS')
    {
      this.typeError = 'Error de concordancia';
    }
    else if(this.textoCorregidos[index].ruleId === 'MORFOLOGIK_RULE_ES' || this.textoCorregidos[index].ruleId === 'A_PARTICIPIO' || this.textoCorregidos[index].ruleId === 'AH_INF' || this.textoCorregidos[index].ruleId === 'HA_A')
    {
      this.typeError = 'Error ortográfico';
    }
    else if(this.textoCorregidos[index].ruleId === 'PREP_VERB' || this.textoCorregidos[index].ruleId === 'EL_TILDE' || this.textoCorregidos[index].ruleId === 'ID_HUBO_HUBIERON' || this.textoCorregidos[index].ruleId === 'SURGIR_EFECTO' || this.textoCorregidos[index].ruleId === 'Y_E_O_U')
    {
      this.typeError = 'Error gramatical';
    }
    else if(this.textoCorregidos[index].ruleId === 'DOUBLE_PUNCTUATION' || this.textoCorregidos[index].ruleId === 'UPPERCASE_SENTENCE_START' ||  this.textoCorregidos[index].ruleId === 'ES_UNPAIRED_BRACKETS' || this.textoCorregidos[index].ruleId === 'WHITESPACE_RULE' || this.textoCorregidos[index].ruleId === 'COMMA_PARENTHESIS_WHITESPACE' || this.textoCorregidos[index].ruleId === 'SPANISH_WORD_REPEAT_RULE' || this.textoCorregidos[index].ruleId === 'ESPACIO_DESPUES_DE_PUNTO' )
    {
      this.typeError = 'Error tipográfico';
    }
    else if(this.textoCorregidos[index].ruleId === 'RELACIONADO_A' || this.textoCorregidos[index].ruleId === 'DIFFERENT_ERROR')
    {
      this.typeError = 'Otros errores';
    }
    else
    {
      this.typeError = 'Otros errores';
    }
  }
  
  removeBreaks(){
    return this.textoNuevo.texto = this.textoNuevo.texto.trim();
  }
  
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  

  public text_lowerU: any;
  public text_topU: any;
  public wordU: any;
  public positions:number[]= [];
  public Array_T:string[]= [];
  public Array_Underline:number[]= [];
  public Array_Highlights:boolean[]=[];
  public sumArrayU: any;
  public cumsumArray: any;
 
  applyUnderline(){
    
    let fullText: string= this.textoNuevo.texto;
    let length_aux = 0;
    let offset_aux = 0;
    let array_text = [];
    this.sumArrayU = 0;
    this.text_lower = '';
    this.text_topU = '';
    this.wordU = '';
    this.Array_T =  [];
    this.positions =[];
    this.Array_Highlights = [];
    this.Array_Underline = [];
    this.cumsumArray = [];
    
    if(this.textoCorregidos.length > 0 ){
      for(let tt = 0; tt < this.textoCorregidos.length; tt++){

        this.text_lowerU = fullText.substring(0,this.textoCorregidos[tt].offset - length_aux );
        this.wordU = fullText.substring(this.textoCorregidos[tt].offset - length_aux,this.textoCorregidos[tt].offset - length_aux  + this.textoCorregidos[tt].errorLength);
        this.text_topU  = this.textoNuevo.texto.substring(this.textoCorregidos[tt].offset + this.textoCorregidos[tt].errorLength);
  
  
        offset_aux = (this.textoCorregidos[tt].offset  + this.textoCorregidos[tt].errorLength) - length_aux;
        fullText = fullText.substring(offset_aux);
        length_aux = (this.textoCorregidos[tt].offset  + this.textoCorregidos[tt].errorLength) ;
  
        if(this.text_lowerU.length > 0){
          array_text.push(this.text_lowerU)
          this.Array_T.push(this.text_lowerU)
          this.Array_Underline.push(0)
          
        }
  
        this.Array_T.push(this.wordU)
        this.Array_Underline.push(1)
        this.sumArrayU += 1;
  
      };
      
      if(this.text_topU.length > 0){
        this.Array_T.push(this.text_topU)
        this.Array_Underline.push(0)
      }
  
      this.cumsumArray = this.Array_Underline.concat(); //Copy initial array
  
      for (var ii = 1; ii < this.Array_Underline.length; ii++) {
        this.cumsumArray[ii] = this.cumsumArray[ii-1] + this.Array_Underline[ii];
        
      }
      
      for (var ii = 0; ii < this.cumsumArray.length; ii++) {
        if(this.cumsumArray[ii]>0){
          this.cumsumArray[ii] = this.cumsumArray[ii] - 1;
        }
        
      }
      this.Array_Highlights = new Array(this.cumsumArray.length).fill(false);
      
      
      const valueToFind = 1;
  
      for (let ii = 0; ii < this.Array_Underline.length; ii++) {
        if (this.Array_Underline[ii] === valueToFind) {
          this.positions.push(ii);
        }
      }

      this.Array_Boolean = Array(this.textoCorregidos.length).fill(true);


    }else{

      this.Array_T.push(this.textoNuevo.texto);
      this.Array_Underline.push(0);
      this.cumsumArray = this.Array_Underline.concat();
      this.Array_Highlights = new Array(this.cumsumArray.length).fill(false);
      this.positions.push(0);
      this.Array_Boolean = Array(1).fill(true);
    
    }

  }
    
    
  applyHighlightsTwo(index:any,showHighlights: any){
  
      for(let ii=0; ii< this.Array_Highlights.length; ii++){
        this.Array_Highlights[ii] = false;
      }
      if(showHighlights){
        this.Array_Highlights[index] = true;
      }else{
        this.Array_Highlights[index] = false;
        
      }
    
  }

  DeleteUnderline(index_u: any){
    this.Array_Underline[index_u] = 0;
      
  }


  /*--------------------------------------------*/
  /*--------------------------------------------*/
  displayTextarea: boolean = true;
  showTextarea(){
    this.displayTextarea = !this.displayTextarea
  }



  //readmore variable, its true than read more string will print
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


  /*-----------------------------------------------*/
  /*-----------------------------------------------*/
  
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
