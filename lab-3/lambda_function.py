import requests
import json


def lambda_handler(event, context):
    file_path = 'https://raw.githubusercontent.com/aekrops/aws-courses/main/lab-3/input.txt'
    data = requests.get(file_path).text.split('\n')
    titles = data.pop(0)
    sat, gpa = zip(
        *[(int(sat), float(gpa)) for line in data if len(line.split(',')) == 2 for sat, gpa in [line.split(',')]]
    )

    average_sat = sum(sat) / len(sat)
    average_gpa = sum(gpa) / len(gpa)

    return {
        'statusCode': 200,
        'body': json.dumps({
            'average_sat': average_sat,
            'average_gpa': average_gpa,
        })
    }
