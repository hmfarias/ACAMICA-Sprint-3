

CREATE TABLE IF NOT EXISTS `bandas`.`bandas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `integrantes`INT(3) NOT NULL,
  `fecha_inicio` DATETIME NOT NULL,
  `fecha_separacion` DATETIME NULL,
  `pais` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `delilah`.`imagenes_platos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(60) NOT NULL,
  `platos_id` INT(11) NOT NULL,
  `imagenes_platoscol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_imagenes_platos_platos_idx` (`platos_id` ASC),
  CONSTRAINT `fk_imagenes_platos_platos`
    FOREIGN KEY (`platos_id`)
    REFERENCES `delilah`.`platos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `delilah`.`usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(300) NOT NULL,
  `correo` VARCHAR(500) NOT NULL,
  `telefono` VARCHAR(500) NOT NULL,
  `direccion` VARCHAR(500) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `admin` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `delilah`.`pedidos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `hora` DATETIME NOT NULL,
  `valor_total` DOUBLE NOT NULL,
  `forma_pago` ENUM('tc', 'efectivo', 'debito') NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `estados_pedido_id` INT(11) NOT NULL,
  `usuarios_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_PEDIDOS_estados_pedido1_idx` (`estados_pedido_id` ASC) ,
  INDEX `fk_PEDIDOS_usuarios1_idx` (`usuarios_id` ASC) ,
  CONSTRAINT `fk_PEDIDOS_estados_pedido1`
    FOREIGN KEY (`estados_pedido_id`)
    REFERENCES `delilah`.`estados_pedido` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PEDIDOS_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `delilah`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `delilah`.`estados_pedido` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `delilah`.`pedidos_has_platos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pedidos_id` INT(11) NOT NULL,
  `platos_id` INT(11) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  INDEX `fk_pedidos_has_platos_platos1_idx` (`platos_id` ASC) ,
  INDEX `fk_pedidos_has_platos_pedidos1_idx` (`pedidos_id` ASC) ,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pedidos_has_platos_pedidos1`
    FOREIGN KEY (`pedidos_id`)
    REFERENCES `delilah`.`pedidos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_has_platos_platos1`
    FOREIGN KEY (`platos_id`)
    REFERENCES `delilah`.`platos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
