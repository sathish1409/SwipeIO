##############################################################################################################################################|
##																																			##|
##		Procudure Name																		Desciption										##|
##																																			##|
##		insert_cards(in card_number1 varchar(8),in created_on1 datetime)					Inserts an employee.							##|
##		delete_cards(in card_id1 int)														Deletes a card.									##|
##		update_card(in card_id1 int,in card_number1 varchar(8))								Updates a card.									##|
##																																			##|
##		insert_gate(in gate_name1 varchar(20),in created_on1 datetime)						Inserts a gate.									##|
##		update_gate(in gate_id1 int,in gate_name1 varchar(10))								Updates a gate.									##|
##																																			##|
##		insert_leave_description(in leave_name varchar(25),in created datetime)				Inserts a leave desc.							##|
##		update_leave_description(in leave_id1 int,in leave_name1 varchar(10))				Updates a leave desc.							##|
##		insert_employee(in emp_number1 varchar(10),in emp_name1 varchar(25),																##|
##		-- in email1 varchar(50),in pass_word1 varchar(20),in is_admin1 bit,																##|
##		-- in is_contract1 bit,in created_on1 datetime, in card_id1 int)					Insert an Employee.								##|																												##
##																																			##|
##############################################################################################################################################|


create database swipeio;
use swipeio;
drop table if exists Employee;
drop table  if exists Main_swipe;
drop table if exists Cards;
drop table if exists Temp_card_log;
drop table if exists Gate;
drop table if exists Leave_description;
drop table if exists Leave_log;
drop table incharge_log;


################# Creation of tables #######################

create table Cards(card_id int primary key not null auto_increment,card_number varchar(8) unique,updated_on datetime,created_on datetime);
create table Employee(emp_id int primary key NOT NULL auto_increment,emp_number varchar(10) unique not null,emp_name varchar(25),email varchar(50),card_id int,is_admin bit,is_contract bit,pass_word varchar(20),created_on datetime,updated_on datetime,is_delete bit default 0,foreign key (card_id) references cards(card_id));
create table Gate(gate_id int primary key not null auto_increment,gate_name varchar(20),updated_on datetime,created_on datetime);
create table Main_swipe(log_id int primary key not null auto_increment ,date_log varchar(10),time_log time,inorout bit,emp_id int,gate_id int,card_id int,remarks varchar(50),foreign key (emp_id) references Employee(emp_id),foreign key (gate_id) references Gate(gate_id),foreign key (card_id) references Cards(card_id));
create table Temp_card_log(entry_id int primary key auto_increment not null,name_of_contracter varchar(25),date_of_log varchar(10),emp_id int,card_id int,foreign key (emp_id) references Employee(emp_id),foreign key (card_id) references cards(card_id));
create table Leave_description(leave_id int primary key not null auto_increment,leave_name varchar(25),updated_on datetime,created_on datetime);
create table Leave_log(leave_log_id int primary key not null auto_increment,from_date varchar(10),to_date varchar(10),emp_id int,leave_id int,foreign key (emp_id) references Employee(emp_id),foreign key (leave_id) references Leave_description(leave_id));
create table Incharge_log(incharge_log_id int primary key not null auto_increment,emp_id int,incharge_id int);

################################## Cards Stored Procedures ###############################

delimiter //
create procedure insert_cards(in card_number1 varchar(8),in created_on1 datetime)
begin
insert into Cards (card_number,created_on) values (card_number1,created_on1);
select * from Cards;
end//
delimiter ;

delimiter //
create procedure delete_cards(in card_id1 int)
begin
delete from Cards where card_id=card_id1;
select * from Cards;
end//
delimiter ;

delimiter //
create procedure update_card(in card_id1 int,in card_number1 varchar(8))
begin
UPDATE Cards SET card_number=card_number1,updated_on=now() where card_id=card_id1;
select * from Cards;
end//
delimiter ;

call insert_cards('00131006',now());
call insert_cards('00103691',now());
call insert_cards('00105746',now());
call insert_cards('00110554',now());
call insert_cards('00113084',now());
call insert_cards('00113577',now());
call insert_cards('00116301',now());
call insert_cards('00116726',now());
call insert_cards('00116959',now());
call insert_cards('00121938',now());
call insert_cards('00121971',now());
call insert_cards('00125838',now());
call insert_cards('00128341',now());
call insert_cards('00129692',now());
call insert_cards('00131006',now());
call insert_cards('00133243',now());
call insert_cards('00133942',now());
call insert_cards('00136154',now());
call insert_cards('00136472',now());
call insert_cards('03026090',now());
call insert_cards('03217728',now());
call insert_cards('03218772',now());
call insert_cards('03223979',now());
call insert_cards('03224988',now());
call insert_cards('03225867',now());
call insert_cards('04376776',now());
call insert_cards('04377436',now());
call insert_cards('05437274',now());
call insert_cards('05438436',now());
call insert_cards('05438564',now());
call insert_cards('05473558',now());
call insert_cards('07686186',now());
call insert_cards('07688324',now());
call insert_cards('07689910',now());
call insert_cards('07697131',now());
call insert_cards('07697132',now());
call insert_cards('07697830',now());
call insert_cards('07698959',now());
call insert_cards('07699042',now());
call insert_cards('07700287',now());
call insert_cards('07704451',now());
call insert_cards('07717440',now());
call insert_cards('07718314',now());
call insert_cards('07732879',now());
call insert_cards('07733912',now());
call insert_cards('07739921',now());
call insert_cards('07740867',now());
call insert_cards('08849623',now());
call insert_cards('08851276',now());
call insert_cards('08853219',now());
call insert_cards('08857043',now());
call insert_cards('08874664',now());
call insert_cards('08875889',now());
call insert_cards('08875905',now());
call insert_cards('08876864',now());
call insert_cards('08876880',now());
call insert_cards('08939198',now());
call insert_cards('08940071',now());
call insert_cards('08948409',now());
call insert_cards('08951495',now());
call insert_cards('08952279',now());
call insert_cards('08953435',now());
call insert_cards('08957086',now());
call insert_cards('08957921',now());

#call update_card(1,'12345678');

########################### Gate Starts #########################

delimiter //
create procedure insert_gate(in gate_name1 varchar(20),in created_on1 datetime)
begin
insert into Gate (gate_name,created_on) values (gate_name1,created_on1);
select * from Gate;
end//
delimiter ;

delimiter //
create procedure update_gate(in gate_id1 int,in gate_name1 varchar(10))
begin
update Gate set gate_name=gate_name1,updated_on=now() where gate_id=gate_id1;
select * from Gate;
end//
delimiter ;

#call update_gate(1,'enter');
call insert_gate('Entrance',now());
call insert_gate('Server Room',now());

########################### Leave Description ############################

delimiter //
create procedure insert_leave_description(in leave_name varchar(25),in created datetime)
begin
insert into Leave_description (leave_name,created_on) values (leave_name,created);
select * from Leave_description;
end //
delimiter ;

delimiter //
create procedure update_leave_description(in leave_id1 int,in leave_name1 varchar(10))
begin
update Leave_description set leave_name=leave_name1,updated_on=now() where leave_id=leave_id1;
select * from Leave_description;
end//
delimiter ;
#call update_leave_description(1,'privilege');

call insert_leave_description('casual',now());
call insert_leave_description('privillage',now());
call insert_leave_description('lose of pay',now());
call insert_leave_description('work from home',now());

########################### Employee #####################################

delimiter //
create procedure insert_employee(in emp_number1 varchar(10),in emp_name1 varchar(25),in email1 varchar(50),in pass_word1 varchar(20),in is_admin1 bit,in is_contract1 bit,in created_on1 datetime, in card_id1 int)
begin
insert into Employee (emp_number,emp_name,email,pass_word,is_contract,is_admin,created_on, card_id) values(emp_number1,emp_name1,email1,pass_word1,is_contract1,is_admin1,created_on1,card_id1); 
select * from Employee;
end//
delimiter ;
call insert_employee('000000C1','Sathish','sathish@gmail.com','123456',1,0,now(),1);

delimiter //
create procedure update_employee(in emp_number1 varchar(10),in emp_name1 varchar(25), in email1 varchar(25), in is_admin1 bit, in is_contract1 bit,in pass_word1 varchar(20))
begin
update Employee set emp_name=emp_name1,email=email1, is_admin=is_admin1,is_contract=is_contract1,updated_on=now(),pass_word=pass_word1 where emp_number=emp_number1;
select * from Employee;
end //
delimiter ;

delimiter //
create procedure delete_employee(in emp_id1 int)
begin
update Employee set is_delete=1 where emp_id=emp_id1;
select * from Employee;
end //
delimiter ;
#call delete_employee(3);

#call update_employee('1234','Sathish','sathish@cg.com',1,1,'dert');

delimiter //
create procedure total_employees()
begin
select count(*) from Employee;
end //
delimiter ;
#call total_employees();

delimiter //
create procedure get_all_employee()
begin
select * from Employee where is_delete=0;
end//
delimiter ;
#call get_all_employee;


delimiter //
create procedure Validate(in email1 varchar(50),in pass_word1 varchar(10))
begin
select * from Employee where email=email1 and pass_word=pass_word1;
end//
delimiter ;
#call Validate('sathish@gmail.com','123456');


SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;

########################### Leave Log ##################################
delimiter //
create procedure insert_leave_log(in from_date1 varchar(10),in to_date1 varchar(10),in emp_id1 int,in leave_id1 int)
begin
insert into Leave_log (from_date,to_date,emp_id,leave_id) values (from_date1,to_date1,emp_id1,leave_id1);
select * from Leave_log;
end //
delimiter ;
SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;
call insert_leave_log('23-06-2019','23-06-2019',1,1);

########################## Temp Card Log ################################

delimiter //
create procedure insert_temp_card_log(in name_of_contracter1 varchar(25),in log_date1 varchar(10),in emp_id1 int(11),card_id1 int(11))
begin
insert into Temp_card_log (name_of_contracter,date_of_log,emp_id,card_id) values (name_of_contracter1,log_date1,emp_id1,card_id1);
select * from Temp_card_log;
end //
delimiter ;
call insert_temp_card_log('suganya','2-2-2019',12,1);


############################## Incharge Log ##############################

delimiter //
create procedure insert_incharge_log(in emp_id1 int,in incharge_id1 int)
begin
insert into Incharge_log (emp_id,incharge_id) values (emp_id1,incharge_id1);
select * from Incharge_log;
end//
delimiter ;
call insert_incharge_log(1,1);

############################################## IMPORT #########################################

drop procedure insert_from_json;
delimiter //
#SET FOREIGN_KEY_CHECKS = 1;
create procedure import_to_swipe(in date1 varchar(10),in time1 varchar(10),in card_number1 varchar(10),in emp_number1 varchar(10),in gate_name1 varchar(20),in inorout1 varchar(5),in remark1 varchar(30))
begin

	select emp_id into @new_emp_id from Employee where emp_number=emp_number1;
    select gate_id into @new_gate_id from Gate where gate_name=gate_name1;
    select card_id into @new_card_id from Cards where card_number=card_number1;
    if(inorout1="In") then
    set @io=1;
    else
    set @io=0;
    end if;
    insert into Main_swipe(date_log,time_log,inorout,emp_id,gate_id,card_id,remarks)  values (date1,time1,@io,@new_emp_id,@new_gate_id,@new_card_id,remark1);
    select * from Main_swipe;
end //
delimiter ;
#call import_to_swipe('26/09/2019','11:54:01','00103100','000000C1','Entrance','In','Successful');
#select * from Main_swipe;
#truncate Main_swipe;
#select * from cards;
#select * from employee;