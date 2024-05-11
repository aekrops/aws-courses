## Завдання
1. Створити таблицю Users в DynamoDB
2. Таблиця повинна містити 5 колонок: id, name (String), surname (String), position (String), salary (Integer) 
3. Primary index повинен посилатись на колонку id
4. Partition key повинен повинен посилатись на колонку name
5. Створити local secondary index для колонки salary
6. Створити 5 користувачів в таблиці Users
7. Надати права доступу до таблиці для лектора