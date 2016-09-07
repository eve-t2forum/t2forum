import { ElementRef, Inject, Injectable } from '@angular/core';

@Injectable()
export class DialogService {
  private dialog: JQuery;

  constructor(
    @Inject('jquery') private $: JQueryStatic
  ) {
    this.dialog = this.$('<div />', {
        class: 'yafnet',
    });
  }

  openDialog(content: ElementRef, title: string, buttons: {[text:string]: (event?: Event)=>void}) {
    this.dialog.children().remove();

    this.dialog.append(this.$(content.nativeElement).detach());
    let x = this.dialog.dialog({
      modal: true,
      resizable: false,
      draggable: false,
      title,
      width: 600,
      minHeight: 400,
      maxHeight: 0.9 * this.$('body').height(),
      buttons: buttons,
    })
    .css('overflow', 'auto')
    .parents('div.ui-dialog')
    .css({
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    });
  }

  destroyDialog() {
    this.dialog.dialog('close');
  }
}
