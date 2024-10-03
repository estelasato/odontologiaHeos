import { format } from "date-fns";

export type MaskFunctions = {
  [key: string]: (value: string) => string;
};

const masks: MaskFunctions = {
  unmask: (value) => value.replace(/[^a-zA-Z0-9]/g, ""),
  number: (value) => value.replace(/\D/g, ""),
  state: (value) => value.replace(/\d/, ""),
  hour: (value) =>
    String(value)
      .replace(/\D/, "")
      .replace(/(\d{2})(\d)/, "$1:$2"),
  showHour: (value) => {
    value = String(value);
    return value.length === 3
      ? value.replace(/(\d{1})(\d)/, "$1h$2")
      : value.replace(/(\d{2})(\d)/, "$1h$2");
  },
  documento: (value) => {
    if (value.length < 15) {
      return masks.cpf(value);
    } else {
      return masks.cnpj(value);
    }
  },
  cpf: (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"),
  rg: (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{1})\d+?$/, "$1"),
  cnpj: (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"),
  pis: (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{5})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{5})\.(\d{2})(\d)/, "$1.$2.$3-$4")
      .replace(/(-\d{1})\d+?$/, "$1"),
  zipcode: (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1"),
  phone: (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{5})\d+?$/, "$1"),
  cell: (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1"),
  currency: (value) => {
    if (value.replace(/\D/g, "") !== "")
      return (parseInt(value.replace(/\D/g, ""), 10) / 100).toLocaleString(
        "pt-BR",
        {
          minimumFractionDigits: 2,
          style: "currency",
          currency: "BRL",
        }
      );

    return "0,00";
  },
  partialCurrency: (value) => {
    const string = value.toString();

    if (string.replace(/\D/g, "") !== "")
      return (parseInt(string.replace(/\D/g, ""), 10) / 100).toLocaleString(
        "pt-BR",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2, // Garante sempre 2 casas decimais
        }
      );

    return "0,00";
  },
  currencyAllPlatforms: (value) => {
    if (Number(value)) {
      const [currency, cents] = (Number(value) / 100)
        .toFixed(2)
        .toString()
        .split(".");

      return `R$ ${currency.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${cents}`;
    }
    return `R$ 0,00`;
  },
  percentage: (value) => {
    let number = Number(String(value).replace(/\D/g, ""));
    if (number > 100) number = 100;
    return `${number}%`;
  },
  percentageWithSinal: (value) => {
    let number = Number(String(value).replace(/\D/g, ""));
    if (number > 100) number = 100;
    const sinal = value.includes("-") ? "-" : "+";

    return `${sinal}${number}%`;
  },
  creditCard: (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(.\d{4})\d+?$/, "$1"),

  creditCardDate: (value) => {
    value = value
      .replace(/\D/g, "")
      .replace(/([\d]{4})/, "$1")
      .replace(/([\d]{4})[\d]+?$/, "$1")
      .replace(/([\d]{2})([\d]{1})/, "$1/$2");
    const dates = value.split("/");
    if (dates.length) {
      if (parseInt(dates[0], 10) > 12) dates[0] = "12";
      return dates.join("/");
    }
    return value;
  },
  cvv: (value) =>
    value
      .replace(/[^\d]/g, "")
      .replace(/([\d]{4})/, "$1")
      .replace(/([\d]{4})[\d]+?$/, "$1"),

  removeSpecialCharacters: (value) => {
    const cleaned = value.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
    return cleaned;
  },

  convertDateISO: (value) => {
    return new Date(value)
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("-");
  },
  convertToDateAndTime: (value) => {
    return format(new Date(value), "dd/MM/yyyy - HH:mm");
  },
  convertToDateString: (value) => {
    return format(new Date(value), "dd/MM/yyyy");
  },
};

export default masks;
