
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




-----
> Solution for issue on mac with libs in aws 

docker build -t lambda-layer .

# Create a container from your image
docker create --name temp-lambda-container lambda-layer

# Copy the deployment package from the container to your host machine
docker cp temp-lambda-container:/var/task/ ./lambda-deployment-package

# Remove the temporary container
docker rm temp-lambda-container

cd lambda-deployment-package
zip -r ../lambda-deployment-package.zip .
