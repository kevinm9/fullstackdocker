

INSERT IGNORE INTO `persona` (`id`, `areaestudio`, `correo`, `especialidad`, `motivoderegistro`, `nivelacademico`, `nombres`, `password`, `tipodeusuario`) VALUES
	(3, 'matematicas', 'dfgdfg@fdfds.com', 'computacion', 'ingreso extras', 'cuarto nivel', 'jose', 'dsfdsfdK45@', 'profesor'),
	(11, 'matematicas', 'kevin@kevin.com', 'computacion', 'ingreso extras', 'cuarto nivel', 'kevin', '123456', 'profesor'),
	(60, 'matematicas', 'kevin2@kevin.com', 'computacion', 'aprender', 'secundaria', 'emilio estudiante', '123456', 'estudiante'),
	(61, 'matematicas', 'kevin3@kevin.com', 'computacion', 'aprender', 'secundaria', 'andrea estudiante', '123456', 'estudiante');


INSERT IGNORE INTO `curso` (`id`, `maxcantalumnos`, `maxhorduracion`, `nombre`, `totaldocu`, `profesor_id`) VALUES
	(1, 1, 40, 'matematicas', 1, 11),
	(2, 3, 50, 'lenguaje', 1, 11),
	(5, 5, 30, 'sistemas', 1, 3),
	(7, 1, 40, 'basededatos', 1, 11);

INSERT IGNORE INTO `curso_alumnos` (`curso_id`, `persona_id`) VALUES
	(2, 60),
	(7, 60),
	(1, 61),
	(2, 61);
