##############################################################################################################################################|

SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;

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
drop table swipeio_config;


############################################################################################################
########################################## Creation of tables ##############################################
############################################################################################################

create table Cards	(
						card_id int primary key not null auto_increment,
                        card_number varchar(8) unique,
                        updated_on datetime,
                        created_on datetime,
                        is_delete bit default 0
					);
                    
create table Employee	(
							emp_id int primary key NOT NULL auto_increment,
                            emp_number varchar(10) unique not null,
                            emp_name varchar(25),
                            email varchar(50) unique not null,
                            card_id int,
                            is_admin bit,
                            is_contract bit,
                            pass_word varchar(20),
                            created_on datetime,
                            updated_on datetime,
                            is_delete bit default 0,
                            foreign key (card_id) references cards(card_id)
						);
                        
create table Gate	(
						gate_id int primary key not null auto_increment,
                        gate_name varchar(20),
                        updated_on datetime,
                        created_on datetime,
                        is_delete bit default 0
					);
                    
create table Main_swipe	(
                            date_log date,
                            time_log time,
                            inorout bit,
                            emp_id int,
                            gate_id int,
                            card_id int,
                            remarks varchar(50),
                            primary key(date_log,time_log,emp_id),
                            foreign key (emp_id) references Employee(emp_id),
                            foreign key (gate_id) references Gate(gate_id),
                            foreign key (card_id) references Cards(card_id)
						);
                        
create table Temp_card_log	(
								temp_card_log_id int primary key auto_increment not null,
                                date_of_usage date,
                                emp_id int,
                                card_id int,
                                foreign key (emp_id) references Employee(emp_id),
                                foreign key (card_id) references cards(card_id)
							);
                            
create table Leave_description	(
									leave_id int primary key not null auto_increment,
									leave_name varchar(25),
                                    updated_on datetime,
                                    created_on datetime,
									is_delete bit default 0
								);
                                
create table Leave_log	(	
							leave_log_id int primary key not null auto_increment,
                            from_date date,
                            to_date date,
                            emp_id int,
                            leave_id int,
                            foreign key (emp_id) references Employee(emp_id),
                            foreign key (leave_id) references Leave_description(leave_id)
						);
                        
create table Incharge_log	(
								incharge_log_id int primary key not null auto_increment,
                                emp_id int,
                                incharge_id int,
                                is_delete bit default 0
							);
                            
create table swipeio_config	(
								config_id int primary key not null auto_increment,
                                description varchar(50),
                                value varchar(20)
							);
                            
insert into swipeio_config(description,value) values('day_consideration','07:00:00');
drop procedure get_config;
delimiter //
create procedure get_config	(
									in description1 varchar(50)
								)
	begin
		select * from swipeio_config where description=description1;
	end //
delimiter ;

call get_config('day_consideration');
############################################################################################################
######################################## Cards Stored Procedures ###########################################
############################################################################################################


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a Card <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
drop procedure insert_card;
delimiter //
create procedure insert_card	(
									in card_number1 varchar(8)
								)
	begin
		insert into Cards (card_number,created_on) 
					values (card_number1,now());
	end //
delimiter ;

#----------------- <Calls> -----------------#
call insert_card('11111111');
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
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Delete a Card <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#

#drop procedure delete_cards;
delimiter //
create procedure delete_cards	(
									in card_id1 int
								)
	begin
		UPDATE Cards SET is_delete=1 where card_id=card_id1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call delete_cards(64);
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get all Cards <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure get_cards
delimiter //
create procedure get_cards()
	begin
		select * from Cards where is_delete=0;
	end//
delimiter ;
#----------------- <Calls> -----------------#
call get_cards();
#----------------- </Calls> -----------------#



#drop procedure get_cards
delimiter //
create procedure get_card(in card_id1 int)
	begin
		select * from Cards where card_id=card_id1;
	end//
delimiter ;
#----------------- <Calls> -----------------#
call get_card(1);
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Update a Card <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure update_card;
delimiter //
create procedure update_card(in card_id1 int,in card_number1 varchar(8))
	begin
		UPDATE Cards SET card_number=card_number1,updated_on=now() where card_id=card_id1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call update_card(65,'01010101');
#----------------- </Calls> -----------------#





############################################################################################################
######################################## Gate Stored Procedures ############################################
############################################################################################################



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a gate <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#

drop procedure insert_gate;
delimiter //
create procedure insert_gate	(
									in gate_name1 varchar(20)
								)
	begin
		insert into Gate (gate_name,created_on) values (gate_name1,now());
	end //
delimiter ;

#----------------- <Calls> -----------------#
call insert_gate('Entrance');
call insert_gate('Server Room');
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Delete a gate <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure delete_gate;
delimiter //
create procedure delete_gate	(
									in gate_id1 int
								)
	begin
		update Gate set is_delete=1 where gate_id=gate_id1;
	end //
delimiter ;
#----------------- <Calls> -----------------#
#call delete_gate(1);
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get All Gates <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure get_gates;
delimiter //
create procedure get_gates	()
	begin
		select * from gate where is_delete=0;
	end //
delimiter ;
#----------------- <Calls> -----------------#
call get_gates();
#----------------- </Calls> -----------------#

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Update a Gate<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure update_gate;
delimiter //
create procedure update_gate	(	
									in gate_id1 int,
                                    in gate_name1 varchar(10)
								)
	begin
		update Gate set gate_name=gate_name1,updated_on=now() where gate_id=gate_id1;
	end//
delimiter ;

#----------------- <Calls> -----------------#
#call update_gate(3,'Pantry');
#----------------- </Calls> -----------------#



############################################################################################################
################################# Leave Description Stored Procedures ######################################
############################################################################################################

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a Leave Descripton <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#

#drop procedure insert_leave_description;
delimiter //
create procedure insert_leave_description	(
												in leave_name1 varchar(25)
											)
	begin
		insert into Leave_description (leave_name,created_on) values (leave_name1,now());
	end //
delimiter ;

#----------------- <Calls> -----------------#
call insert_leave_description('Casual');
call insert_leave_description('Privilege');
call insert_leave_description('Loss of Pay');
call insert_leave_description('Work From Home');
call insert_leave_description('Gonna be deleted');
#----------------- </Calls> -----------------#



#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Delete a Leave Descripton <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure delete_leave_description;
delimiter //
create procedure delete_leave_description	(
												in leave_id1 int
											)
	begin
		update Leave_description set is_delete=1 where leave_id=leave_id1;
	end //
delimiter ;
#----------------- <Calls> -----------------#
call delete_leave_description(5);
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get All Leave Descriptons <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure get_leave_descriptions	;
delimiter //
create procedure get_leave_descriptions	()
	begin
		select * from Leave_description where is_delete=0;
	end //
delimiter ;
#----------------- <Calls> -----------------#
call get_leave_descriptions();
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Update a Leave Descripton <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure update_leave_description;
delimiter //
create procedure update_leave_description	(
												in leave_id1 int,
												in leave_name1 varchar(25)
											)
	begin
		update Leave_description set leave_name=leave_name1,updated_on=now() where leave_id=leave_id1;
	end//
delimiter ;

#----------------- <Calls> -----------------#
#call update_leave_description(1,'privilege');
#----------------- </Calls> -----------------#



############################################################################################################
###################################### Employee Stored Procedures ##########################################
############################################################################################################


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Insert an Employee  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#


#drop procedure insert_employee;
delimiter //
create procedure insert_employee(	
									in emp_number1 varchar(10),
									in emp_name1 varchar(25),
                                    in email1 varchar(50),
                                    in pass_word1 varchar(20),
                                    in is_admin1 bit,
                                    in is_contract1 bit,
                                    in card_id1 varchar(20)
								)
	begin
		select card_id 	into @new_card_id 
						from Cards where card_number=card_id1;
    
	insert into Employee	(
								emp_number,
                                emp_name,
                                email,
                                pass_word,
                                is_contract,
                                is_admin,
                                created_on,
                                card_id
							) 
				values		(
								emp_number1,
                                emp_name1,
                                email1,
                                pass_word1,
                                is_contract1,
                                is_admin1,
                                now(),
                                @new_card_id
							); 
	select * from Employee where emp_number=emp_number1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call insert_employee('000000C4','Manimozhiyal','mani@gmail.com','123456',0,0,'08876880');
#----------------- </Calls> -----------------#





#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Delete an Employee  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#


#drop procedure delete_employee;
delimiter //
create procedure delete_employee	(
										in emp_id1 int
									)
	begin
    call clear_incharge_log(emp_id1);
		update Employee set is_delete=1 where emp_id=emp_id1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call delete_employee(2);
#----------------- </Calls> -----------------#




#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get All Employees <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
drop procedure get_employees;
delimiter //
create procedure get_employees()
	begin
		select * from Employee where is_delete=0;
	end //
delimiter ;

#----------------- <Calls> -----------------#
call get_employees;
#----------------- </Calls> -----------------#

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get All Employees <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
drop procedure get_employee;
delimiter //
create procedure get_employee(in emp_id1 int)
	begin
		select * from Employee where emp_id=emp_id1 and is_delete=0;
	end //
delimiter ;

#----------------- <Calls> -----------------#
call get_employee(5);
#----------------- </Calls> -----------------#

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Update an Employee <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
drop procedure update_employee;
delimiter //
create procedure update_employee	(	
										in emp_id1 int,
										in emp_name1 varchar(25),
										in email1 varchar(50),
										in pass_word1 varchar(20),
										in is_admin1 bit,
										in is_contract1 bit,
										in card_id1 varchar(10)
									)
	begin
		select card_id 	into @new_card_id 
						from Cards where card_number=card_id1;
		update Employee set 
                                emp_name=emp_name1,
								email=email1, 
								pass_word=pass_word1,
                                is_admin=is_admin1,
                                is_contract=is_contract1,
                                card_id=@new_card_id,
                                updated_on=now()
						where 
								emp_id=emp_id1;
	end //
delimiter ;

#----------------- <Calls> -----------------#
call update_employee(5,'Mani','mani1@gmail.com',123456,1,1,'00110554');
call get_employee(5);
#----------------- </Calls> -----------------#
set foreign_key_checks=0;
delete from Employee where emp_id=48;


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Validate an Employee <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
delimiter //
	create procedure Validate(in email1 varchar(50),in pass_word1 varchar(10))
	begin
		select * from Employee where email=email1 and pass_word=pass_word1;
	end//
delimiter ;

#----------------- <Calls> -----------------#
#call Validate('sathish@gmail.com','123456');
#----------------- </Calls> ----------------#





############################################################################################################
###################################### Leave Log Stored Procedures #########################################
############################################################################################################

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a leave log <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure insert_leave_log;
delimiter //
create procedure insert_leave_log	(
										in from_date1 date,
										in to_date1 date,
                                        in emp_id1 int,
                                        in leave_id1 int
									)
	begin
		insert into Leave_log	(
									from_date,
                                    to_date,
                                    emp_id,
                                    leave_id
								) 
						values 	(
									from_date1,
                                    to_date1,
                                    emp_id1,
                                    leave_id1
								);
	end //
delimiter ;

#----------------- <Calls> -----------------#
call insert_leave_log('2019/5/6','2019/5/8',1,1);
#----------------- </Calls> -----------------#

select * from Leave_log;




############################################################################################################
#################################### Temp Card Log Stored Procedures #######################################
############################################################################################################

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a temp card log <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure insert_temp_card_log;
delimiter //
create procedure insert_temp_card_log	(
											in date_of_usage1 date,
                                            in emp_id1 int,
                                            in card_id1 int
										)
	begin
		insert into Temp_card_log	(
                                        date_of_usage,
                                        emp_id,
                                        card_id
									) 
							values 	(
										date_of_usage1,
										emp_id1,
                                        card_id1
									);
	end //
delimiter ;
#----------------- <Calls> -----------------#
#call insert_temp_card_log('2019/04/09',1,36);
#----------------- </Calls> -----------------#



############################################################################################################
##################################### Incharge Log Stored Procedures #######################################
############################################################################################################

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Insert a incharge maps <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure insert_incharge_log;
delimiter //
create procedure insert_incharge_log(in emp_id1 int,in incharge_id1 int)
	begin
		if(not emp_id1 = incharge_id1) then
		insert into Incharge_log (emp_id,incharge_id) values (emp_id1,incharge_id1);
        end if;
	end //
delimiter ;

#----------------- <Calls> -----------------#
#call insert_incharge_log(2,1);
#----------------- </Calls> -----------------#

select * from Incharge_log;


###################################

#drop procedure insert_incharge_log;
delimiter //
create procedure clear_incharge_log(in emp_id1 int)
	begin
		delete from Incharge_log where emp_id=emp_id1;
	end //
delimiter ;
SET SQL_SAFE_UPDATES = 0;

call clear_incharge_log(48);
#----------------- <Calls> -----------------#
#call insert_incharge_log(2,1);
#----------------- </Calls> -----------------#


select * from Incharge_log;
####################################









drop procedure get_reporting_employees;
delimiter //
create procedure get_reporting_employees(in incharge_id1 int)
	begin
		select * from Incharge_log where incharge_id=incharge_id1;
	end //
delimiter ;
call get_reporting_employees(7);
call get_employee(12);
drop procedure get_reporting_employees;
delimiter //
create procedure get_incharges(in emp_id1 int)
	begin
		select * from Incharge_log where emp_id=emp_id1;
	end //
delimiter ;
call get_incharges(4);




#############################################################################################################
######################################## Import Stored Procedures ###########################################
#############################################################################################################


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Import data to main swipe <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
drop procedure import_to_swipe;
delimiter //
create procedure import_to_swipe	(
										in date1 date,
                                        in time1 varchar(10),
                                        in card_number1 varchar(10),
                                        in emp_number1 varchar(10),
                                        in gate_name1 varchar(20),
                                        in inorout1 varchar(5),
                                        in remark1 varchar(30)
									)
	begin
		set @is_exist_employee=0;
        set @is_exist_card=0;
        set @new_emp_id=0;
        set @lesscount=0;
        
        select count(card_id) into @is_exist_card from Cards where card_number=card_number1;
        if(@is_exist_card=0)then
			call insert_card(card_number1);
        end if;
		select count(emp_id) into @is_exist_employee from Employee where emp_number=emp_number1;
        if(@is_exist_employee=0)then
			set @new_email=concat(emp_number1,"@congruentglobal.com") ;
			call insert_employee(emp_number1,'N/A',@new_email,'12345678',0,0,card_number1);
        end if;
		select emp_id into @new_emp_id from Employee where emp_number=emp_number1;
		select card_id into @new_card_id from Cards where card_number=card_number1;
		select gate_id into @new_gate_id from Gate where gate_name=gate_name1;
		if(inorout1="In") then
			set @io=1;
		else
			set @io=0;
		end if;

		insert into Main_swipe	(
									date_log,
									time_log,
									inorout,
									emp_id,
									gate_id,
									card_id,
									remarks
								)  
						values 	(
									date1,
									time1,
									@io,
									@new_emp_id,
									@new_gate_id,
									@new_card_id,
									remark1
								)
			ON DUPLICATE KEY UPDATE inorout=@io,gate_id=@new_gate_id,remarks=remark1,card_id=@new_card_id;

	end //
delimiter ;


#----------------- <Calls> -----------------#
call import_to_swipe('2019/07/04','11:52:01','00103100','000000i1','Entrance','In','Successful');
#----------------- </Calls> -----------------#

#select * from Main_swipe order by date_log DESC, time_log DESC limit 5 ;
#select count(*) from Main_swipe where date_log >= '2019/01/22' and time_log<'21:54:01' and emp_id=2;
#select @count;
select count(*) from Main_swipe;

truncate Main_swipe;


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get swipe log for a given date and emp id <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
drop procedure get_swipe_log;
delimiter //
create procedure get_swipe_log	(
									in emp_id1 int,
                                    in date1 varchar(30)
								)
begin
    select * from Main_swipe where emp_id=emp_id1 and gate_id=1 and date_log=date1 and time_log > '07:00:00';
end //
delimiter ;

#----------------- <Calls> -----------------#
call get_swipe_log(2,"2019/05/15");
#----------------- </Calls> -----------------#
delete from Main_swipe where log_id=120;

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get Dates between the given range <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
#drop procedure get_dates;
delimiter //
create procedure get_dates(in emp_id1 int,in from_date varchar(20),in to_date varchar(20))
begin
    select * from Main_swipe where emp_id=emp_id1 and gate_id=1 and date_log between from_date and to_date group by date_log;
end //
delimiter ;

#----------------- <Calls> -----------------#
call get_dates(1,"2019/04/15","2019/05/30");
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get swipe log for a given date and emp id <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
drop procedure get_swipe_log_ref;
delimiter //
create procedure get_swipe_log_ref	(
									in emp_id1 int,
                                    in today1 varchar(30),
                                    in tomorrow1 varchar(30),
                                    in gate_id1 int
								)
begin
	select DISTINCTROW value into @day_cons from swipeio_config where description='day_consideration';
   ( select * from Main_swipe where emp_id=emp_id1 and gate_id=gate_id1 and date_log=today1 and time_log>@day_cons)union
    (select * from Main_swipe where emp_id=emp_id1 and gate_id=gate_id1 and date_log=tomorrow1 and time_log<@day_cons);
end //
delimiter ;

#----------------- <Calls> -----------------#
call get_swipe_log_ref(11,"2019/04/22","2019/04/23",1);
#----------------- </Calls> -----------------#


#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Get Last logs <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#
delimiter //
create procedure get_last_dates_of_employee(in emp_id1 int, in limit1 int)
begin
    SELECT * FROM Main_swipe  where emp_id=emp_id1 and remarks="Successful"  group by date_log
	ORDER BY date_log DESC
	LIMIT limit1;
end //
delimiter ;
call get_last_dates_of_employee(1,7);
select * from Main_swipe;
select count(*) from  Main_swipe;
drop procedure get_last_dates_of_employee;



delimiter //
create procedure get_last_date()
begin
    SELECT * FROM Main_swipe group by date_log	ORDER BY date_log DESC LIMIT 1;
end //
delimiter ;

call get_last_date();
delete * from employee where 
