INSERT INTO role(id, name) VALUES (1, 'USER'), (2, 'ADMIN');
INSERT INTO users(id, activation_hash, email, firstname, is_activated, lastname, password, phone_number) VALUES
  (1, '---', 'admin@admin.pl', 'Admin', true, 'Admin', '$2a$10$6Y90YIk959YxlEy71WguB.7yKG/hZE5YQrd7t9pe8Wul97TbXpSGm', '123456789');

INSERT INTO users_roles(users_id, roles_id)
  SELECT (SELECT id FROM users WHERE email='admin@admin.pl'), (SELECT id FROM role WHERE name='ADMIN');

INSERT INTO users_roles(users_id, roles_id)
  SELECT (SELECT id FROM users WHERE email='admin@admin.pl'), (SELECT id FROM role WHERE name='USER');

INSERT INTO price_table(id, price_per_kilometer, tax_percent) VALUES (1, 0.5, 23.0);
