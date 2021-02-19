CREATE TABLE `tb_categoria` (
	`id_categoria` bigint(5) NOT NULL AUTO_INCREMENT,
	`nome_categoria` varchar(255) NOT NULL UNIQUE,
	`descricao` TEXT(255) NOT NULL,
	`imagem` varchar(1000) NOT NULL,
	PRIMARY KEY (`id_categoria`)
);

CREATE TABLE `tb_usuario` (
	`id_usuario` bigint(5) NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`tipo_usuario` varchar(255) NOT NULL,
	`user` varchar(255) NOT NULL UNIQUE,
	`senha` varchar(255) NOT NULL,
	`email` varchar(100) NOT NULL,
	PRIMARY KEY (`id_usuario`)
);

CREATE TABLE `tb_produto` (
	`id_produto` bigint(5) NOT NULL AUTO_INCREMENT,
	`nome_produto` varchar(255) NOT NULL UNIQUE,
	`preco` DECIMAL(5,2) NOT NULL,
	`fornecedor` varchar(255) NOT NULL,
	`qtde_estoque` int(3) NOT NULL,
	`categoria_id` bigint(5) NOT NULL,
	PRIMARY KEY (`id_produto`)
);

ALTER TABLE `tb_produto` ADD CONSTRAINT `tb_produto_fk0` FOREIGN KEY (`categoria_id`) REFERENCES `tb_categoria`(`id_categoria`);

