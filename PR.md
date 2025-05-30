# ENGWEB2025-Normal

Luís Pinto da Cunha
A104613

30-05-2025

## Tratamento do dataset

Para formatar os dados do dataset:
 - substituí os {} no inicio e fim do dataset e coloquei []
 - retirei os id externos das exições usando ctrl f com a expressão regular "ed\d{4}":  e fazendo replace all com ''
 - fiz um pequeno script em python `process_eurovision` para adicionar o campo _id em cada edição

## Setup base de dados

A base de dados utilizada foi o MongoDB a correr num container no Docker.

Para isso, foi necessário configurar o Docker, o mongoDB dentro do Docker e carregar o dataset para o mongoDB.

Os passos realizados são indicados mais abaixo nas instruções.

### Queries

As queries estão localizadas na pasta ex1 no ficheiro queries.txt.

## API de dados (`/ex1`)

Para responder a pedidos de dados, foi criado um serviço com Express na porta 25000 que responde às seguintes rotas:

- GET /edicoes
- GET /edicoes/:id
- GET /edicoes?org=EEEE
- GET /paises?papel=org
- GET /paises?papel=venc
- GET /interpretes
- POST /edicoes
- PUT /edicoes/:id

Para isso, foi necessário conectar o programa à base de dados no MongoDB usando *mongoose* e também criar os modelos e controladores para os dados em:

- `models/edicao.js` para criar o schema a representar uma edição
- `controllers/edicao.js` para realizar as queries necessárias aos pedidos

Para gestão das rotas, os routers criados foram:

- `router/edicoes.js` que responde a todos os pedidos em `/edicoes`
- `router/paises.js` que responde a todos os pedidos em `/paises`
- `router/interpretes.js` que responde a todos os pedidos em `/interpretes`

## Interface (`/ex2`)

Para o utilizador comunicar com a API de dados, foi criado um serviço com Express na porta 25001 que responde às seguintes rotas:

- http://localhost:25001/
- http://localhost:25001/:id
- http://localhost:25001/paises/:pais

Para gestão das rotas, o routers criados foi:

- `router/edicoes.js` que responde a todos os pedidos em `/`

A construção das páginas foi feita com Pug e colocadas em `/views`

## Instruções

### Script tratamento de dados

Para executar o script pata tratar o dataset, é necessário coloca-lo na mesma pasta do dataset:

`python3 process_eurovision.py`

Dentro do sript é possível escolher o nome do dataset a ser processado e o nome do novo dataset atualizado.

### Base de dados

#### Docker (passo intermédio, se necessário)

Recomenda-se utilizar MongoDB num container Docker, pelo qual é necessário ter o Docker instalado.

Para configurar o Docker as instruções são:

- `docker pull mongo` para obter a imagem do mongo
- `docker volume create mongoData2025` para criar o volume *mongoData2025*
- `docker run -d -p 27017:27017 --name mongoEW -v mongoData2025:/data/db mongo` para iniciar o container *mongoEW* nas portas internas e externas 27017
- `docker ps` para confirmar o estado do container
- `docker start mongoEW` para iniciar o container, se necessário

#### Carregamento dos dados

Para carregar os dados do dataset para a base de dados os passos são os seguintes:

- `docker cp dataset.json mongoEW:/tmp` para copiar o dataset para o docker na pasta `/tmp`
- `docker exec -it mongoEW` para iniciar a shell no container
- `mongoimport -d eurovisao -c edicoes /tmp/dataset.json --jsonArray` para importar o dataset para o mongo
- (Opcional) `mongosh` para iniciar a shell do mongo e `use database` para selecionar a nova database e conseguir realizar queries

### API

Na pasta `ex1`, executar:

- `npm install` para instalar as dependências
- `npm install mongoose' mongoose` para instalar o mongoose
- `npm start` para iniciar o serviço na porta **X**

### Interface

Na pasta `ex2`, executar:

- `npm install` para instalar as dependências
- `npm install axios` para instalar o axios
- `npm start` para iniciar o serviço na porta **X**


