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

-- Relações de "seguir": Glauberson (1) segue Claudio (2)
INSERT INTO tb_user_following (follower_id, followed_id) VALUES (1, 2) ON CONFLICT DO NOTHING;

-- Produções de exemplo do Claudio (2) para popular o feed de quem o segue
INSERT INTO tb_apresentacao (titulo, ano, autores, descricao, tipo_evento, nome_evento, local_evento, natureza, id_user, created_at)
SELECT 'Aprendizado de Máquina em Edge Computing', 2024, 'Claudio Silva', 'Apresentação sobre inferência de modelos em dispositivos de borda.', 'congresso', 'SBRC 2024', 'Niterói, RJ', 'oral', 2, now()
WHERE NOT EXISTS (SELECT 1 FROM tb_apresentacao WHERE titulo = 'Aprendizado de Máquina em Edge Computing');

INSERT INTO tb_produto (titulo, ano, autores, descricao, tipo_produto, numero_registro, instituicao_financiadora, situacao, id_user, created_at)
SELECT 'Biblioteca OpenLattes', 2023, 'Claudio Silva', 'Software de código aberto para integração com a Plataforma Lattes.', 'software', 'BR512023000123', 'CNPq', 'finalizado', 2, now()
WHERE NOT EXISTS (SELECT 1 FROM tb_produto WHERE titulo = 'Biblioteca OpenLattes');
