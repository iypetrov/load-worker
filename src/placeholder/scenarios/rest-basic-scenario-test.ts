import { Options } from "k6/options";
import http from "k6/http";
import { sleep } from "k6";
import { getAuthToken } from "common/auth";
import { getAuthorizationParams } from "common/rest";
import { getRandomNumberInRange } from "common/util";
import { getTargetURL } from "common/target";

export let options: Options = {
  scenarios: {
    shared_iter_scenario: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 100,
      startTime: "0s",
    },
    per_vu_scenario: {
      executor: "per-vu-iterations",
      vus: 10,
      iterations: 10,
      startTime: "10s",
    },
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
      )}/placeholder/${getRandomNumberInRange(1, 130)}`,
      params: params,
    },
  ]);

  sleep(1);
}
