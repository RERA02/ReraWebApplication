import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { GlobalConstants, EnumStatus } from '../../../Common/GlobalConstants';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { ErrorLogService } from '../../../Services/ErrorLog/error-log.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-logging',
  standalone: false,
  templateUrl: './error-logging.component.html',
  styleUrl: './error-logging.component.css'
})
export class ErrorLoggingComponent {
  sSOLoginDataModel = new SSOLoginDataModel();
  public State: number = 0;
  public Message: any = [];
  public ErrorMessage: any = [];
  public ErrorLogList: any = [];
  public Stacktrace: string = '';
  closeResult: string | undefined;

  constructor(private router: Router, private loaderService: LoaderService, private errorLogService: ErrorLogService, private toastr: ToastrService,
    private modalService: NgbModal) {
    this.sSOLoginDataModel = JSON.parse(String(localStorage.getItem('SSOLoginUser')));

    if (this.sSOLoginDataModel == null) {
      this.router.navigate(['/login']);
    }
    else {
      this.FetchApplicationErrorLog("FetchAll");
    }
  }


  async FetchApplicationErrorLog(Searchkey: string) {
    try {
      this.loaderService.requestStarted();
      await this.errorLogService.FetchApplicationErrorLog(Searchkey)
        .then((data: any) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data)
          this.State = data['State'];
          this.Message = data['Message'];
          this.ErrorMessage = data['ErrorMessage'];
          if (this.State == EnumStatus.Success) {
            this.ErrorLogList = data['Data'];

            console.log(this.ErrorLogList)
          } else {
            this.toastr.error('Something went wrong, please try again.');
          }

        });
    }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }


  async ChangeStatus(Id: number, sType: number) {   
     try {   
    this.loaderService.requestStarted();
       await this.errorLogService.ChangeLogStatus(Id, sType)
      .then((data: any) => {
        data = JSON.parse(JSON.stringify(data));
        console.log(data)
        this.State = data['State'];
        if (this.State == EnumStatus.Success) {         
          console.log(data)
          this.FetchApplicationErrorLog("FetchAll");
        }
      });
     }
    catch (ex) {
      console.log(ex);
    }
    finally {
      setTimeout(() => {
        this.loaderService.requestEnded();
      }, 200);
    }
  }



  async FetchStackTraceById(StackTrace: string) {
    this.Stacktrace = StackTrace;  
  }

  async ShowStackModel(content: any) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  CloseModalPopup() {
    this.modalService.dismissAll();
  }

}
