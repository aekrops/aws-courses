### **Replace** container_name, account-id, region-name **before use**

```bash
aws ecr get-login-password --region region-name | docker login --username AWS --password-stdin account-id.dkr.ecr.region-name.amazonaws.com
```
----


```bash
docker build -t {container_name} .
```


```bash
docker tag {container_name}:latest {account-id}.dkr.ecr.{region-name}.amazonaws.com/{container_name}:latest
```

```bash
docker push {account-id}.dkr.ecr.{region-name}.amazonaws.com/{container_name}:latest
```

---

```bash
aws cloudformation create-stack --stack-name MyStackName --template-body CloudFormation.yaml --capabilities CAPABILITY_IAM
```
