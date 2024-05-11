## Завдання
1. Створити lambda функцію в AWS
2. Функція повинна зчитувати дані з файлу (input.txt )
3. Обрати колонку GPA з файлу і розрахувати середнє статистичне значення за колонкою
4. Функція повинна повертати розраховане середнє статистичне значення
5. Надати права доступу до Lambda функції для лектора

---

> ### 1. Create a Virtual Environment
#### Install virtualenv if not already installed
```terminal
pip install virtualenv
```
#### Create a new virtual environment in your project folder
```terminal
virtualenv venv
```

#### Activate the virtual environment
```terminal
source venv/bin/activate
```

---

> ### 2. Install Dependencies

```terminal
pip install -r requirements.txt
```

---
> ### 3. Package Your Application
```terminal
cd venv/lib/python3.x/site-packages/  # Replace 'python3.x' with your Python version
```

```terminal
zip -r9 ${OLDPWD}/deployment_package.zip .
```

```terminal
cd -
```

```terminal
zip -g deployment_package.zip lambda_function.py  # Add your Lambda function file
```

---

> ### 4. Deploy Your Application by a command or using AWS Console
> Replace `YourLambdaFunction`
```aws
aws lambda update-function-code --function-name YourLambdaFunction --zip-file fileb://deployment_package.zip
```
