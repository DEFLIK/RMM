import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appRepeat]'
})
export class RepeatDirective {

    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef) { }

    @Input() 
    public set appRepeat(count: number) {
        this._viewContainer.clear();
        for (let i: number = 0 ; i < count ; i++) {
            this._viewContainer.createEmbeddedView(this._templateRef);
        }
    }
}
