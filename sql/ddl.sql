CREATE TABLE order_status
(
    id         tinyint PRIMARY KEY AUTO_INCREMENT NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT NULL
        ON UPDATE CURRENT_TIMESTAMP,
    en_name    varchar(256)                       NOT NULL,
    kr_name    varchar(256)                       NOT NULL,
    CONSTRAINT ux_order_status_en_name UNIQUE INDEX (en_name),
    CONSTRAINT ux_order_status_kr_name UNIQUE INDEX (kr_name)
) ENGINE = InnoDB
  DEFAULT CHARSET utf8;

CREATE TABLE order_type
(
    id         tinyint PRIMARY KEY AUTO_INCREMENT NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT NULL
        ON UPDATE CURRENT_TIMESTAMP,
    en_name    varchar(256)                       NOT NULL,
    kr_name    varchar(256)                       NOT NULL,
    CONSTRAINT ux_order_type_en_name UNIQUE INDEX (en_name),
    CONSTRAINT ux_order_type_kr_name UNIQUE INDEX (kr_name)
) ENGINE = InnoDB
  DEFAULT CHARSET utf8;


CREATE TABLE orders
(
    id              integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
    created_at      timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at      timestamp DEFAULT NULL
        ON UPDATE CURRENT_TIMESTAMP,
    amount          integer                            NOT NULL,
    order_type_id   tinyint                            NOT NULL,
    order_status_id tinyint                            NOT NULL,
    user_id         integer                            NOT NULL,

    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES user (id)
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
    CONSTRAINT fk_orders_order_type FOREIGN KEY (order_type_id) REFERENCES order_status (id)
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
    CONSTRAINT fk_orders_order_status FOREIGN KEY (order_status_id) REFERENCES order_status (id)
        ON UPDATE CASCADE
        ON DELETE NO ACTION
) ENGINE = InnoDB
  DEFAULT CHARSET utf8;

CREATE TABLE user
(
    id         integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT NULL
        ON UPDATE CURRENT_TIMESTAMP,
    username   varchar(256)                       NOT NULL,
    password   varchar(512)                       NOT NULL,
    salt       varchar(512)                       NOT NULL,
    CONSTRAINT ux_user_username UNIQUE INDEX (username)
) ENGINE = InnoDB
  DEFAULT CHARSET utf8;
