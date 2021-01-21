# *API Cashback*
Essa api tem como objetivo cadastrar e controlar as ofertas.

## *Requisitos necessários*
Os requisitos necessários para rodar a aplicação são: 

* [Node](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/)

**Clique nos links acima para instalar as dependências caso ainda não tenha no seu ambiente**

## *Como Rodar a Aplicação*

A aplicação depende do postgres para realizar a persistência dos dados e partindo deste princípio temos dois modos para rodar a nossa aplicação: 

#### make run-dev
Se você já tem uma instância do postgre rodando em seu ambiente ou na nuvem pode facilmente apontar para sua instância, rodar as migrations e subir a aplicação com o comando ***make run-dev***. Basta apenas alterar as variáveis de ambiente presentes no Makefile

#### make run-dev-with-postgres
Se você não tem uma instância do postgre ou simplesmente quer rodar a aplicação do jeito mais rápido possível. Basta executar o comando ***make run-dev-with-postgres*** que irá subir uma imagem do postgre executar as migrations na database e no final a aplicação rodará pronta para receber os requests

## *Documentação*

#### Postman Collection
Caso você utilize postman para realizar requisições em suas apis basta importar essa [collection](https://www.getpostman.com/collections/90c64ac07d91be188379)

#### Postman Documentação Online
Para visualizar as especificações da api acesse esta [documentação](https://documenter.getpostman.com/view/3412449/TVza9tcn)

## *Comandos makefile*

####  make run-test:
* Este comando é responsável por rodar todos os testes unitários da aplicação.

####  make run-dev:
* Este comando é responsável por levantar a aplicação deixando ela pronta para receber requests.

####  make run-migrations:
* Este comando é responsável por rodar as migrations no banco de dados.

####  make revert-migrations:
* Este comando é responsável por desfazer a ultima migration no banco de dados.

####  make run-dev-with-postgres
* Este comando é responsável por subir o banco de dados através do docker-compose, rodar as migrations e subir a aplicação deixando ela pronta para receber requests.