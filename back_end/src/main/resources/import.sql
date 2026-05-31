insert into tb_perfil (name) values ('ROLE_ADMINISTRADOR');
insert into tb_perfil (name) values ('ROLE_PESQUISADOR');
insert into tb_perfil (name) values ('ROLE_ESTUDANTE');

insert into tb_address (institutionName, street, number, neighborhood, city, state, zipCode) values ('IFMG', 'Rua Padre Alberico', '440', 'São Luiz', 'Formiga', 'MG','35570-000');

insert into tb_user (name, phone, email, password, cpf, address_id, created_at) values ('Glauberson', '3455-2748', 'Glauberson@gmail.com', '$2a$10$FUqjW4DqmVcpl71736.16uIP5J8A/GODt9q.t7mgACkqMRVQDIky2', '521.813.596-87', '1', now());
insert into tb_user (name, phone, email, password, cpf, address_id, created_at) values ('Claudio', '3425-1734', 'claudio@gmail.com', '$2a$10$FUqjW4DqmVcpl71736.16uIP5J8A/GODt9q.t7mgACkqMRVQDIky2', '184.660.246-70', now());

insert into tb_publication (id_user) values ('Claudio', '3425-1734', 'claudio@gmail.com', '$2a$10$FUqjW4DqmVcpl71736.16uIP5J8A/GODt9q.t7mgACkqMRVQDIky2', now());

insert into tb_user_perfil(id_user, id_perfil) values (1, 1);
insert into tb_user_perfil(id_user, id_perfil) values (2, 2);
insert into tb_user_perfil(id_user, id_perfil) values (2, 3);