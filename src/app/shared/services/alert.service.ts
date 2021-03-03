import { Injectable } from "@angular/core";
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  toastConfig = {
    positionClass: "toast-custom-center-center",
  };

  // constructor(private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  // showSuccess(title: string, message?: string): void {
  //   this.toastr.success(message, title, this.toastConfig);
  // }

  // showError(title: string, message?: string): void {
  //   console.log("ALERT ACTIVE COUNT", this.toastr.currentlyActive);
  //   if (this.toastr.currentlyActive > 0) {
  //     if (message !== this.toastr.previousToastMessage) {
  //       this.toastr.error(message, title, this.toastConfig);
  //       this.spinner.hide();
  //     }
  //   } else {
  //     this.toastr.error(message, title, this.toastConfig);
  //     this.spinner.hide();
  //   }
  // }

  // showInfo(title: string, message?: string): void {
  //   this.toastr.info(message, title, this.toastConfig);
  // }

  // showWarning(title: string, message?: string): void {
  //   this.toastr.warning(message, title, this.toastConfig);
  // }
}
