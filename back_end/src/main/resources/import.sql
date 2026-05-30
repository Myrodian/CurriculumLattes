insert into tb_perfil (name) values ('ROLE_ADMINISTRADOR');
insert into tb_perfil (name) values ('ROLE_PESQUISADOR');
insert into tb_perfil (name) values ('ROLE_ESTUDANTE');

insert into tb_user (name, phone, email, password, cpf,  created_at) values ('augusto', '3455-2748', 'augustoleal@gmail.com', '$2a$10$FUqjW4DqmVcpl71736.16uIP5J8A/GODt9q.t7mgACkqMRVQDIky2', '123.456.789-00', now());
insert into tb_user (name, phone, email, password, cpf, created_at) values ('Claudio', '3425-1734', 'claudio@gmail.com', '$2a$10$FUqjW4DqmVcpl71736.16uIP5J8A/GODt9q.t7mgACkqMRVQDIky2', '987.654.321-00', now());

insert into tb_user_perfil(id_user, id_perfil) values (1, 1);
insert into tb_user_perfil(id_user, id_perfil) values (2, 2);
insert into tb_user_perfil(id_user, id_perfil) values (2, 3);