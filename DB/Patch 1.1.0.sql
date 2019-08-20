#################################### DB Patch for SwipeIO 1.1.0 ##############################################
use swipeio;
#Creating and Altering Tables
create table regularized_reasons(regularized_reason_id int primary key auto_increment,regularized_reason varchar(40),updated_on DATETIME,created_on DATETIME,is_delete BIT DEFAULT 0);
ALTER TABLE Main_swipe ADD is_regularized bit default 0;
ALTER TABLE Main_swipe ADD regularized_reason_id int default 0;
ALTER TABLE Main_swipe ADD FOREIGN KEY (regularized_reason_id)
        REFERENCES regularized_reasons (regularized_reason_id);
ALTER TABLE Main_swipe ADD regularized_by int default 0;
ALTER TABLE Main_swipe ADD FOREIGN KEY (regularized_by)
        REFERENCES Employee (emp_id);
#New Stored Procedures
delimiter //
create procedure insert_regularized_reason(
									in regularized_reason1 varchar(40)
								)
	begin
		insert into regularized_reasons(regularized_reason,created_on) 
					values (regularized_reason1,now());
	end //
delimiter ;
call insert_regularized_reason("Went to Meeting");
call insert_regularized_reason("Worked from home");
call insert_regularized_reason("Took interview");
delimiter //
create procedure delete_regularized_reason	(
									in regularized_reason_id1 int
								)
	begin
		UPDATE regularized_reasons SET is_delete=1 where regularized_reason_id=regularized_reason_id1;
	end //
delimiter ;
delimiter //
create procedure get_regularized_reasons()
	begin
		select * from regularized_reasons where is_delete=0;
	end//
delimiter ;
delimiter //
create procedure get_regularized_reason(in regularized_reason_id1 int)
	begin
		select * from regularized_reasons where regularized_reason_id=regularized_reason_id1;
	end//
delimiter ;

#Modifiying Existing Stored Procedures

drop procedure get_swipe_log_ref;
delimiter //
create procedure get_swipe_log_ref	(
									in emp_id1 int,
                                    in today1 varchar(30),
                                    in tomorrow1 varchar(30),
                                    in gate_id1 int
								)
begin
	SELECT card_id INTO @card_id from Employee where emp_id=emp_id1;
	select DISTINCTROW value into @day_cons from swipeio_config where description='day_consideration';
   (select * from Main_swipe where emp_id=emp_id1 and card_id=@card_id and remarks="Successful" and gate_id=gate_id1 and date_log=today1 and time_log>@day_cons)union
    (select * from Main_swipe where emp_id=emp_id1 and card_id=@card_id and remarks="Successful" and gate_id=gate_id1 and date_log=tomorrow1 and time_log<@day_cons);
end //
delimiter ;
drop procedure get_last_dates_of_employee;
delimiter //
create procedure get_last_dates_of_employee(in emp_id1 int, in limit1 int)
begin
	SELECT card_id INTO @card_id from Employee where emp_id=emp_id1;
    SELECT DISTINCT date_log FROM Main_swipe  where emp_id=emp_id1 and card_id=@card_id and remarks="Successful" ORDER BY date_log DESC
	LIMIT limit1;
end //
delimiter ;
drop procedure get_dates;
delimiter //
create procedure get_dates(in emp_id1 int,in from_date varchar(20),in to_date varchar(20),in gate_id1 int)
begin
SELECT card_id INTO @card_id from Employee where emp_id=emp_id1;
    select DISTINCT date_log from Main_swipe where emp_id=emp_id1 and card_id=@card_id and gate_id=gate_id1 and date_log between from_date and to_date;
end //
delimiter ;
drop procedure insert_log;
delimiter //
create procedure insert_log(in date_log1 varchar(20),in time_log1 varchar(20),in inorout1 bool,in emp_id1 int,in gate_id1 int,in card_id1 int,in regularized_reason_id1 int,in regularized_by1 int)
begin
  INSERT INTO Main_swipe(date_log,time_log,inorout,emp_id,gate_id,card_id,remarks,is_regularized,regularized_reason_id,regularized_by) VALUES (date_log1,time_log1,inorout1,emp_id1,gate_id1,card_id1,"Successful",1,regularized_reason_id1,regularized_by1);
end //
delimiter ;
