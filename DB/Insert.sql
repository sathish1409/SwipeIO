INSERT INTO swipeio_config(description, VALUE) VALUES ('day_consideration', '07:00:00');
INSERT INTO swipeio_config(description, VALUE) VALUES('auto_import_in', 'c:\\users\\sathish.j\\swipeio\\swipelogs\\in\\');
INSERT INTO swipeio_config(description, VALUE) VALUES('auto_import_processed', 'c:\\users\\sathish.j\\swipeio\\swipelogs\\processed\\');
INSERT INTO swipeio_config(description, VALUE) VALUES('auto_import_invalid', 'c:\\users\\sathish.j\\swipeio\\swipelogs\\invalid\\');
INSERT INTO swipeio_config(description, VALUE) VALUES('auto_import_cron', '*/2 * * * *');

CALL insert_card('00103691');
CALL insert_card('00105746');
CALL insert_card('00110554');
CALL insert_card('00113084');
CALL insert_card('00113577');
CALL insert_card('00116301');
CALL insert_card('00116726');
CALL insert_card('00116959');
CALL insert_card('00121938');
CALL insert_card('00121971');
CALL insert_card('00125838');
CALL insert_card('00128341');
CALL insert_card('00129692');
CALL insert_card('00133243');
CALL insert_card('00133942');
CALL insert_card('00136154');
CALL insert_card('00136472');
CALL insert_card('03026090');
CALL insert_card('03217728');
CALL insert_card('03218772');
CALL insert_card('03223979');
CALL insert_card('03224988');
CALL insert_card('03225867');
CALL insert_card('04376776');
CALL insert_card('04377436');
CALL insert_card('05437274');
CALL insert_card('05438436');
CALL insert_card('05438564');
CALL insert_card('05473558');
CALL insert_card('07686186');
CALL insert_card('07688324');
CALL insert_card('07689910');
CALL insert_card('07697131');
CALL insert_card('07697132');
CALL insert_card('07697830');
CALL insert_card('07698959');
CALL insert_card('07699042');
CALL insert_card('07700287');
CALL insert_card('07704451');
CALL insert_card('07717440');
CALL insert_card('07718314');
CALL insert_card('07732879');
CALL insert_card('07733912');
CALL insert_card('07739921');
CALL insert_card('07740867');
CALL insert_card('08849623');
CALL insert_card('08851276');
CALL insert_card('08853219');
CALL insert_card('08857043');
CALL insert_card('08874664');
CALL insert_card('08875889');
CALL insert_card('08875905');
CALL insert_card('08876864');
CALL insert_card('08876880');
CALL insert_card('08939198');
CALL insert_card('08940071');
CALL insert_card('08948409');
CALL insert_card('08951495');
CALL insert_card('08952279');
CALL insert_card('08953435');
CALL insert_card('08957086');
CALL insert_card('08957921');

CALL insert_gate('Entrance');
CALL insert_gate('Server Room');

CALL insert_leave_description('Casual');
CALL insert_leave_description('Privilege');

CALL insert_employee('000000C4', 'Sathish', 'sathish@gmail.com', '25d55ad283aa400af464c76d713c07ad', 1, 1, '08876880');