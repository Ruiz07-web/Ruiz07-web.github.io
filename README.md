# Calculadora de Média de Notas

Este projeto é uma aplicação web interativa que auxilia estudantes a calcular quanto precisam tirar na prova 2 (P2) para serem aprovados, considerando diferentes formas de cálculo de média. O sistema permite inserir múltiplas notas e pesos para cada parcial (P1 e P2), escolher entre média simples (soma das notas) ou média ponderada (nota × peso), e informa quanto é necessário tirar em uma nota em branco para atingir a média desejada.

## Funcionalidades

- **Escolha do tipo de média:** Média Simples (só soma as notas) ou Média Ponderada (nota × peso).
- **Notas compostas:** Permite adicionar várias notas e pesos para P1 e P2 (ex: prova, trabalho, atividade).
- **Cálculo automático:** Informa quanto precisa tirar em uma nota em branco da P2 para atingir a média desejada.
- **Validação:** Nenhuma nota pode ser maior que 10.
- **Histórico:** Exibe o histórico de cálculos por estudante e matéria.
- **Interface amigável:** Visual moderno, campos dinâmicos e fácil de usar.

## Estrutura do Projeto

- **src/index.html:** Estrutura HTML da aplicação, com campos para nome, matéria, tipo de média, notas e pesos de P1 e P2, média desejada, resultado e histórico.
- **src/app.js:** Lógica JavaScript responsável por adicionar/remover notas, calcular médias, validar entradas, mostrar quanto falta para passar e atualizar o histórico.
- **src/styles.css:** Estilos modernos para tornar a experiência agradável e responsiva.
- **package.json:** Configuração do projeto, dependências e scripts para rodar localmente.

## Como Usar

1. Clone o repositório ou faça o download dos arquivos.
2. Navegue até a pasta do projeto.
3. Execute `npm install` para instalar as dependências (opcional, apenas se quiser usar o live-server).
4. Execute `npm start` para rodar com live-server **ou** abra o arquivo `src/index.html` diretamente no navegador.
5. Preencha os campos: nome, matéria, escolha o tipo de média, adicione as notas e pesos conforme necessário.
6. Clique em **Calcular** para ver o resultado.
7. Use o botão "Mostrar/Ocultar Histórico" para ver os cálculos anteriores.

## Exemplos de Uso

- **Média Simples:** Some todas as notas de P1 (máximo 10) e de P2 (máximo 10). A média final é (P1 + P2) / 2.
- **Média Ponderada:** Cada nota é multiplicada pelo seu peso, somadas e divididas pela soma dos pesos para cada parcial. A média final é a média aritmética das médias ponderadas de P1 e P2.

## Contribuição

Contribuições são bem-vindas! Faça um fork, crie uma branch, envie um pull request e ajude a melhorar o projeto.

---

**Desenvolvido para facilitar a vida de estudantes e professores no cálculo de médias escolares.**