# ☁️🤖 S3 Bucket Uploader

## Aplicação serverless que recebe arquivos de um bot do telegram e os salva em um bucket S3

![Arquitetura](https://github.com/g-barbosa/s3-bucket-uploader/blob/assets/sample.jpg)

## Ambiente
#### Dependências
Rode o comando abaixo para instalar todas as dependências necessárias deste projeto.
~~~
yarn
~~~

#### Variáveis de ambiente
Crie um arquivo .env e use o .env_sample como base para criar as variaveis de ambiente:
**BOT_TOKEN**
Você precisará de um token de acesso do bot do telegram. Para fazer isso, é muito simples:
* Pesquise pela conta BotFather no Telegram.
* Quando iniciamos uma conversa com ele, o mesmo apresenta uma série de comandos para interagir. Digite /newbot para criar o novo bot.
* De um nome e um username terminado com bot. Pronto, seu bot já estará criado.
* Você receberá um token de acesso e poderá preencher a variavel de ambiente `BOT_TOKEN` para trabalhar com seu bot.

**BUCKET_NAME**
* Você deve escolher um nome para o seu bucket S3

## Deploy
Para fazer o deploy para a AWS, basta rodar o seguinte comando:
~~~
yarn deploy
~~~
