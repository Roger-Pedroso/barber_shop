# App de agendamentos barbearia

## Clientes
### Tela Inicial
- Busca informações da barbearia e lista os barbeiros disponiveis
 
![image](https://github.com/user-attachments/assets/405d131e-e0f6-4d02-a11d-94f7a9f89537)

### Tela de seleção de serviços

- Após selecionar um barbeiro sera listados os serviços oferecidos pelo mesmo, com valor e tempo estimado, podendo ser selecionado mais de um.

![image](https://github.com/user-attachments/assets/720a2134-6d9c-4c08-9481-960f059220e8)

### Tela de seleção de horário

- Após selecionar os serviços seram listados os dias e os horários de atendimento disponiveis com baser no tempo somados dos serviços selecionados

![image](https://github.com/user-attachments/assets/fd058317-353c-437a-b095-10070a474edf)

### Tela de confirmação

- Após selecionar o horário será apresentado os campo de nome e telefone para finalizar o agendamento, deve ser informados os dois campos.

![image](https://github.com/user-attachments/assets/ee9fcf43-6fe1-4bc7-8add-48b5f07b7998)

- Ao salvar um alerta de confirmação irá aparecer e quando clicar em ok o usuario será direcionado para  a tela incial de agendamento.

![image](https://github.com/user-attachments/assets/fadd143d-1a0f-4fd1-b429-e627b209b9fa)

## Admin

- Para uma melhor experiencia só é possivel acessar o painel de admin em um desktop ou notebook.

### Listagem de agendamentos

![image](https://github.com/user-attachments/assets/9fb101f4-6ebf-43fa-aa47-ae060a467190)

### Gerenciar barbeiros

- Possivel cadastrar, editar agenda, e selecionar serviços que oferece.

![image](https://github.com/user-attachments/assets/c4580052-5a54-403f-bf70-df9501c3aed4)
![image](https://github.com/user-attachments/assets/04cdef53-91cb-4da6-b58c-ddcc929e32e7)
![image](https://github.com/user-attachments/assets/9a0681b8-0653-4080-9ca8-4ff92b81cbe0)
![image](https://github.com/user-attachments/assets/b16433b8-13a4-4c91-8e66-c59b5633b12b)

### Gerenciar Serviços

- Cadastrar e editar serviços oferecidos pelos barbeiros.

![image](https://github.com/user-attachments/assets/80a1f044-98ca-45f0-a8a3-509b488c92ef)
![image](https://github.com/user-attachments/assets/87adff23-2e77-4b15-bf98-9ad22cb9cb5b)
![image](https://github.com/user-attachments/assets/2cb8a491-94e3-4ce4-97b6-2a650bbbd000)


### Rodar Projeto 

- Entrar na pasta barbershop (backend NestJS) 
- Criar um arquivo .env na raiz com DATABASE_URL= com a conexao do banco
- rodar npm install no terminal e npm run start

- Entrar na pasta my-barbershop-frontend (frontend Next) 
- Criar um arquivo .env na raiz com NEXT_PUBLIC_API_URL= com a conexao do backend padrao 3001
- rodar npm install no terminal e npm run dev


