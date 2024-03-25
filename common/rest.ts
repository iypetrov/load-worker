export function getAuthorizationParams(token: string) {
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return params;
}
