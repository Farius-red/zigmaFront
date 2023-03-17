import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';



@Directive({
  selector: '[juliaoSystemTraslate]'
})
export class JuliaoSystemTranslateDirective implements OnInit, OnDestroy {

  @Input('juliaoSystemTraslate') keyString:any;

  onTranslationChangeSub?: Subscription;

  isEdit = false;
  currentText = '';

  constructor(
    protected translateService: TranslateService,
    protected element: ElementRef,
  
    protected dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((lang: any) => {
      this.translationChange();
    });
 

    //this.saveAllKeys();
    this.translationChange();

  }

  translationChange() {
    this.onTranslationChangeSub = this.translateService.get(this.keyString).subscribe(result => {
      this.currentText = result;
      this.element.nativeElement.textContent = result;
      if (this.element.nativeElement.setAttribute) {
        this.element.nativeElement.setAttribute('data-translate-key', this.keyString);
        this.element.nativeElement.setAttribute('data-translate-result', result);
      }
    });
  }

  // saveAllKeys() {
  //   let item = new MiaTranslate();
  //   item.name = this.keyString;
  //   item.lang_one = this.element.nativeElement.textContent;
    
  // }

 
 

 

  

  ngOnDestroy(): void {
    if (this.onTranslationChangeSub) {
      this.onTranslationChangeSub.unsubscribe();
    }
  }
}
