import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { share } from 'rxjs/operators';
import { ApplicationService } from "./application.service";
import { SessionService } from "./session.service";
import { RouteParam } from "../../models/route-param.model";
import { Policy } from "../../models/policy.model";

@Injectable({
  providedIn: "root",
})
export class ClientService {

  public idStream = new Subject();

  constructor(private http: HttpClient, private conf: ApplicationService, private session: SessionService) { }

  demoToken() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/token`);
  }

  verifyUser(payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/user/verify`, payload);
  }
  confirmUser(hashEmail: string, token: string, payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/user/${hashEmail}/${token}/confirm`, payload);
  }
  start(hashemail?: string, certificateRequestId?: any) {
    if (certificateRequestId && hashemail) {
      return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${hashemail}/${certificateRequestId}`);
    }
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session`);
  }
  getSteps(payload: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow`,
      payload
    ).pipe(share());
  }
  getRequirements(country: any) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3
      }/api/session/${this.session.getSessionId()}/requirement?country=${country}`
    );
  }
  confirmRequirements() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/requirements`
    );
  }
  moveToStep(id: string) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow/move?id=${id}`
    );
  }
  nextStep(params: RouteParam[]) {
    if (!params) {
      return this.http.get(
        `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow/next`
      );
    } else {
      return this.http.get(
        `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/workflow/next?${params[0].key
        }=${params[0].value}`
      );
    }
  }
  getContacts() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/contact`);
  }
  sendContacts(payload: any, contactId: any, userId?: any) {
    if (!userId) {
      return this.http.post(
        `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/contact/${contactId}`,
        payload
      );
    } else {
      return this.http.post(
        `${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/contact/${contactId}`,
        payload
      );
    }
  }
  getCertificatePolicy(userId: any) {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/certificate/policy`);
  }
  saveCertificatePolicy(userId: any, payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/certificate/policy`, payload);
  }
  validateStep(hashemail: string, token: string, certficiateRequestId?: any): any {
    if (!certficiateRequestId && hashemail && token) {
      return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/user/${hashemail}/${token}`);
    }
    if (certficiateRequestId && hashemail && token) {
      return this.http.get(
        `${this.conf.appConfig.network.hostApiV3}/api/user/${hashemail}/${token}/${certficiateRequestId}`
      );
    }
    if (!certficiateRequestId && !hashemail && token) {
      return this.http.get(
        `${this.conf.appConfig.network.hostApiV3}/api/agent/${token}`
      );
    }
  }
  getContryList() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/country`);
  }
  setCertificateCountry(country: string) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/country`,
      {
        country,
      }
    );
  }
  getCertificateCountry() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/country`
    );
  }
  getProvinceList(country: any) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3
      }/api/session/${this.session.getSessionId()}/province?country3code=${country}`
    );
  }
  getCityList(country: string, province: string) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3
      }/api/session/${this.session.getSessionId()}/city?country3code=${country}&provinceCode=${province}`
    );
  }
  getCountry(lat: number, lon: number) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3
      }/api/session/${this.session.getSessionId()}/country?lat=${lat}&lon=${lon}`
    );
  }
  getPolicyList(country: string) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/policy?country=` + country
    );
  }
  getWorkingData(type: string) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/data?type=` + type
    );
  }
  getDocument() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/document`
    );
  }
  getSelfie() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/selfie`);
  }
  policyChecked(list: Policy[]) {
    const result: {data: any[]} = { data: [] };
    list.forEach((element) => {
      result.data.push({ idCode: element.idCode, checked: element._checked });
    });
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/policy`,
      result
    );
  }

  compareFaces(data: any): any {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/selfie`,
      data
    );
  }

  saveSelfie(payload: any) {
    payload.excludeCompareFaces = true;
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/selfie`,
      payload
    );
  }

  userChecked() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV2}/api/session/${this.session.getSessionId()}/user_checked`
    );
  }
  checkDocumentStep() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/document/check`
    );
  }
  checkPersonalDataStep() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/personaldata/check`
    );
  }
  checkCallStep() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/call/check`
    );
  }
  checkWaitConfirmEmailStep() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/waitemail/check`
    );
  }
  sendDocs(payload: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/document`,
      payload
    );
  }

  doclist(code: any) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3
      }/api/session/${this.session.getSessionId()}/documents?citizenship=${code}`
    );
  }
  sendMobileDocs(payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/document/mobile`, payload);
  }
  sendDocument(payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/document`, payload);
  }
  bandwidth() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV2}/api/bandwidth`);
  }

  sendProofOfResidence(userId: any, payload: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/proofofresidence`,
      payload
    );
  }

  deleteUser(qs: any) {
    return this.http.delete(`${this.conf.appConfig.network.hostApiV2}/api/user?${qs}`);
  }
  getCaptcha() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV2}/api/captcha`);
  }
  getCountries() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV2}/api/countries`);
  }
  saveUser(data: any): any {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/user`,
      data
    );
  }
  agreeRecording(userId: any, onboardingId: any): any {
    return this.http.put(
      `${this.conf.appConfig.network.hostApiV2}/api/user/${userId}/onboarding/${onboardingId}/agree`,
      {}
    );
  }
  refuseRecording(userId: any, onboardingId: any): any {
    return this.http.put(
      `${this.conf.appConfig.network.hostApiV2}/api/user/${userId}/onboarding/${onboardingId}/refuse`,
      {}
    );
  }
  abortOnboarding(userId: any, onboardingId: any, motivation: any): any {
    return this.http.put(
      `${this.conf.appConfig.network.hostApiV2}/api/user/${userId}/onboarding/${onboardingId}/abort`,
      {
        motivation,
      }
    );
  }
  createSession(data: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV2}/api/video/sessions`, data);
  }
  deleteSession(session: any) {
    return this.http.delete(`${this.conf.appConfig.network.hostApiV2}/api/video/sessions/` + session);
  }
  createToken(data: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV2}/api/video/tokens`, data);
  }
  continueOnboarding(userId: any, token: any): any {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/${token}`, {});
  }
  confirmCertificateTerms(userId: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/certificate/terms`, {});
  }
  issue(userId: any, payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/certificate/issue`, payload);
  }
  geyValidityDate(userId: any) {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/certificate/expirydate`);
  }
  geyValidityInfo(userId: any) {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/validity`);
  }
  requestNebulaOtp(userId: any, payload?: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/certificate/requestotp`,
      payload
    );
  }

  requestOtp() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/otp`
    );

  }

  createLiveness(userId: any, data: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/liveness`,
      data
    );
  }

  sendEmailOtp(payload: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/user/email`,
      payload
    );
  }
  requestEmailOtp() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/user/email`
    );
  }
  sendFeedback(userId: any, payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/feedback`, payload);
  }

  getPerson() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV2}/api/person`);
  }

  getFormType(userId?: any) {
    if (userId) {
      return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/form`);
    } else {
      return this.http.get(
        `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/form`
      );
    }
  }

  sendFormData(userId: any, data: any): any {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/form`, data);
  }

  requestFormOtp(userId: any) {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/form/otp`);
  }

  confirmFormOtp(userId: any, payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/user/${userId}/form/otp`, payload);
  }


  getCertificateTypes() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/ra-policy/list`);
  }
  getPolicyParams() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/ra-policy/params`);
  }
  setPolicyParams(payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/params`, { policyParams: payload });
  }
  requestCertificate(data: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/request`,
      {
        certificateType: data
      }
    );
  }
  fixOcrData(data: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/document/fixocr`,
      data
    );
  }
  checkNebulaUser() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/nebula/checkuser`);
  }
  getCertificateRequirements() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/requirement`);
  }
  sendCertificateDocs(payload: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/document`,
      payload
    );
  }

  getCertificateTerms() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/terms`).pipe(share());
  }
  sendCodes(payload: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/terms/sign`, payload);
  }
  getAdditionalDocument() {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/additional`);
  }
  signAdditionalDocument(pin: any) {
    return this.http.post(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/additional/sign`, {
      pin
    });
  }
  retriveCertificateDocument(type = "certificate" || "additional") {
    return this.http.get(`${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/document/${type} `);
  }


  getSessionCertificateRequest() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/request`
    );
  }
  getSessionCertificateRequestDocument() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/request/document`
    );
  }
  setSessionCertificateRequestStatus(action: any, reason = '') {
    const payload = {
      action: action,
      reason: reason
    }
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/request/complete`, payload
    );
  }

  saveDoctor(payload: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/user/update`,
      payload
    );
  }

  searchDoctor(key: any) {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/omc/search/` + key
    );
  }

  signTcFile(type: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/terms/sign/` + type, {}
    );

  }

  verifySign() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/nebula/verify/sign`
    );
  }

  getCertificateProfile() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/certificate/request/profile`
    );
  }

  getFullWorkingData() {
    return this.http.get(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/data`
    );
  }

  setUserId(userId: any) {
    return this.http.post(
      `${this.conf.appConfig.network.hostApiV3}/api/session/${this.session.getSessionId()}/user/id`, { userId }
    );
  }
}
