import {Injectable} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {
  private readonly overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      width: 100,
      height: 100,
      positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally(),
    });
  }

  public show() {
    if (!this.overlayRef.hasAttached()) {
      const spinnerOverlayPortal = new ComponentPortal(MatProgressSpinner);
      const component = this.overlayRef.attach(spinnerOverlayPortal);
      component.instance.diameter = 40;
    }
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
