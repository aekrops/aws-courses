import boto3

s3_bucket = boto3.client('s3')


def lambda_handler(event, context):
    s3_event = event['Records'][0]['s3']

    bucket_name = s3_event['bucket']['name']
    object_key = s3_event['object']['key']

    s3_object = s3_bucket.get_object(Bucket=bucket_name, Key=object_key)

    content = s3_object['Body'].read().decode('utf-8')

    data = content.split('\n')
    titles = data.pop(0)

    sat, gpa = zip(
        *[(int(sat), float(gpa)) for line in data if len(line.split(',')) == 2 for sat, gpa in [line.split(',')]]
    )

    average_sat = sum(sat) / len(sat)
    average_gpa = sum(gpa) / len(gpa)

    sns_client = boto3.client('sns')
    sns_client.publish(
        TopicArn='arn:aws:sns:eu-central-1:058264413197:NewCsvFileOnS3BucketCalculations',
        Message=f"Average SAT: {average_sat}, Average GPA: {average_gpa}"
    )

    return {
        'average_sat': average_sat,
        'average_gpa': average_gpa
    }
