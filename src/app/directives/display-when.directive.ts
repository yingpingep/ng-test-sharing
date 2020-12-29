import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appDisplayWhen]',
})
export class DisplayWhenDirective {
  private trueEmbeddedViewRef: EmbeddedViewRef<any>;
  private falseEmbeddedViewRef: EmbeddedViewRef<any>;
  private trueTemplateRef: TemplateRef<any>;
  private falseTemplateRef: TemplateRef<any>;
  // tslint:disable-next-line: variable-name
  private _appDisplayWhen: boolean;
  @Input() set appDisplayWhen(condition: boolean) {
    this._appDisplayWhen = condition;
    this.updateView();
  }
  get appDisplayWhen(): boolean {
    return this._appDisplayWhen;
  }

  @Input() set appDisplayWhenTrue(templateRef: TemplateRef<any>) {
    this.trueTemplateRef = templateRef;
    this.trueEmbeddedViewRef = null;
    this.updateView();
  }

  @Input() set appDisplayWhenFalse(templateRef: TemplateRef<any>) {
    this.falseTemplateRef = templateRef;
    this.falseEmbeddedViewRef = null;
    this.updateView();
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    templateRef: TemplateRef<any>
  ) {
    this.trueTemplateRef = templateRef;
  }

  private updateView(): void {
    if (this.appDisplayWhen) {
      if (!this.trueEmbeddedViewRef) {
        this.viewContainerRef.clear();
        this.falseEmbeddedViewRef = null;

        if (this.trueTemplateRef) {
          this.trueEmbeddedViewRef = this.viewContainerRef.createEmbeddedView(
            this.trueTemplateRef
          );
        }
      }
    } else {
      if (!this.falseEmbeddedViewRef) {
        this.viewContainerRef.clear();
        this.trueEmbeddedViewRef = null;

        if (this.falseTemplateRef) {
          this.falseEmbeddedViewRef = this.viewContainerRef.createEmbeddedView(
            this.falseTemplateRef
          );
        }
      }
    }
  }
}
