const factories = [
  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
  { name: "BR4", employees: [] }
]; 

//question 1
function countEmployeesNumberByFactory()
{
	let result = [];
	
	for(i in factories)
	{
		result.push( {name:factories[i].name , count:factories[i].employees.length} );
	}
	
	return result;
}


//question 2
function countFactoriesNumberByEmployee()
{
	let result = [];
	let added = false;
	
	//find every employee in every factory
	for(i in factories)
	{
		for(j in factories[i].employees)
		{
			//check if the employee has been in result array
			for(k in result)
			{
				if(result[k].name == factories[i].employees[j])
				{
					//in result array , count + 1
					result[k].count+=1;
					added = true;
					break;
				}
			}
			//not in result array , push a new object
			if(!added)
				result.push( {name:factories[i].employees[j] , count:1} )
			else
				added = false;
		}
	}
	
	return result;
}


//question 3
function orderEmployeesByAlphabeticalOrder()
{
	for(factory in factories)
	{
		factories[factory].employees=factories[factory].employees.sort();
	}	
	return factories;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
const employeeType = [
	  {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
	  {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
	  {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
		{id: 1, name: "Alice", type: 2},
		{id: 2, name: "Bob", type: 3},
		{id: 3, name: "John", type: 2},
		{id: 4, name: "Karen", type: 1},
		{id: 5, name: "Miles", type: 3},
		{id: 6, name: "Henry", type: 1}
];

const tasks = [
	  {id: 1, title: "task01", duration: 60},
	  {id: 2, title: "task02", duration: 120},
	  {id: 3, title: "task03", duration: 180},
	  {id: 4, title: "task04", duration: 360},
	  {id: 5, title: "task05", duration: 30},
	  {id: 6, title: "task06", duration: 220},
	  {id: 7, title: "task07", duration: 640},
	  {id: 8, title: "task08", duration: 250},
	  {id: 9, title: "task09", duration: 119},
	  {id: 10, title: "task10", duration: 560},
	  {id: 11, title: "task11", duration: 340},
	  {id: 12, title: "task12", duration: 45},
	  {id: 13, title: "task13", duration: 86},
	  {id: 14, title: "task14", duration: 480},
	  {id: 15, title: "task15", duration: 900}
];
//question 4
function totalHoursWorkedInOneDay()
{
	let typeWorkTime=[];
	let begin = [];
	let end = [];
	let work_time=0;
	
	//calculate work time for each type 
	for(type in employeeType)
	{
		begin = employeeType[type].work_begin.split(':');
		end = employeeType[type].work_end.split(':');
		
		for(i=0;i<3;i++)
		{
			begin[i]=parseInt(begin[i]);
			end[i]=parseInt(end[i]);
		}
		
		work_time = (end[0]-begin[0])*3600 + (end[1]-begin[1])*60 + end[2]-begin[2];
		if(work_time <= 0)
			work_time += 86400;
		typeWorkTime.push({id:employeeType[type].id , work_time:work_time});
	}
	
	//calculate work time for each employee and sum them
	let total_work_time = 0;
	let type_found = false;
	for(employee in employees)
	{
		for(type in typeWorkTime)
		{
			if(employees[employee].type == typeWorkTime[type].id)
			{
				total_work_time += typeWorkTime[type].work_time;
				type_found = true;
				break;
			}
		}
		//if type not found , print error message
		if(!type_found)
			console.log("Work type : " + employee["type"] + " of " + employee["name"] + "not found");
		else
			type_found = false;
	}
	return total_work_time/3600;
}



//question 5
function howManyEmployeeByTime(time)
{
	let workDurationOfType = [];
	let begin = [];
	let end = [];

	//turn time string to simple numbers for convenient comparison
	let time_split = time.split(':');
	let time_in_second = 0;
	
	for(type in employeeType)
	{
		begin = employeeType[type].work_begin.split(':');
		end = employeeType[type].work_end.split(':');
		
		for(i=0;i<3;i++)
		{
			time_split[i]=parseInt(time_split[i]);
			begin[i] = parseInt(begin[i]);
			end[i] = parseInt(end[i]);
		}
		workDurationOfType.push( {id:employeeType[type].id , work_begin:begin[0]*3600+begin[1]*60+begin[2] , work_end:end[0]*3600+end[1]*60+end[2]} );
	}
	
	time_in_second = time_split[0]*3600+time_split[1]*60+time_split[2];
	if(time_in_second == 0)
		time_in_second=86400;
	//prevent work over 00:00:00 count wrongly, add 86400
	for(duration in workDurationOfType)
	{
		if(workDurationOfType[duration].work_begin > workDurationOfType[duration].work_end)
			workDurationOfType[duration].work_end += 86400;
	}
	
	//count employees number for each type
	let type_employee_number = [];
	let added = false;
	for(employee in employees)
	{
		for(type in type_employee_number)
		{
			if(type_employee_number[type].id == employees[employee].type )
			{
				type_employee_number[type].count+=1;
				added = true;
				break;
			}
		}
		if(!added)
			type_employee_number.push({id:employees[employee].type , count:1});
		else
			added = false;
	}
	
	//if work type is in the target duration,add the employee number of the type to the result
	let result = 0;
	for(duration in workDurationOfType)
	{
		if(time_in_second >= workDurationOfType[duration].work_begin && time_in_second <= workDurationOfType[duration].work_end)
		{
			for(type in type_employee_number)
			{
				if(workDurationOfType[duration].id == type_employee_number[type].id)
				{
					result += type_employee_number[type].count;
					break;
				}
			}
			
		}
			
	}
	return result;
	
}

//question 6
function daysNeedForAllTask()
{
	let total_time = 0;
	//sum all tasks' time
	for(task in tasks)
	{
		total_time += tasks[task].duration;
	}
	//return the min days needed
	return Math.ceil(total_time/(60*15));
}