const isEmpty = (obj) => obj === null || obj === "" || obj === undefined;

function formatNumberRgx(v, _opts) {
  const opts = Object.assign(
    {
      placeholder: "-",
      checkUnit: false,
      checkEffectNum: true,
      floatLength: 0,
      thousand: ",",
      decimal: ".",
      retainDecimal: false, // 是否保留小数位
    },
    _opts || {}
  );

  if (isEmpty(v)) {
    if (opts.checkUnit) {
      return {
        value: opts.placeholder || "-",
      };
    }
    return opts.placeholder || "-";
  }

  if (Number.isNaN(+v)) {
    return v;
  }

  const { floatLength } = opts;
  const negative = Number(v) < 0 ? "-" : "";
  const numberArray = v.toString().split(".");
  let base = Math.abs(parseInt(numberArray[0], 10)).toString();
  let decimal = numberArray[1] || "";
  console.log("numberArray: ", numberArray);

  // 补齐小数位数
  if (floatLength) {
    if (typeof floatLength === "object") {
      const { max, min } = floatLength;
      const p =
        decimal.length > max
          ? max
          : decimal.length < min
          ? min
          : decimal.length;
      const [, second] = parseFloat(`0.${decimal}`).toFixed(p).split(".");
      if (max) {
        decimal = second;
      } else {
        base = Math.abs(
          parseFloat(Math.round(Number(v)).toString())
        ).toString();
        decimal = "";
      }
    } else {
      [, decimal] = parseFloat(`0.${decimal}`).toFixed(floatLength).split(".");
    }
  } else {
    console.log("base--- before,", base);
    // base = Math.abs(parseInt(Number(v).toString())).toString();
    console.log("base--- after", base);
    if (!opts.retainDecimal) {
      decimal = "";
    }
  }

  // 开启单位换算
  let unit = "";
  if (opts.checkUnit) {
    const len = base.length;
    if (len > 8) {
      // eslint-disable-next-line no-mixed-operators
      [base, decimal] = (parseInt(base, 10) / 10 ** 8).toFixed(2).split(".");
      unit = "亿";
    } else if (len > 4) {
      // eslint-disable-next-line no-mixed-operators
      [base, decimal] = (parseInt(base, 10) / 10 ** 4).toFixed(2).split(".");
      unit = "万";
    }
  }

  const mod = base.length > 3 ? base.length % 3 : 0;

  console.log(
    "v, decimal, opts.checkEffectNum: ",
    v,
    decimal,
    opts.checkEffectNum
  );
  console.log("decimal: ", decimal);

  if (opts.checkEffectNum && decimal && !opts.retainDecimal) {
    while (decimal.length > 2) {
      if (decimal.endsWith("0")) {
        decimal = decimal.substr(0, decimal.length - 1);
      } else {
        break;
      }
    }
  }

  if (opts.checkUnit) {
    return {
      value: `${negative}${
        mod ? `${base.substr(0, mod)}${opts.thousand}` : ""
      }${base.substr(mod).replace(/(\d{3})(?=\d)/g, `$1${opts.thousand}`)}${
        decimal ? `${opts.decimal}${decimal}` : ""
      }`,
      unit,
      floatLength: decimal?.length,
    };
  }

  console.log("negative: ", negative, base, decimal);
  return `${negative}${
    mod ? `${base.substr(0, mod)}${opts.thousand}` : ""
  }${base.substr(mod).replace(/(\d{3})(?=\d)/g, `$1${opts.thousand}`)}${
    decimal ? `${opts.decimal}${decimal}${unit}` : ""
  }`;
}

console.log(
  formatNumberRgx("106086.7788", {
    retainDecimal: true,
    // floatLength: { min: 2, max: 4 },
    checkUnit: true,
  })
);
