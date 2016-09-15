import { ElementRef, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class DialogService {
  private dialog: JQuery;
  private dialogClosed$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject('jquery') private $: JQueryStatic
  ) {
    this.dialog = this.$('<div />', {
        class: 'yafnet',
    }).css({
      overflow: 'auto',
      maxHeight: 0.8 * this.$('body').height()
    });
  }

  openDialog(content: ElementRef, title: string, buttons: {[text:string]: (event?: Event)=>void}): Observable<boolean> {
    this.dialogClosed$.next(true);
    this.dialogClosed$ = new BehaviorSubject<boolean>(false);
    console.log(this, this.$, content.nativeElement);

    this.dialog.children().remove();
    this.dialog.append(this.$(content.nativeElement).detach());
    let x = this.dialog.dialog({
      dialogClass: 'dialog-vertical-limited',
      modal: true,
      resizable: false,
      draggable: false,
      title,
      width: 600,
      minHeight: 400,
      maxHeight: 0.9 * this.$('body').height(),
      buttons: buttons,
      close: () => this.dialogClosed$.next(true),
    })
    .parents('div.ui-dialog')
    .css({
      maxHeight: '90%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    });
    console.log(x);

    return this.dialogClosed$;
  }

  destroyDialog() {
    this.dialog.dialog('close');
  }
}
