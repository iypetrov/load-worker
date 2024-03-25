import { authProviderURL } from "./target";

interface AuthResponse {
  access_token: string;
  token_type: string;
  id_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
}

export function getAuthToken(
  client_id: string,
  client_secret: string,
  username: string,
  password: string
): Promise<string> {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
  params.append("username", username);
  params.append("password", password);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return fetch(authProviderURL, {
    method: "POST",
    headers: headers,
    body: params.toString(),
  })
    .then((respose) => respose.json())
    .then((responseJson) => {
      const xsuaa = responseJson as AuthResponse;
      return xsuaa.access_token;
    })
    .catch((error) => {
      throw error;
    });
}
