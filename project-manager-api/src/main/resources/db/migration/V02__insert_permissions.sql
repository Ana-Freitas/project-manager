INSERT INTO permissions (`code`, `description`) VALUES (18, 'ROLE_SAVE_ALOCATION');
INSERT INTO permissions (`code`, `description`) VALUES (19, 'ROLE_REMOVE_ALOCATION');
INSERT INTO permissions (`code`, `description`) VALUES (20, 'ROLE_SEARCH_ALOCATION');

INSERT INTO USERS_permissions(user_code, permission_code)
SELECT 1, code FROM permissions;

INSERT INTO USERS_permissions(user_code, permission_code)
SELECT 2, code FROM permissions WHERE DESCRIPTION LIKE '%SEARCH%';

INSERT INTO USERS_permissions(user_code, permission_code)
SELECT 3, code FROM permissions WHERE code > 17;