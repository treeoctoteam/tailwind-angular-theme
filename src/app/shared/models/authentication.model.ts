export interface Authentication {
  enableAuthentication: boolean;
  authenticationMode: "JWT" | "Cookie";
}