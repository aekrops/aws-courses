FROM public.ecr.aws/lambda/python:3.10

# Create a working directory
WORKDIR /var/task

# Copy your function code and requirements file into the container
COPY lambda_function.py .
COPY requirements.txt .

# Install libraries
RUN python3.10 -m pip install -r requirements.txt --target .

# Set the CMD to your handler (the entry point for your Lambda function)
CMD ["lambda_function.handler"]
