# Project Management System 
O objetivo do sistema é o gerenciamento de projetos de uma empresa, com a identificação dos 
funcionários alocados em cada projeto.
![Diagrama](https://user-images.githubusercontent.com/39796692/147523469-93a46a96-8b9d-4141-9025-0ea9bbe6c124.png)

De acordo com o diagrama de classes, cada Funcionario pertence a um Grupo e um Setor, e 
possui zero ou vários ProjetoFuncionario. E cada Projeto pertence a um Setor e é composto por 
zero ou vários ProjetoFuncionario, que contém um Funcionario. Cada Usuario possui zero ou 
várias Permissao e cada Permissao possui zero o vários Usuario. Assim, implemente as seguintes 
funcionalidades:

1. Gerenciamento de Grupos: o sistema deve permitir o cadastro (inserção, alteração, 
exclusão e pesquisa) dos dados dos grupos. 
2. Gerenciamento de Setores: o sistema deve permitir o cadastro (inserção, alteração, 
exclusão e pesquisa) dos dados dos setores. 
3. Gerenciamento de Funcionários: o sistema deve permitir o cadastro (inserção, 
alteração, exclusão e pesquisa) de funcionários.
4. Gerenciamento de Projetos: o sistema deve permitir o cadastro (inserção, alteração, 
exclusão e pesquisa) dos dados dos projetos. 
5. Gerenciamento de Funcionários alocados aos Projetos: o sistema deve permitir o alocar
funcionários aos projetos (com a data de início da participação, a carga horária e se o
funcionário será um gestor do projeto) e remover funcionários dos projetos (com a data 
de fim da participação). 
Os dados de usuários e as permissões podem ser inseridos diretamente no banco de dados
