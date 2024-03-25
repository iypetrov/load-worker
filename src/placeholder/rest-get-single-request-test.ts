import { Options } from "k6/options";
import http from "k6/http";
import { getAuthToken } from "common/auth";
import { getAuthorizationParams } from "common/rest";
import { getRandomNumberInRange } from "common/util";
import { getTargetURL } from "common/target";

export let options: Options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [{ duration: "10s", target: 100 }],
  thresholds: {
    http_req_duration: ["p(99)<200"],
  },
};

export function setup() {
  try {
    const token = async () => {
      await getAuthToken(
        __ENV.CLIENT_ID,
        __ENV.CLIENT_SECRET,
        __ENV.USERNAME,
        __ENV.PASSWORD
      );
      return { data: token };
    };
  } catch (error) {
    console.error("error auth:", error);
  }
}

export default function (data: any) {
  const params = getAuthorizationParams(data);

  http.batch([
    {
      method: "GET",
      url: `${getTargetURL(
        __ENV.ENVIRONMENT
      )}/placeholder/${getRandomNumberInRange(1, 150)}`,
      params: params,
    },
  ]);
}