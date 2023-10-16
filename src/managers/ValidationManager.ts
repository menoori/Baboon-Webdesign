export class ValidationManager {
  constructor() {}

  getRegex = (
    regexValidation:
      | "tel"
      | "email"
      | "soc-sec"
      | "password"
      | "swe-car-plate"
      | "url"
      | RegExp
  ): RegExp | null => {
    switch (regexValidation) {
      case "soc-sec":
        return /^(19|20|21)?[0-9]{6}[-]?[0-9]{4}$/;
      case "tel":
        return /^[0-9]{8,13}$/;
      case "password":
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      case "swe-car-plate":
        return /^[a-zA-Z]{3}([0-9]{3}|[0-9]{2}[a-zA-Z])$/;
      case "email":
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      case "url":
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      default:
        return regexValidation;
    }
  };
}
