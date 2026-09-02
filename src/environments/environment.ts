export const environment = {
  production: false,
  development: true,
  staging: false,
  apiUrls: {
    "BaseURL": "http://localhost:5024/api/web/",
    "BaseURLMvc": "http://localhost:4558/",
    "DocumentPath": "https://reraapp.rajasthan.gov.in/",
    //"DocumentPath": "http://localhost:4558/",
    SSOAuthenticationURL: 'http://localhost:4200/',
    BacktoSSOURL: 'http://localhost:4200/login',
    BacktoSSOURL_Logout: 'http://localhost:4200/login',
    RootPathURL: 'http://localhost:4200/',
    StaticFileRootPathURL: 'http://localhost:4200/StaticFiles/',
    SSOURL: 'http://localhost:4200/login',
    RPPRequstURL: 'http://uat.rpp.rajasthan.gov.in/payments/v1/init',
    SystemGeneratedPDFPathURL: 'http://localhost:4200/SystemGeneratedPDF/',
    WebURL: 'http://localhost:5024/api/web/',
    VisitorCountAPI: 'http://localhost:5000/api/Home/GetVisitorCount'
  },
  appName: 'RERA',
  sessionTime: '600'
};
