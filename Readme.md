Aplicação criada em ReactJS utilizando biblioteca Material-UI para estilização.

Aplicação construída para filtrar países (Sidebar), exibir informações do país selecionado e cadastrar autoridade (CoutriesPage). 
Visualização das autoridades cadastradas e salvas com persistência em Local Storage.
Utilização de React Router e useNavigate para definir as rotas


Essa aplicação contém:
- Hook useFetch para consumir os dados de uma API externa, garantindo a persistencia local com Local Storage
- CountriesContext que está consumindo a API externa e configurando os filtros de busca por nome ou por região e a exibição dos países pelo nome
- Sidebar filtrando o pais e exibindo o nome do país para ser selecionado 
- CountryPage exibindo os dados do pais selecionado a partir do selectCountry e as rotas definidas pelo ccs3 do selectedCountry
- RegisterAuthoritiyForm é responsável pelo formulario de cadastro da Autoridade. 
- AuthoritiesContext armazena os dados do formulario RegisterAuthoritiyForm e persiste em Local Storage. Esses dados são exibidos na CountriesPage e Authorities.
- Authorities exibe todas as autoridades cadastradas