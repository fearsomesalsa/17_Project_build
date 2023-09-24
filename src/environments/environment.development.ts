export const environment = {
  production: false, // добавила свойство вручную, т.к. angular cli генерирует пустой объект. тут значения наоборот, т.к. этот файл environment.development.ts - значит дев
  //   apiURL: 'http://localhost:3000/', // допустим это бэкенд, который мы запускаем локально
  apiURL: 'https://testologia.site/', // вернем норм домен, чтобы эта сборка тоже работала
};
