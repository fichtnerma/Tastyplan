default: help

help:
	@echo "USAGE:"
	@echo "  make [TARGET]"
	@echo
	@echo "  // For starting containers"
	@echo "  start:                         start all"
	@echo "  start-frontend                	start frontend"
	@echo "  start-api:                			start backend"
	@echo
	@echo "  // For building containers"
	@echo "  build:                         build all"
	@echo "  build-frontend:               	build frontend image"
	@echo "  build-api:                			build backend image"
	@echo
	@echo "  logs:                          show logs for backend frontend blockchain"
	@echo "  clean:                         clean up workspace"

## GENERAL

logs:
	docker compose logs -f

clean:
	docker compose down --volumes

stop:
	docker compose stop

## BUILDING

build: 
	docker compose build

build-frontend:
	docker compose build frontend

build-api:
	docker compose build api

## RUNNING

start: 
	docker compose up -d

start-frontend:
	docker compose up -d frontend

start-api:
	docker compose up -d api
