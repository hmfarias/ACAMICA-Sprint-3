-- MySQL Workbench Synchronization
-- Generated: 2021-05-12 20:02
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Marcelo Farias

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `bandas`.`bandas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `integrantes` INT(11) NOT NULL,
  `fecha_inicio` DATETIME NOT NULL,
  `fecha_separacion` DATETIME NULL DEFAULT NULL,
  `pais` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `bandas`.`canciones` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `duracion` INT(11) NOT NULL,
  `fecha_publicacion` DATETIME NOT NULL,
  `bandas_id` INT(11) NOT NULL DEFAULT 0,
  `albumes_id` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_canciones_bandas_idx` (`bandas_id` ASC) ,
  INDEX `fk_canciones_albumes1_idx` (`albumes_id` ASC) ,
  CONSTRAINT `fk_canciones_bandas`
    FOREIGN KEY (`bandas_id`)
    REFERENCES `bandas`.`bandas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_canciones_albumes1`
    FOREIGN KEY (`albumes_id`)
    REFERENCES `bandas`.`albumes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `bandas`.`albumes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_album` VARCHAR(150) NOT NULL,
  `fecha_publicacion` DATETIME NOT NULL,
  `bandas_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `bandas_id`),
  INDEX `fk_albumes_bandas1_idx` (`bandas_id` ASC) ,
  CONSTRAINT `fk_albumes_bandas1`
    FOREIGN KEY (`bandas_id`)
    REFERENCES `bandas`.`bandas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
