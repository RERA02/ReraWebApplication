import { Routes } from "@angular/router";
import { AuthGuard } from "@Common/auth.guard.ts";
import { EnumRole } from "@Common/GlobalConstants";
import { HomeLayoutComponent } from "@Views/Shared/home-layout/home-layout.component";
import { MasterLayoutComponent } from "@Views/Shared/master-layout/master-layout.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      // Core Public Routes
      { path: '', loadChildren: () => import('./Views/Home/home/home.module').then(m => m.HomeModule), title: 'Home' },
      { path: 'Home', loadChildren: () => import('./Views/Home/home/home.module').then(m => m.HomeModule), title: 'Home' },
      
      // About & Information Routes
      { path: 'AboutUs', loadChildren: () => import('./Views/Home/AboutUs/AboutUs.module').then(m => m.AboutUsModule), title: 'About RERA' },
      { path: 'OurLeadership', loadChildren: () => import('./Views/Home/OurLeaderships/OurLeaderships.module').then(m => m.OurLeadershipsModule), title: 'Our Leadership' },
      { path: 'AnnualReport', loadChildren: () => import('./Views/Home/AnnualReport/AnnualReport.module').then(m => m.AnnualReportModule), title: 'Annual Report' },
      { path: 'ContactUs', loadChildren: () => import('./Views/Home/contactus/contactus.module').then(m => m.contactusModule), title: 'Contact Us' },
      { path: 'GeneralFAQ', loadChildren: () => import('./Views/Home/GeneralFAQ/GeneralFAQ.module').then(m => m.GeneralFAQModule), title: 'General FAQ' },
      { path: 'DisclaimerAndPolicies', loadChildren: () => import('./Views/Home/DisclaimerAndPolicies/DisclaimerAndPolicies.module').then(m => m.DisclaimerAndPoliciesModule), title: 'Disclaimer & Policies' },
      { path: 'CancellationRefundPolicy', loadChildren: () => import('./Views/Home/CancellationRefundPolicy/CancellationRefundPolicy.module').then(m => m.CancellationRefundPolicyModule), title: 'Cancellation & Refund Policy' },
      
      // Project Related Routes
      { path: 'ProjectList', loadChildren: () => import('./Views/Home/ProjectList/ProjectList.module').then(m => m.ProjectListModule), title: 'Project List' },
      { path: 'ProjectDetail/:id', loadChildren: () => import('./Views/Home/ProjectDetail/ProjectDetail.module').then(m => m.ProjectDetailModule), title: 'Project Details' },
      
      // Registration & Authentication Routes
      { path: 'SSOLogin', loadChildren: () => import('./Views/ssologin/ssologin.module').then(m => m.SSOLoginModule), title: 'SSO Login' },
      { path: 'SSOLogin/:id', loadChildren: () => import('./Views/ssologin/ssologin.module').then(m => m.SSOLoginModule), title: 'SSO Login' },
      { path: 'ScreenReaderAccess', loadChildren: () => import('./Views/Home/ScreenReaderAccess/ScreenReaderAccess.module').then(m => m.ScreenReaderAccessModule), title: 'Screen Reader Access' },
      
      // Agent Related Routes
      { path: 'AgentList', loadChildren: () => import('./Views/Home/AgentList/AgentList.module').then(m => m.AgentListModule), title: 'Agent List' },
      { path: 'ViewAgent/:id', loadChildren: () => import('./Views/Home/ViewAgentNew/ViewAgentNew.module').then(m => m.ViewAgentNewModule), title: 'View Agent' },
      
      // Complaint & Violation Routes
      { path: 'ComplaintDetails', loadChildren: () => import('./Views/Home/complaintdetails/complaintdetails.module').then(m => m.complaintdetailsModule), title: 'Complaint Details' },
      { path: 'PromoterSearch', loadChildren: () => import('./Views/Home/Promotersearch/Promotersearch.module').then(m => m.PromotersearchModule), title: 'Promoter Search' },
      { path: 'ViolationOfAct', loadChildren: () => import('./Views/Home/ViolationofAct/ViolationofAct.module').then(m => m.ViolationofActModule), title: 'Violation of Act' },
      { path: 'ViolationActSummary', loadChildren: () => import('./Views/Home/ViolationActSummary/ViolationActSummary.module').then(m => m.ViolationActSummaryModule), title: 'Violation Act Summary' },
      { path: 'ReplyRespondantResponse', loadChildren: () => import('./Views/Home/ReplyRespondantResponse/ReplyRespondantResponse.module').then(m => m.ReplyRespondantResponseModule), title: 'Response to Complaint' },
      
      // Cause & Order Routes
      { path: 'CauseList', loadChildren: () => import('./Views/Home/CauseList/CauseList.module').then(m => m.CauseListModule), title: 'Cause List' },
      { path: 'CauseList/:type', loadChildren: () => import('./Views/Home/CauseList/CauseList.module').then(m => m.CauseListModule), title: 'Cause List' },
      { path: 'Summary', loadChildren: () => import('./Views/Home/Summary/Summary.module').then(m => m.SummaryModule), title: 'Summary' },
      { path: 'OrderList', loadChildren: () => import('./Views/Home/OrderList/OrderList.module').then(m => m.OrderListModule), title: 'Order List' },
      { path: 'UpdatedDailyCauseList', loadChildren: () => import('./Views/Home/UpdatedDailyCauseList/UpdatedDailyCauseList.module').then(m => m.UpdatedDailyCauseListModule), title: 'Updated Daily Cause List' },
      
      // Tender & Application Routes
      { path: 'TenderList', loadChildren: () => import('./Views/Home/TenderList/TenderList.module').then(m => m.TenderListModule), title: 'Tender List' },
      { path: 'NotificationPDF', loadChildren: () => import('./Views/Home/NotificationPDF/NotificationPDF.module').then(m => m.NotificationPDFModule), title: 'Notifications & Circulars' },
      { path: 'ListApplication', loadChildren: () => import('./Views/Home/ListApplication/ListApplication.module').then(m => m.ListApplicationRoutingModule), title: 'Application Forms' },
      
      // Project Modification Routes
      { path: 'ProjectExtensionView', loadChildren: () => import('./Views/Home/ProjectExtensionView/ProjectExtensionView.module').then(m => m.ProjectExtensionViewModule), title: 'Project Extension' },
      { path: 'ProModSummary', loadChildren: () => import('./Views/Home/ProModSummary/ProModSummary.module').then(m => m.ProModSummaryModule), title: 'Project Modification Summary' },
      { path: 'ViewProject/:id', loadChildren: () => import('./Views/Home/ViewProject/ViewProject.module').then(m => m.ViewProjectModule), title: 'View Project' },
      { path: 'MapSummary', loadChildren: () => import('./Views/Home/MapSumary/MapSumary.module').then(m => m.MapSumaryModule), title: 'Map Summary' },
      
      // Report Routes
      { path: 'APRSummary', loadChildren: () => import('./Views/Home/APRSummary/APRSummary.module').then(m => m.APRSummaryModule), title: 'APR Summary' },
      { path: 'QPRSummary', loadChildren: () => import('./Views/Home/QPRSummary/QPRSummary.module').then(m => m.QPRSummaryModule), title: 'QPR Summary' },
      { path: 'PA_Summary', loadChildren: () => import('./Views/Home/pa-summary/pa-summary.module').then(m => m.PASummaryModule), title: 'Post Registration Summary' },
      { path: 'Special_ModificationProfileSummary', loadChildren: () => import('./Views/Home/special-modification-profile-summary-web-site/special-modification-profile-summary-web-site.module').then(m => m.SpecialModificationProfileSummaryWebSiteModule), title: 'Special Modification Profile Summary' },
      { path: 'EncumSummary', loadChildren: () => import('./Views/Home/encum-summary/encum-summary.module').then(m => m.EncumSummaryModule), title: 'Encumbrance Summary' }
    ]
  },
  
  {
    path: '',
    component: MasterLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // Admin & Assessment Routes
      {
        path: 'Assessment/TestQuestion',
        loadChildren: () => import('./Views/Assessment/AdminLevel/admin-level.module').then(m => m.AssessmentModule),
        title: 'Assessment Questions',
        canActivate: [AuthGuard],
        data: {
          allowedRoles: [EnumRole.SUPERADMIN, EnumRole.STATENODAL]
        }
      },
      {
        path: 'Psychometric/TestQuestion',
        loadChildren: () => import('./Views/Assessment/psychometrictest/psychometric-test.module').then(m => m.PsychometricTestModule),
        title: 'Psychometric Tests',
        canActivate: [AuthGuard],
        data: {
          allowedRoles: [EnumRole.SUPERADMIN, EnumRole.STATENODAL]
        }
      },
      {
        path: 'JobSeeker/AssessmentTest',
        loadChildren: () => import('./Views/Assessment/JoseekerAssessment/Joseeker-assessment.module').then(m => m.JoseekerAssessmentModule),
        title: 'Job Seeker Assessment',
        canActivate: [AuthGuard],
        data: {
          allowedRoles: [EnumRole.JOBSEEKER]
        }
      },
      
      // Utility Routes
      {
        path: 'Loader',
        loadChildren: () => import('./Views/Shared/loader/loader.module').then(m => m.LoaderModule)
      }
    ]
  },
  
  // Error Handling Routes
  {
    path: 'not-authorized',
    loadComponent: () => import('./Views/errors/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent),
    title: 'Access Denied'
  },
  
  // Wildcard Route for 404
  { 
    path: '**', 
    loadComponent: () => import('./Views/errors/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent), 
    title: '404 - Page Not Found' 
  }
];