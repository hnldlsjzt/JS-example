async function request(URL, params = {}) {
  const token = document.cookie
    .split(";")
    .filter((item) => item.includes("token"))?.[0]
    .split("=")?.[1];
  const requestOptions = {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9",
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua":
        '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-token": token,
    },
    referrer: "https://app-center-frontend-test.mysre.cn/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: params,
    method: "POST",
    mode: "cors",
    credentials: "omit",
  };
  const data = await fetch(URL, requestOptions).then((res) => res.json());
  return data;
}

async function getLog(id) {
  const { errcode, data } = await request(
    `https://app-center-test.mysre.cn/web-version/get-image-build-log?id=${id}`
  );

  if (
    errcode === 0 &&
    (data?.status === "构建成功" || data?.status !== "构建中")
  ) {
    return data;
  }
  return false;
}

async function loopFecth(id, callback) {
  setTimeout(async () => {
    const res = await callback(id);
    if (!res) {
      loopFecth(id, callback);
    } else {
      console.log("构建完成", res?.status);
      window.location.reload();
    }
  }, 10000);
}

const addImage = "https://app-center-test.mysre.cn/web-version/add-image";
const { errcode, errmsg, data } = await request(
  addImage,
  "applicationCode=ziguanassetmap&nodeImage=&appCode=AppSmartYkj&tagBranch=T1&runEnv=test&remark=&clearCache=0&resourceUrl=&uploadFast=false&sourceMap=none"
);
if (errcode === 0) {
  console.log("构建成功~", data?.id);
  const status = await getLog(data?.id);
  if (!status) {
    loopFecth(data?.id, getLog);
  }
} else {
  console.error("构建失败：", errmsg);
}

// 获取发布版本 并发布
async function getVersionList() {
  const { errcode, data } = await request(
    "https://app-center-test.mysre.cn/version/get-list?appCode=AppSmartYkj&simple=1"
  );
  if (errcode === 0 && data) {
    return data;
  }
  return [];
}
// 获取发布版本 并发布
async function publisb(imageId) {
  var urlencoded = new URLSearchParams();
  urlencoded.append("platform", o);
  urlencoded.append("tenant_code", o);
  urlencoded.append("account", o);
  urlencoded.append("passwd", "1QAZ2wsx");
  urlencoded.append("account_type", "username");
  const versionList = await getVersionList();
  const params =
    "appList%5B0%5D=0&platform=global&silent=0&rule=%7B%22userId%22%3A%5B%5D%2C%22account%22%3A%5B%5D%2C%22tenantCode%22%3A%5B%5D%7D&updateInfo=%20&imageId=e2aeee62-252c-11ed-bbe0-9eaa421d2e3f&updateLog=%20&appVersion=%7B%22AppSmartYkj%22%3A%5B%221.1.0%22%2C%221.0.9%22%2C%221.0.8%22%2C%221.0.7%22%2C%221.0.6%22%2C%221.0.2%22%2C%221.0.0%22%5D%7D&sort=2";
  const { errcode, data } = await request(
    "https://app-center-test.mysre.cn/web-version/publish-image"
  );
  if (errcode === 0 && data) {
  }
}
