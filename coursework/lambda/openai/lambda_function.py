import json
import os
import boto3
from openai import OpenAI

def lambda_handler(event, context):
    openai_api_key = os.environ.get('OPENAI_API_KEY')

    # Check if 'body' key exists and is not empty
    if 'body' not in event or not event['body']:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Request body is missing or empty'})
        }

    try:
        # First, parse the JSON from the event's 'body'
        outer_body = json.loads(event['body'])
        # Then, parse the JSON from the nested 'body' within the original 'body'
        if 'body' in outer_body:
            data = json.loads(outer_body['body'])
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Nested body key is missing in request body'})
            }
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid JSON format in request body'})
        }

    client = OpenAI(api_key=openai_api_key)

    no_preferences = 'No preferences'
    print(f"Data: {data}")

    budget = data.get('budget', no_preferences)
    temperature = data.get('temperature', no_preferences)
    specifics = data.get('specifics', no_preferences)
    popularity = data.get('popularity', no_preferences)
    additional_info = data.get('text', no_preferences)

    print(f"Budget: {budget}, Temperature: {temperature}, Specifics: {specifics}, Popularity: {popularity}, Additional Info: {additional_info}")

    gpt_input = (
        "Please recommend the best city to visit based on the following preferences: "
        "Budget is {}, "
        "temperature preference is {}, "
        "they prefer {}, "
        "and the destination's popularity should be {}. "
        "They also mentioned: {}."
    ).format(budget, temperature, specifics, popularity, additional_info)

    user_gpt_input = gpt_input + (
        "Please give me info in json format like "
        "{'country': *country that you give*, "
        "'city' : *city that you give*, "
        "'description': *your generate info*}"
    )

    print(f"User data: {user_gpt_input}")

    user_message = {
        "role": "user",
        "content": user_gpt_input
    }

    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[user_message]
        )
        gpt_response = completion.choices[0].message.content

        print(f"GPT response: {gpt_response}")

        gpt_response_data = json.loads(gpt_response)

        default_value = 'Wrong openapi response'

        country = gpt_response_data.get('country', default_value)
        city = gpt_response_data.get('city', default_value)
        description = gpt_response_data.get('description', default_value)

        print(f"Country: {country}")
        print(f"Description: {description}")

        lambda_client = boto3.client('lambda')

        payload = json.dumps({
            'country': country,
            'city': city,
            'description': description,
            'budget': budget,
            'temperature': temperature,
            'specifics': specifics,
            'popularity': popularity
        })

        response = lambda_client.invoke(
            FunctionName='saveOpenApiResponse',
            InvocationType='Event',
            Payload=payload
        )

        return {
            'statusCode': 200,
            'body': payload
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
