export const authProviderURL: string =
  "https://besudb-dev.authentication.eu20.hana.ondemand.com/oauth/token";

export enum TargetDestination {
  DEV = "DEV",
  TEST = "TEST",
  STAGING = "STAGING",
  PROD = "PROD",
}

type TargetDestinationURLs = {
  [key in TargetDestination]: string;
};

export const targetURLs: TargetDestinationURLs = {
  [TargetDestination.DEV]: "http://localhost:8080",
  [TargetDestination.TEST]: "https://test.com",
  [TargetDestination.STAGING]: "https://staging.com",
  [TargetDestination.PROD]: "https://prod.com",
};

export function getTargetURL(targetString: string): string {
  var trg: TargetDestination =
    TargetDestination[targetString as keyof typeof TargetDestination];
  if (trg !== undefined) {
    return targetURLs[trg];
  }
  return targetURLs[TargetDestination.TEST];
}
