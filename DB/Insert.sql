#Insert Day Consideration Config
insert into swipeio_config(description,value) values('day_consideration','07:00:00');
insert into swipeio_config(description,value) values('auto_import_in','C:\\Users\\sathish.j\\SwipeIO\\SwipeLogs\\IN\\');
insert into swipeio_config(description,value) values('auto_import_processed','C:\\Users\\sathish.j\\SwipeIO\\SwipeLogs\\PROCESSED\\');
insert into swipeio_config(description,value) values('auto_import_invalid','C:\\Users\\sathish.j\\SwipeIO\\SwipeLogs\\INVALID\\');
insert into swipeio_config(description,value) values('auto_import_cron','*/2 * * * *');

#Insert Cards
call insert_card('00103691');
call insert_card('00105746');
call insert_card('00110554');
call insert_card('00113084');
call insert_card('00113577');
call insert_card('00116301');
call insert_card('00116726');
call insert_card('00116959');
call insert_card('00121938');
call insert_card('00121971');
call insert_card('00125838');
call insert_card('00128341');
call insert_card('00129692');
call insert_card('00133243');
call insert_card('00133942');
call insert_card('00136154');
call insert_card('00136472');
call insert_card('03026090');
call insert_card('03217728');
call insert_card('03218772');
call insert_card('03223979');
call insert_card('03224988');
call insert_card('03225867');
call insert_card('04376776');
call insert_card('04377436');
call insert_card('05437274');
call insert_card('05438436');
call insert_card('05438564');
call insert_card('05473558');
call insert_card('07686186');
call insert_card('07688324');
call insert_card('07689910');
call insert_card('07697131');
call insert_card('07697132');
call insert_card('07697830');
call insert_card('07698959');
call insert_card('07699042');
call insert_card('07700287');
call insert_card('07704451');
call insert_card('07717440');
call insert_card('07718314');
call insert_card('07732879');
call insert_card('07733912');
call insert_card('07739921');
call insert_card('07740867');
call insert_card('08849623');
call insert_card('08851276');
call insert_card('08853219');
call insert_card('08857043');
call insert_card('08874664');
call insert_card('08875889');
call insert_card('08875905');
call insert_card('08876864');
call insert_card('08876880');
call insert_card('08939198');
call insert_card('08940071');
call insert_card('08948409');
call insert_card('08951495');
call insert_card('08952279');
call insert_card('08953435');
call insert_card('08957086');
call insert_card('08957921');

#Insert Gates
call insert_gate('Entrance');
call insert_gate('Server Room');

#Insert Leaves
call insert_leave_description('Casual');
call insert_leave_description('Privilege');

#Insert Employees
call insert_employee('000000C4','Sathish','sathish@gmail.com','25d55ad283aa400af464c76d713c07ad',1,1,'08876880');
