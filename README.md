# taslife api
## Endpoint - https://povertay.com.ua/api/taslife/create
## TEST endpoint - https://povertay-test.herokuapp.com/api/taslife/create
>**Method** - POST

>**Request params type** - JSON

>**Body encription** - AES-256-cbc
>
> *Development AES key* - ```doIPlFDFMfwsnJgIchmDxNUyl4pdq1z3IeLflKRtVu8=```

>**Parameters:**
- first_name - имя  ```string(255)```  *(required)*
- last_name - фамилия  ```string(255)``` *(required)*
- middle_name - отчество ```string(255)``` *(optional)*
- inn - ИНН  ```string(10)``` *(required)*
- zip - почтовый индекс ```string(5)``` *(required)*
- district - область ```string(255)``` *(required)*
- city - город ```string(255)``` *(required)*
- street_name - улица ```string(255)``` *(required)*
- street_number - номер дома ```string(10)``` *(required)*
- appartment_number - номер квартиры ```string(10)``` *(optional)*
- phone_number - номер телефона ```string(12)```, format - ```380XXXXXXXXX``` *(required)*
- email - почтовый ящик ```string(255)``` *(required)*
- insurance - данные о страховках клиента и его родственников ```array of objects```: *(required)*
  ```
  {
    inn - string(10),
    payment_sum - float,
    contract_issue_date - string(10), format DD.MM.YYYY
  }
  ```
### Пример:
```
{
first_name: "Дмитро",
last_name: "Гусєв",
middle_name: "Сергійович",
inn: "1234567890",
zip: "12345",
district: "м. Київ",
city: "Київ",
street_name: "Хрещатик",
street_number: "1а",
appartment_number:"12",
phone_number: "380987552855",
email:"info@povertay.com.ua",
insurance:[
    {
      inn:"1234567890",
      payment_sum: 10000.00,
      contract_issue_date: "15.12.2016"
    },
    {
      inn:"5555555555",
      payment_sum: 5000.00,
      contract_issue_date: "05.02.2016"
    }
  ]
}
```

## Response

> ## Success: Возвращается строка с адресом для перенаправления клиента
>
> **Code** - 200
>
> **Body**:
>
> url - ```string(255)```
>
> Пример: 
>
> ```Status Code: 200 OK```
>
> ```Connection: closed```
>
> ```Content-Type: application/json; charset=utf-8```
> 
> ```Body: {url:https://povertay.com.ua/taslife/5d3e95e22ac7f90017fe5577}```

> ## Error 
>
> **Code** - 400
>
> **Body**: Массив всех полей содержащих ошибку
>
> Например:
>
> ```Status Code: 400 Bad Request ...```
>
> ```Body: {[first_name, email]}```
