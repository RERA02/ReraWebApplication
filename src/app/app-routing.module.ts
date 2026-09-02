import { Title } from '@angular/platform-browser';
import { RouterModule, Routes, TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { MasterLayoutComponent } from './Views/Shared/master-layout/master-layout.component';

import { HomeLayoutComponent } from './Views/Shared/home-layout/home-layout.component';
import { Injectable, NgModule } from '@angular/core';
import { AuthGuard } from './Common/auth.guard.ts';
import { EnumRole } from './Common/GlobalConstants';
import { EnumSsoid } from './Common/GlobalConstants';
import { RoleGuard } from './Common/RoleGuard';
import { SsoisGuard } from './Common/SSOIDGuard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: '', component: HomeLayoutComponent,
    children: [

      { path: '', loadChildren: () => import('./Views/Home/home/home.module').then(m => m.HomeModule), title: 'Home' },
      { path: 'Home', loadChildren: () => import('./Views/Home/home/home.module').then(m => m.HomeModule), title: 'Home' },
      { path: 'AboutUs', loadChildren: () => import('./Views/Home/AboutUs/AboutUs.module').then(m => m.AboutUsModule), title: 'AboutUs' },
      { path: 'DisclaimerAndPolicies', loadChildren: () => import('./Views/Home/DisclaimerAndPolicies/DisclaimerAndPolicies.module').then(m => m.DisclaimerAndPoliciesModule), title: 'DisclaimerAndPolicies' },
      { path: 'OurLeaderships', loadChildren: () => import('./Views/Home/OurLeaderships/OurLeaderships.module').then(m => m.OurLeadershipsModule), title: 'OurLeaderships' },
      { path: 'AnnualReport', loadChildren: () => import('./Views/Home/AnnualReport/AnnualReport.module').then(m => m.AnnualReportModule), title: 'AnnualReport' },
      { path: 'contactus', loadChildren: () => import('./Views/Home/contactus/contactus.module').then(m => m.contactusModule), title: 'contactus' },
      { path: 'GeneralFAQ', loadChildren: () => import('./Views/Home/GeneralFAQ/GeneralFAQ.module').then(m => m.GeneralFAQModule), title: 'GeneralFAQ' },
      { path: 'CancellationRefundPolicy', loadChildren: () => import('./Views/Home/CancellationRefundPolicy/CancellationRefundPolicy.module').then(m => m.CancellationRefundPolicyModule), title: 'CancellationRefundPolicy' },
      { path: 'ReplyRespondantResponse', loadChildren: () => import('./Views/Home/ReplyRespondantResponse/ReplyRespondantResponse.module').then(m => m.ReplyRespondantResponseModule), title: 'ReplyRespondantResponse' },
     /* { path: 'TYOCA1nzXF9TQk59Xbuu', loadChildren: () => import('./Views/Home/LoginProcess/LoginProcess.module').then(m => m.LoginProcessModule), title:'LoginProcess' },*/
      { path: 'ProjectList', loadChildren: () => import('./Views/Home/ProjectList/ProjectList.module').then(m => m.ProjectListModule), title: 'ProjectList' },

      { path: 'Deflauterlist', loadChildren: () => import('./Views/Home/Deflauterlist/Deflauterlist.module').then(m => m.DeflauterlistModule), title: 'Deflauterlist' },

      { path: 'ProjectDetail', loadChildren: () => import('./Views/Home/ProjectDetail/ProjectDetail.module').then(m => m.ProjectDetailModule), title: 'ProjectDetail' },
      { path: 'ssologin', loadChildren: () => import('./Views/ssologin/ssologin.module').then(m => m.SSOLoginModule), title: 'SSO Login' },
      { path: 'ssologin/id1', loadChildren: () => import('./Views/ssologin/ssologin.module').then(m => m.SSOLoginModule), title: 'SSO Login' },
      { path: 'screenreaderaccess', loadChildren: () => import('./Views/Home/ScreenReaderAccess/ScreenReaderAccess.module').then(m => m.ScreenReaderAccessModule), title: 'ScreenReaderAccess' },
      { path: 'AgentList', loadChildren: () => import('./Views/Home/AgentList/AgentList.module').then(m => m.AgentListModule), title: 'AgentList' },
      { path: 'complaintdetails', loadChildren: () => import('./Views/Home/complaintdetails/complaintdetails.module').then(m => m.complaintdetailsModule), title: 'complaintdetails' },
      { path: 'Promotersearch', loadChildren: () => import('./Views/Home/Promotersearch/Promotersearch.module').then(m => m.PromotersearchModule), title: 'Promotersearch' },
      { path: 'ViewAgent', loadChildren: () => import('./Views/Home/ViewAgentNew/ViewAgentNew.module').then(m => m.ViewAgentNewModule), title: 'ViewAgent' },
        { path: 'CauseList', loadChildren: () => import('./Views/Home/CauseList/CauseList.module').then(m => m.CauseListModule), title: 'CauseList' },
        { path: 'Summary', loadChildren: () => import('./Views/Home/Summary/Summary.module').then(m => m.SummaryModule), title: 'Summary' },
      { path: 'OrderList', loadChildren: () => import('./Views/Home/OrderList/OrderList.module').then(m => m.OrderListModule), title: 'OrderList' },
      { path: 'UpdatedDailyCauseList', loadChildren: () => import('./Views/Home/UpdatedDailyCauseList/UpdatedDailyCauseList.module').then(m => m.UpdatedDailyCauseListModule), title: 'UpdatedDailyCauseList' },
        { path: 'TenderList', loadChildren: () => import('./Views/Home/TenderList/TenderList.module').then(m => m.TenderListModule), title: 'TenderList' },
        { path: 'NotificationPDF', loadChildren: () => import('./Views/Home/NotificationPDF/NotificationPDF.module').then(m => m.NotificationPDFModule), title: 'NotificationPDF' },
      { path: 'ListApplication', loadChildren: () => import('./Views/Home/ListApplication/ListApplication.module').then(m => m.ListApplicationRoutingModule), title: 'ListApplication' },
      //{ path: 'complaintdetails/complaint_status', loadChildren: () => import('./Views/Home/complaintdetails/complaintdetails.module').then(m => m.complaintdetailsModule), title: 'complaintdetails' },
      { path: 'ViolationofAct', loadChildren: () => import('./Views/Home/ViolationofAct/ViolationofAct.module').then(m => m.ViolationofActModule), title: 'ViolationofAct' },
      { path: 'ViolationActSummary', loadChildren: () => import('./Views/Home/ViolationActSummary/ViolationActSummary.module').then(m => m.ViolationActSummaryModule), title: 'ViolationActSummary' },
        { path: 'ComplaintBox', loadChildren: () => import('./Views/Home/ComplaintBox/ComplaintBox.module').then(m => m.ComplaintBoxModule), title: 'ComplaintBox' },
        { path: 'ProjectExtensionView', loadChildren: () => import('./Views/Home/ProjectExtensionView/ProjectExtensionView.module').then(m => m.ProjectExtensionViewModule), title: 'ProjectExtensionView' },
      { path: 'ProModSummary', loadChildren: () => import('./Views/Home/ProModSummary/ProModSummary.module').then(m => m.ProModSummaryModule), title: 'ProModSummary' },
      { path: 'ViewProject', loadChildren: () => import('./Views/Home/ViewProject/ViewProject.module').then(m => m.ViewProjectModule), title: 'ViewProject' },
      { path: 'ViewProjectNew', loadChildren: () => import('./Views/Home/ViewProjectNew/ViewProjectNew.module').then(m => m.ViewProjectNewModule), title: 'ViewProjectNew'},
        { path: 'MapSummary', loadChildren: () => import('./Views/Home/MapSumary/MapSumary.module').then(m => m.MapSumaryModule), title: 'MapSummary' },
      { path: 'APRSummary', loadChildren: () => import('./Views/Home/APRSummary/APRSummary.module').then(m => m.APRSummaryModule), title: 'APRSummary' },
      { path: 'QPRSummary', loadChildren: () => import('./Views/Home/QPRSummary/QPRSummary.module').then(m => m.QPRSummaryModule), title: 'QPRSummary' },
      { path: 'PA_Summary', loadChildren: () => import('./Views/Home/pa-summary/pa-summary.module').then(m => m.PASummaryModule), title: 'PostRegistrationUploadSummary' },
      { path: 'Special_ModificationProfileSummary', loadChildren: () => import('./Views/Home/special-modification-profile-summary-web-site/special-modification-profile-summary-web-site.module').then(m => m.SpecialModificationProfileSummaryWebSiteModule), title: 'SpecialModificationProfileSummary' },
      { path: 'EncumSummary', loadChildren: () => import('./Views/Home/encum-summary/encum-summary.module').then(m => m.EncumSummaryModule), title: 'EncumbranceSummary' },
      { path: 'MyProfile', loadChildren: () => import('./Views/Home/MyProfile/MyProfile.module').then(m => m.MyProfileModule), title: 'MyProfile' },
    ]
  },
  
  {
    path: '', component: MasterLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'loader',
        loadChildren: () => import('./Views/Shared/loader/loader.module').then(m => m.LoaderModule)
      },
     
      {
        path: 'Assessment/TestQuestion',
        loadChildren: () => import('./Views/Assessment/AdminLevel/admin-level.module').then(m => m.AssessmentModule),
        //title: 'Assessment'
        canActivate: [AuthGuard],
        data: {
          allowedRoles: [EnumRole.SUPERADMIN, EnumRole.STATENODAL]
        }
      },
      {
        path: 'Psychometric/TestQuestion',
        loadChildren: () => import('./Views/Assessment/psychometrictest/psychometric-test.module').then(m => m.PsychometricTestModule),
        //title: 'Assessment'
        canActivate: [AuthGuard],
        data: {
          allowedRoles: [EnumRole.SUPERADMIN, EnumRole.STATENODAL]
        }
      },
     
      
      {
        path: 'Joseeker/AssessmentTest',
        loadChildren: () => import('./Views/Assessment/JoseekerAssessment/Joseeker-assessment.module').then(m => m.JoseekerAssessmentModule),
        //title: 'Assessment'
        canActivate: [AuthGuard],
        data: {
          allowedRoles: [EnumRole.JOBSEEKER]
        }
      },
      
    ]
  },
  {
    path: 'not-authorized',
    loadComponent: () => import('./Views/errors/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent),
    title: 'Access Denied'
  },
  
 


  { path: '**', loadComponent: () => import('./Views/errors/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent), title: '404 - Page not found' },
];
@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} - RERA 2.0`);
    }
  }
}
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false, onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy
    }
  ]
})
export class AppRoutingModule { }



