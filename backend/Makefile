run-dev:
	DB_HOST=localhost DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=docker DB_DATABASE=lemmoney yarn dev:server

run-test:
	yarn test

run-dev-with-postgres: run-postgres run-migrations run-dev

run-migrations:
	DB_HOST=localhost DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=docker DB_DATABASE=lemmoney yarn typeorm migration:run

revert-migrations:
	DB_HOST=localhost DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=docker DB_DATABASE=lemmoney yarn typeorm migration:revert

run-postgres:
	docker-compose up -d