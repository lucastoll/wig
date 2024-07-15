# WIG (Where i go)

Plataforma web para divulgação e amostra de eventos nas cidades, bem como amostra dos locais capazes de sediar eventos na cidades, atraindo tanto visitantes de eventos como organizadores de eventos, desenvolvido nas disciplinas de Eng. Software e Usina de Projetos 7

# Video Pitch 
<a href="https://www.youtube.com/watch?v=7sQLDTHgErk">![image](https://github.com/user-attachments/assets/00e70e44-b54a-4e95-890d-97a6d4f9e0f8)</a>



# Como rodar a aplicação ⚙

Para rodar a aplicação é necessário rodar tanto o back-end como front-end simultaneamente, abra dois terminais separados e siga os seguintes passos

#### back-end

Crie um arquivo chamado .env na pasta raiz seguindo o exemplo visto em .env.example

```
cd .\back-end
npm install
npm run dev
```

#### Front-end

Crie um arquivo chamado .env na pasta raiz seguindo o exemplo visto em .env.example

```
cd .\back-end
npm install
npm run dev
```
Apos isso, acesse explicitamente o endereço localhost:5173, caso o Vue abra em 127.0.0.1 troque a URL para localhost, isso é necessário pois precisamos colocar a origem do javascript na API de autenticação do google, e o 127.0.0.1 não é um domínio aceito
