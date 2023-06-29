# Projeto de agendamento de estações de trabalho - Frontend

## Funcionalidades

- Requísito mínimo:
	- 1 tela para listar reservas.
	- 1 tela para fazer nova reserva.
		- listar estações de trabalho disponíveis.
		- feedback de sucesso numa terceira tela.
- Entrega:
	- 1 tela para listar reservas.
		- Bônus: permite editar e apagar reservas.
	- 1 tela para fazer nova reserva.
		- Bônus:
			- apenas permite o agendamento em data de hoje ou dia futuro.
			- lista apenas estações de trabalho que não estão marcadas como indisponiveis (a estação pode ser cadastrada mas não ser disponibilizada para agendamento).
	- Bônus: CRUD completo via frontend.
		- 1 tela para editar e apagar reservas.
		- 1 tela para listar estações de trabalho.
			- permite editar e apagar estações de trabalho.
		- 1 tela para cadastrar nova estação de trabalho.
		- 1 tela para editar e apagar estação de trabalho.

## Design

- Mehorias relativas à proposta original:
	- Ao invés de 2 telas (uma para listar agendamentos e outra para criar), optou-se por utilizar um sistema com menu responsivo pois cria um fluxo melhor de interação tanto em telas grandes como pequenas.
	- O feedback das operações, ao invés de ser exibido em uma página após a operação (como o sucesso em criar agendamentos e estações de trabalho), é exibido via toasts. Algo muito mais dinâmico, sendo utilizado também para eventuais erros de comunicação com o servidor. O recurso também tem a vantagem de não redirecionar para uma página apenas para informar que tudo ocorreu bem.
- Aplicação responsiva:
	- O menu lateral colapsa em telas pequenas e smartphones.
	- O menu lateral é fixo em telas grandes.
	- A tabela listando agendamentos e estações de trabablho são diferentes para telas grandes e pequenas (e smartphones).
		- A tabela de agendamentos e estações de trabalho em telas grandes oferece botões dedicados para editar e apagar items. Além de exibir o período do agendamento em coluna própria.
		- A tabela de agendamentos e estações de trabalho em telas pequenas e smartphones oculta os botões de editar e apagar (além de exibir numa mesma coluna a data e o período de agendamento). O clique no item leva para tela dedicada para editar e apagar o item.
- Aderência visual à marca e proposta visual do cliente:
	- O símbolo e o logo da empresas são utilizadas para identificar a empresa.
		- O símbolo é usado para telas pequenas e smartphones.
		- O logo é usado para telas grandes.
		- O símbolo é usado como favicon.
	- O esquema de cores respeita a palheta de cores do cliente:
		- A cor primária do cliente (`#6482F8`) é utilizada como cor primária da aplicação.
		- A cor terciária do cliente (`#333333`) é utilizada como cor da fonte da aplicação.

## Opções técnicas

- Utilização de React + TypeScript + Material UI + emotion (para CSS).
- A opção pelo TypeScript não é cosmética, buscou-se tipar de maneria consistente a aplicação para ofertar aos demais desenvolvedores as vantagens de uma tipagem forte, que permite detectar os bugs mais cedo e guiar o desenvolvedor na hora de utilizar as funções e componentes desenvolvidos.
- Forte componentização da aplicação e estrutura clara de diretórios, seguindo convenções consistentes.
- Utilização de setup para rodar a aplicação em container para desenvolvimento dentro do Visual Studio Code além de debug via IDE.

## Instalação

O projeto utiliza como base o [Vite | Next Generation Frontend Tooling](https://vitejs.dev/), basta seguir as suas convenções.

No diretório do projeto:

1. Execute: `npm install`

Se você estiver utilizando Visual Studio Code, poderá utilizar o devcontainer existente no projeto, que oferece um `node` próprio que funciona sem problemas em qualquer máquina.

## Execução

O projeto utiliza como base o [Vite | Next Generation Frontend Tooling](https://vitejs.dev/), basta seguir as suas convenções.

No diretório do projeto:

1. Execute `npm run dev`  
A aplicação estará rodando em <http://localhost:5173/>.

Se você estiver utilizando Visual Studio Code, há configuração para automatizar o processo, basta executar o projeto via:

- *Debug: Start Without Debugging (Ctrl+F5)*: Roda o servidor do frontend sem debugging.
- *Debug: Start Debugging (Ctrl+F5)*: Roda o servidor do frontend em modo debugging.
