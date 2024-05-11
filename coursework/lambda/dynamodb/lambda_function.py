import json
import boto3
from botocore.exceptions import ClientError


def lambda_handler(event, context):
    country = event.get('country')
    city = event.get('city')
    description = event.get('description')
    budget = event.get('budget')
    temperature = event.get('temperature')
    specifics = event.get('specifics')
    popularity = event.get('popularity')

    if not country or not city:
        return {'statusCode': 400, 'body': json.dumps('Country or city missing in the input')}

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('RecommendedPlaces')

    try:
        response = table.put_item(
            Item={
                'country': country,
                'city': city,
                'description': description,
                'budget': budget,
                'temperature': temperature,
                'specifics': specifics,
                'popularity': popularity
            },
            ConditionExpression='attribute_not_exists(country) AND attribute_not_exists(city)'
        )
        return {'statusCode': 200, 'body': json.dumps('Record added successfully')}
    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            return {'statusCode': 409, 'body': json.dumps('Record already exists')}
        else:
            return {'statusCode': 500, 'body': json.dumps('Error adding record to DynamoDB')}
