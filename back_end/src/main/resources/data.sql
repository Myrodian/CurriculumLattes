-- Seed data executado automaticamente pelo Spring na inicialização (spring.sql.init.mode=always).
-- ON CONFLICT DO NOTHING garante idempotência a cada restart.

INSERT INTO tb_perfil (name) VALUES ('ROLE_ADMINISTRADOR') ON CONFLICT DO NOTHING;
INSERT INTO tb_perfil (name) VALUES ('ROLE_PESQUISADOR') ON CONFLICT DO NOTHING;
INSERT INTO tb_perfil (name) VALUES ('ROLE_ESTUDANTE') ON CONFLICT DO NOTHING;

INSERT INTO tb_address (institution_name, street, number, neighborhood, city, state, zip_code)
SELECT 'IFMG', 'Rua Padre Alberico', '440', 'São Luiz', 'Formiga', 'MG', '35570-000'
WHERE NOT EXISTS (SELECT 1 FROM tb_address WHERE institution_name = 'IFMG');

INSERT INTO tb_user (name, phone, email, password, cpf, address_id, created_at)
VALUES ('Glauberson', '3455-2748', 'Glauberson@gmail.com',
        '$2a$10$FUqjW4DqmVcpl71736.16uIP5J8A/GODt9q.t7mgACkqMRVQDIky2',
        '521.813.596-87', 1, now())
ON CONFLICT DO NOTHING;

INSERT INTO tb_user (name, phone, email, password, cpf, address_id, created_at)
VALUES ('Claudio', '3425-1734', 'claudio@gmail.com',
        '$2a$10$FUqjW4DqmVcpl71736.16uIP5J8A/GODt9q.t7mgACkqMRVQDIky2',
        '184.660.246-70', 1, now())
ON CONFLICT DO NOTHING;

INSERT INTO tb_user_perfil (id_user, id_perfil) VALUES (1, 1) ON CONFLICT DO NOTHING;
INSERT INTO tb_user_perfil (id_user, id_perfil) VALUES (2, 2) ON CONFLICT DO NOTHING;
INSERT INTO tb_user_perfil (id_user, id_perfil) VALUES (2, 3) ON CONFLICT DO NOTHING;
