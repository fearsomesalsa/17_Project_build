import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'wordUpper'
})
export class WordUpperPipe implements PipeTransform {
    
    // transform(value: string, wordPart: string): string { // в параметр value попадает product.description, в wordPart корень слова, по которому будет происходить поиск
    //     return value.replace(new RegExp('[А-Яа-я]*' + wordPart + '[а-я]*', 'g'), (match: string) => { // 1 параметр для replace - регулярка, по которой мы найден нужные слова, 2 параметр - функция, которая должна сработать для каждого найденного варианта и вернет то значение, на которое нужно заменить
    //         return match.toUpperCase();
    //     });
    // }

    // переделаем функцию под 3 параметра (1-описание, 2 и 3-корни)
    // transform(value: string, wordPart1: string, wordPart2: string): string { // в параметр value попадает product.description, в wordPart корень слова, по которому будет происходить поиск
    //     let result = value;
        
    //     [wordPart1, wordPart2].forEach(item => {
    //         result = result.replace(new RegExp('[А-Яа-я]*' + item + '[а-я]*', 'g'), (match: string) => { // 1 параметр для replace - регулярка, по которой мы найден нужные слова, 2 параметр - функция, которая должна сработать для каждого найденного варианта и вернет то значение, на которое нужно заменить
    //             return match.toUpperCase();
    //         });
    //     })
    //     return result;
    // }

    // переделаем функцию под массив
    transform(value: string, wordParts: string[]): string { // в параметр value попадает product.description, в wordPart корень слова, по которому будет происходить поиск
        let result = value;
        
        wordParts.forEach(item => {
            result = result.replace(new RegExp('[А-Яа-я]*' + item + '[а-я]*', 'g'), (match: string) => { // 1 параметр для replace - регулярка, по которой мы найден нужные слова, 2 параметр - функция, которая должна сработать для каждого найденного варианта и вернет то значение, на которое нужно заменить
                return match.toUpperCase();
            });
        })
        return result;
    }
}