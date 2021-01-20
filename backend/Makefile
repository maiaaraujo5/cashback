run-dev:
	DB_HOST=localhost DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=docker DB_DATABASE=lemmoney yarn dev:server

run-test:
	DB_HOST=localhost DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=docker DB_DATABASE=lemmoney_test yarn test

run-migrations:
	DB_HOST=localhost DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=docker DB_DATABASE=lemmoney yarn typeorm migration:run

revert-migrations:
	DB_HOST=localhost DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=docker DB_DATABASE=lemmoney yarn typeorm migration:revert
