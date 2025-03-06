### Samir Souza - Teste técnico - Front end - Casar.com

# Lista de repositórios do GitHub

## Descrição

Nesse projeto você deverá desenvolver um site simples em que seja possível acessar a página de um usuário e visualizar seus repositórios públicos, além de poder favoritar/remover repositórios dos favoritos.

## Requisitos

- [ OK ] Uma barra de pesquisa para procurar um usuário
- [ OK ] Um feedback caso o usuário não seja encontrado
- [ OK ] Uma página do usuário, mostrando suas informações e sua lista de repositórios
- [ OK ] Possibilidade de favoritar e remover repositórios dos favoritos (fazer persistência dos dados)
- [ OK ] Listar repositórios favoritos
- [ OK ] **NÃO OBRIGATÓRIO** A lista de repositórios deverá conter uma paginação com rolagem infinita, ou seja, mais repositórios serão carregados conforme o usuário rola a página para baixo até que não haja mais repositórios (estilo Facebook, Instagram, Twitter, etc.)

## Obrigatório

- [ OK - React ] Utilização de um framework/lib dentre esses: (Vue 3, Nuxt 3, React ou Next)
- [ OK ] Typescript
- [ - ] Testes unitários (Jest ou Vitest), o máximo de cobertura que conseguir, mas no mínimo uma funcionalidade, por exemplo: (Listagem de repositórios)

Observação: A estrutura de testes foi inicializada usando Jest e MSW para mockar os dados. Estou resolvendo dificuldades com o funcionamento dos testes, exemplo: Os testes não estão consumindo os dados do .env. Estou trabalhando nisso.

**Sinta-se livre para adicionar qualquer outra tecnologia, desde que utilize as tecnologias obrigatórias.**
- ContextAPI
- MSW - mocks para os testes e para um ambiente de desenvolvimento sem acesso a internet, usando somente os mocks como dados.

## Diferenciais

OK - Tailwindcss
OK - Commits padronizados
- Nextjs com SSR ou SSG

## Layout

Desenvolver seguinte o layout [protótipo](https://www.figma.com/file/NPsgIQuNZEv46Jy9u1d90E/Processo-Seletivo?node-id=0%3A1).

## Sobre a entrega

- A API do GitHub requer uma autenticação. Você deverá gerar um token de acesso pessoal no seu GitHub e utilizá-lo no projeto.

Caso não queira deixar o seu token visível em seu repositório, disponibilize um guia em seu **README** sobre onde substituir o token.

Para mais detalhes sobre como gerar um token, acesse o [guia de autenticação do GitHub](https://docs.github.com/pt/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28).


- Envie o link do seu repositório para **tech@casar.com**
    - Título do e-mail: Teste técnico - Samir José Lopes Souza {Seu nome completo}
    - Corpo do e-mail: Link do repositório
    - Opcional: Cover letter

## Links

[Documentação da API do GitHub](https://docs.github.com/pt/rest?apiVersion=2022-11-28)
