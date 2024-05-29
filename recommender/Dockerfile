FROM python:3.12-slim

WORKDIR /app

# Install pipenv and compilation dependencies
RUN pip install pipenv
RUN apt-get update && apt-get install -y --no-install-recommends gcc

# do not create __pycache__ directories
ENV PYTHONDONTWRITEBYTECODE 1

# Install python dependencies in /.venv
COPY Pipfile .
COPY Pipfile.lock .
RUN pipenv install --system --deploy --ignore-pipfile

COPY . .

EXPOSE 5000

ENV APP_ENV=Production

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
