import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "connect": "Connect wallet",
      "disconnect": "Disconnect",
      "please-install": "Please install MetaMask",
      "reserved": "All rights reserved",
      "change": "Change",
      "net-to-main": "network on the BSC mainnet",
      "connect-and-choise": "Connect your wallet and select the contract",
      "contract": "Contract",
      "choised-deposit": "Selected deposit",
      "current-stage": "Current stage",
      "token-on-deposit": "Number of tokens on deposit",
      "total-stages": "Total number of stages",
      "until-next-stage": "Days until the next stage",
      "stages-completed": "All stages are completed",
      "successufuly-send": "Your tokens have been successfully sent to the wallet",
      "enough-funds": "Your tokens have not been sent to the wallet because you do not have enough funds",
      "not-made-deposit": "You have not made a deposit at this stage",
      "available-tokens": "Number of available tokens to receive",
      "get-coins": "Get coins",
      "token-name": "Token name",
      "token-contract": "Token contract",
      "total-steps": "Total steps"
    }
  },
  ru: {
    translation: {
      "connect": "Подключить кошелек",
      "disconnect": "Отключиться",
      "please-install": "Пожалуйста, установите MetaMask",
      "reserved": "Все права защищены",
      "change": "Измените",
      "net-to-main": "сеть на основную binance",
      "connect-and-choise": "Подключите кошелек и выберите нужный контракт",
      "contract": "Контракт",
      "choised-deposit": "Выбранный депозит",
      "current-stage": "Текущий этап",
      "token-on-deposit": "Количество токенов на депозите",
      "total-stages": "Общее количество этапов",
      "until-next-stage": "Дней до следующего этапа",
      "stages-completed": "Все этапы завершены",
      "successufuly-send": "Ваши токены были успешно отправлены на кошелек",
      "enough-funds": "Ваши токены не были отправлены на кошелек, так как у вас недостаточно средств",
      "not-made-deposit": "Вы не внесли депозит на данном этапе",
      "available-tokens": "Количество доступных токенов к получению",
      "get-coins": "Получить монеты",
      "token-name": "Имя токена",
      "token-contract": "Контракт токена",
      "total-steps": "Общее количество этапов"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru",

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;
