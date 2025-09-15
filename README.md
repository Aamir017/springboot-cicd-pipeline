Spring Boot CI/CD Pipeline with Jenkins, SonarQube, Docker, and ArgoCD

This project demonstrates how to set up a complete CI/CD pipeline for a Spring Boot application using Jenkins, SonarQube, Docker, DockerHub, and Argo CD. The goal is to automate the build, test, quality analysis, containerization, and deployment process with minimal manual effort.

🚀 Pipeline Workflow
1. Source Code Commit

Developers push code changes to GitHub.

A webhook notifies Jenkins that new code is available.

Jenkins automatically triggers the pipeline without manual intervention.

2. Build with Maven

Jenkins checks out the latest code.

Maven is used to:

Clean previous builds

Download dependencies

Compile the project

Package it into a .jar file

If the build fails here, the pipeline stops and reports the error.

3. Code Quality Analysis with SonarQube

Jenkins sends the compiled code to SonarQube.

SonarQube checks for:

Bugs

Vulnerabilities

Code smells

Duplications

Test coverage

If the project fails the quality gate, Jenkins stops the pipeline and sends a report.

4. Testing

Automated unit and integration tests are executed.

If tests fail, the pipeline terminates and developers are notified.

5. Docker Image Build & Push

If code passes both quality checks and tests, Jenkins builds a Docker image of the Spring Boot app.

The image is tagged (usually with the build number or Git commit hash).

Jenkins pushes the image to DockerHub for storage and sharing.

6. Deployment with Argo CD

A separate Kubernetes manifests repository contains deployment YAML files.

Jenkins (or an image updater tool) updates the Docker image tag in this repo.

Argo CD detects the change in the repo.

Argo CD automatically syncs and deploys the new image to the Kubernetes cluster.

This ensures a GitOps workflow, where the Git repository becomes the single source of truth for deployments.

🛠️ Tools & Technologies

Spring Boot → Framework for building Java-based web apps

Maven → Build automation and dependency management

Jenkins → Orchestrates the CI/CD pipeline

SonarQube → Performs static code analysis & enforces quality gates

Docker → Packages the Spring Boot app into containers

DockerHub → Stores and distributes Docker images

Kubernetes → Runs and manages containerized applications

Argo CD → Automates deployments using GitOps principles

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/Aamir017/springboot-cicd-pipeline.git
cd springboot-cicd-pipeline

2. Jenkins Configuration

Install required plugins:

GitHub

Maven Integration

SonarQube Scanner

Docker Pipeline

Add credentials for GitHub, DockerHub, and SonarQube.

Configure Jenkins to run the Jenkinsfile provided in the repo.

3. SonarQube Setup

Install and start SonarQube on a server (default: http://<ip>:9000).

Create a project and generate a token.

Add the token in Jenkins under "SonarQube credentials".

4. DockerHub Setup

Create a public/private repository on DockerHub.

Add DockerHub username and password in Jenkins credentials.

5. Kubernetes & Argo CD Setup

Deploy Argo CD in Kubernetes:

kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml


Connect Argo CD to your Kubernetes manifests repository.

Enable auto-sync so deployments happen automatically when manifests are updated.

✅ Features

Fully automated CI/CD pipeline

Static code analysis with quality gates

Automated test execution

Docker-based containerization

Continuous deployment with Argo CD and Kubernetes

GitOps workflow (deployment state is managed via Git)

Notifications (Slack/Email) for failures and reports
