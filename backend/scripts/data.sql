INSERT INTO Campservice.customer (name,fantasy_name,active,person_type,cpf_cnpj,state_registration,city,state,phone_number,cell_number,email_address,contact_person,zip_code,address,district,obs,registration_date,profile) VALUES
	 ('MEC NITAO            ICA','MEC NITAO            ICA',1,'FISICA',NULL,'2/R 2.052.564','1059',NULL,'04734655091','04744660196','campigoto','','89230200','R JARIVATUBA, 572','JARIVATUBA',NULL,NULL,1),
	 ('PANAGUA','PANAGUA',1,'FISICA',NULL,'2/R-1.470.020','1059',NULL,'00434635944','00474262323','','',NULL,'R.GUANABARA','FLORESTA',NULL,NULL,NULL),
	 ('ANTONIO F.DA ROCHA','ANTONIO F.DA ROCHA',1,'FISICA',NULL,'2R-719.289','1059',NULL,'47488533831',NULL,'','',NULL,'R JOAO ELIAS DE OLIVEIRA 182','PANAGUA',NULL,NULL,1),
	 ('CENTRO VILLE GAS E GAS','CENTRO VILLE GAS E GAS',1,'FISICA',NULL,'344.638','1059',NULL,'00034655001','84299511','','',NULL,'R.AGULHAS NEGRAS1215','JARIVATUBA','ESPOSA LOURIVAL',NULL,NULL),
	 ('GILMAR MELLO','GILMAR MELLO',1,'FISICA',NULL,NULL,'1059',NULL,'334522075',NULL,'','',NULL,'R.AMADOR COELHO 728',NULL,NULL,NULL,NULL),
	 ('JOSE DARIO DE OLIVEIRA','JOSE DARIO DE OLIVEIRA',1,'FISICA',NULL,NULL,'1059',NULL,NULL,NULL,'','',NULL,'A',NULL,NULL,NULL,NULL),
	 ('JOTACAR','JOTACAR',1,'FISICA','','','1059',NULL,'04734655594','','','','','R:ANTONIO NEVES LT 75','JARIVATUBA','4 OLEO 15W40','2013-12-19',NULL),
	 ('JOSE DE OLIVEIRA (JUCA)','JOSE DE OLIVEIRA (JUCA)',1,'FISICA',NULL,NULL,'1059',NULL,'04734650238',NULL,'','',NULL,'R.MARTA DELF DA MAIA 72','J.COSTA',NULL,NULL,NULL),
	 ('ANTONIO BLOEMER','ANTONIO BLOEMER',1,'FISICA',NULL,'2/R/.1.868.811','1059',NULL,'34665698',NULL,'','',NULL,'R.JOAO BASILIO CORREIA 1350','JARIVATUBA',NULL,NULL,NULL),
	 ('ADRIANO GERMANO','ADRIANO GERMANO',1,'FISICA',NULL,NULL,'1059',NULL,'00474296840','00474296840','','',NULL,'R.SÃO BENTO DO SUL','MOTO CUBLE',NULL,NULL,1);

INSERT INTO Campservice.supplier (name,active,person_type,cpf_cnpj,state_registration,zip_code,address,district,city,state,phone_number,cell_number,email_address,contact_person,obs,registration_date) VALUES
	 ('DIVERSOS',1,'JURIDICA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	 ('FREIOS VARGA S.A.',1,'JURIDICA','51.466.753/000',NULL,NULL,'VIA ANHANGUERA, KM 147',NULL,NULL,NULL,'0800 111100',NULL,NULL,NULL,NULL,NULL),
	 ('ALLIED SIGNAL AUTOMOTIVE LTDA',1,'JURIDICA','45988045001','','','AV. LIBERDADE, S/Nº','',NULL,NULL,'0152 338011','','','','','2013-01-21'),
	 ('ALFRED TEVES DO BRASIL IND. COM. LTDA',1,'JURIDICA','62187620000','','','AV. DUQUE DE CAXIAS, 2422','',NULL,NULL,'','','','','','2013-01-20'),
	 ('ROBERT BOSCH LTDA',1,'JURIDICA','45.990.181/000',NULL,NULL,'VIA ANHANGUERA, KM 98',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	 ('NAKATA S.A. IND. COM.',1,'JURIDICA','60.875.259/000',NULL,'09950-40','AV. PLASTISPUMA, 451/539',NULL,NULL,NULL,'0117461555',NULL,NULL,NULL,NULL,NULL),
	 ('ECHLIN DO BRASIL IND COM LTDA - DIV URBA',1,'JURIDICA','61.091.963/000',NULL,'05036-','AV. STA. MARINA, 1317/1357',NULL,NULL,NULL,'0118643422',NULL,NULL,NULL,NULL,NULL),
	 ('ECHLIN DO BRASIL IND. COM. LTDA',1,'JURIDICA','61.091.963/000',NULL,'31166-90','R. TAQUARI, 1328/1338','BELENZINHO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	 ('FILTROS LOGAN S.A. IND. COM.',1,'JURIDICA','61.361.879/000',NULL,NULL,'R. DOMINGOS JORGE,714',NULL,NULL,NULL,'0800 131133',NULL,NULL,NULL,NULL,NULL),
	 ('MECANO FABRIL LTDA - DIV. BOMBAS COMB.',1,'JURIDICA','60.586.534/000',NULL,'06210-','AV. HENRY FORD, 673',NULL,NULL,NULL,'0117035966',NULL,NULL,NULL,NULL,NULL);

 INSERT INTO Campservice.product_group (name,obs) VALUES
   	 ('AUTO',' '),
   	 ('2',' '),
   	 ('3',' '),
   	 ('4',' '),
   	 ('5',' '),
   	 ('6',' '),
   	 ('7',' '),
   	 ('8',' '),
   	 ('9',' '),
   	 ('ADRIANO',' ');

 INSERT INTO Campservice.product (`group`,active,description,unit,obs,purchase_price,current_inventory,minimum_stock,sale_price,price_value,profit_margin,factory_index,list_price,rebate,original_code,original_code1,quantity_last_entry,product_location,last_supplier_id,item_type,`references`) VALUES
 	 (1,0,'CABO ACELERADOR BRAS CARB DUPLA','PC','JOINCAR',0.56,0.0,10.0,2.6,1.0,160.0,100.0,1.0,20.0,NULL,'MT-139',10.0,'FILA 10, PRATELEIRA A, VAO 1',98,'PRODUTO',''),
 	 (1,1,'CABO ACELERADOR BRAS CARB SIMPLES','PC','',0.54,0.0,3.0,4.25,1.7,150.0,100.0,1.7,20.0,NULL,'16401',20.0,'FILA 10, PRATELEIRA A, VAO 1',NULL,'PRODUTO',''),
 	 (1,1,'CABO ACELERADOR CORCEL 69/74','PC','',1.0,0.0,3.0,9.38,5.0,87.5,50.0,10.0,20.0,'','FC-328',0.0,'',0,'PRODUTO',''),
 	 (1,1,'CABO ACELERADOR CORCEL 75/08.77','PC','',1.0,0.0,1.0,19.8,9.9,100.0,100.0,9.9,20.0,NULL,'MT-2731',0.0,'FILA 10, PRATELEIRA A, VAO 1',NULL,'PRODUTO',''),
 	 (1,1,'CABO ACELERADOR CORCEL II/DEL REY /83','PC','',5.89,0.0,3.0,22.0,11.0,100.0,100.0,11.0,20.0,NULL,'10803',3.0,'FILA 10, PRATELEIRA A, VAO 1',NULL,'PRODUTO',''),
 	 (1,1,'CABO ACELERADOR CORCEL II/DEL REY 83/','PC','',1.0,0.0,3.0,33.0,15.0,120.0,100.0,15.0,20.0,'84NU9C799A','10849',0.0,'FILA 10, PRATELEIRA A, VAO 1',NULL,'PRODUTO',''),
 	 (1,1,'CABO ACELERADOR CHEV 10.75/82 CARB SIMPLES','PC','',3.95,0.0,3.0,13.75,5.5,150.0,100.0,5.5,20.0,'9.302.675','15851',5.0,'FILA 10, PRATELEIRA A, VAO 1',NULL,'PRODUTO',''),
 	 (1,1,'CABO ACELERADOR CHEV 83/86 CARB.DUPLO','PC','',4.16,0.0,3.0,17.6,8.0,120.0,100.0,8.0,20.0,'94.601.840','15306',5.0,'FILA 10, PRATELEIRA A, VAO 1',NULL,'PRODUTO',''),
 	 (1,1,'CABO ACELERADOR CHEV 87/','PC','',1.0,0.0,3.0,28.0,14.0,100.0,100.0,14.0,20.0,'52.277.953','15058',0.0,'FILA 10, PRATELEIRA A, VAO 1',NULL,'PRODUTO',''),
 	 (1,1,'CABO ACELERADOR FIAT 147/OGGI/SPAZIO','PC','',2.04,0.0,4.0,7.75,3.1,150.0,100.0,3.1,20.0,'4.359.989','14007',10.0,'FILA 10, PRATELEIRA A, VAO 1',NULL,'PRODUTO','');

 INSERT INTO Campservice.product (`group`,active,description,unit,obs,purchase_price,current_inventory,minimum_stock,sale_price,price_value,profit_margin,factory_index,list_price,rebate,original_code,original_code1,quantity_last_entry,product_location,last_supplier_id,item_type,`references`) VALUES
 	 (1,0,'KIT ESTAB INT POLO','','',8.0,0.0,0.0,16.5,16.5,100.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO',''),
 	 (1,0,'MAO OBRA','','',600.0,0.0,0.0,600.5,600.5,0.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO',''),
 	 (1,0,'COXIM HIDRAULICO LD MOTOR CLIO 1.6 16V','','',135.0,0.0,0.0,229.5,229.5,70.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO',''),
 	 (1,0,'COXIM SUP TRAS GOL G5','','',20.0,0.0,0.0,40.5,40.5,100.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO',''),
 	 (1,0,'SOMDA ZETEC 4F','','',135.0,0.0,0.0,250.0,250.0,85.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO',''),
 	 (1,0,'OLEO CX RENAUL PEG','','',80.0,0.0,0.0,80.5,80.5,0.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO',''),
 	 (1,0,'PASTILHA TRAS PEG','','',31.0,0.0,0.0,57.5,57.5,85.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO',''),
 	 (1,0,'ALAVANCA FREIO FIESTA 02/..','','',85.0,0.0,0.0,157.5,157.5,85.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO',''),
 	 (1,0,'MOLA TRAS FOX','','',50.0,0.0,0.0,82.5,82.5,65.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO',''),
 	 (1,0,'TRASEIRO','','',0.0,0.0,0.0,0.0,0.0,0.0,100.0,0.0,0.0,'','',0.0,'',NULL,'PRODUTO','');

 INSERT INTO Campservice.product (`group`,active,description,unit,obs,purchase_price,current_inventory,minimum_stock,sale_price,price_value,profit_margin,factory_index,list_price,rebate,original_code,original_code1,quantity_last_entry,product_location,last_supplier_id,item_type,`references`) VALUES
 	 (1,0,'MOLA DIANT NEW CIVIC','','',25.0,0.0,0.0,41.5,41.5,65.0,100.0,0.0,0.0,'','',0.0,'',0,'PRODUTO',''),
 	 (1,0,'COIFA LC L200 ','','',32.0,0.0,0.0,59.5,59.5,85.0,100.0,0.0,0.0,'','',0.0,'',0,'PRODUTO',''),
 	 (1,0,'KIT EMB C ROL L200','','',500.0,0.0,0.0,500.5,500.5,0.0,100.0,0.0,0.0,'','',0.0,'',0,'PRODUTO',''),
 	 (1,0,'KIT EMB C ROL RENAULT SCENIC','','',650.0,0.0,0.0,650.5,650.5,0.0,100.0,0.0,0.0,'','',0.0,'',0,'PRODUTO',''),
 	 (1,0,'DISCO FREIO PUNTO 1.4','','',55.0,-6.0,0.0,96.5,96.5,75.0,100.0,0.0,0.0,'','D25A',0.0,'',0,'PRODUTO','D25A'),
 	 (1,0,'PASTILHA PUNTO 1.4','','',45.0,-3.0,0.0,74.5,74.5,65.0,100.0,0.0,0.0,'','1062',0.0,'',0,'PRODUTO','1062'),
 	 (1,0,'BOBINA AGILE/CORSA 5P','','',200.0,0.0,0.0,370.5,370.5,85.0,100.0,0.0,0.0,'','',0.0,'',0,'PRODUTO',''),
 	 (1,0,'HOMOC LOGAN/SANDERO 21X23','','',143.0,0.0,0.0,265.0,265.0,85.0,100.0,0.0,0.0,'','kjho618',0.0,'',0,'PRODUTO','kjho618'),
 	 (1,0,'JGO JUNTA C3 1.4','','',110.0,0.0,0.0,181.5,181.5,65.0,100.0,0.0,0.0,'','',0.0,'',0,'PRODUTO',''),
 	 (1,0,'LONA TRAS GOL','','',23.0,-1.0,0.0,38.0,38.0,65.0,100.0,0.0,0.0,'','',0.0,'',0,'PRODUTO','');

 INSERT INTO Campservice.`user` (first_name,last_name,email,password) VALUES
 	 ('Evandro','Campigoto','campigoto@hotmail.com','123');

