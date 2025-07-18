/* Your Code Here *
/*


 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

/*const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
*/

// 1. createEmployeeRecord
// input: [firstName, familyName, title, payPerHour]
// output: employee object with timeInEvents and timeOutEvents arrays
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// 2. createEmployeeRecords
// input: array of arrays (each subarray like above)
// output: array of employee records
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// 3. createTimeInEvent
// input: employee record (this), dateStamp "YYYY-MM-DD HHMM"
// adds a TimeIn event object to timeInEvents, returns updated record
function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });
  return this;
}

// 4. createTimeOutEvent
// input: employee record (this), dateStamp "YYYY-MM-DD HHMM"
// adds a TimeOut event object to timeOutEvents, returns updated record
function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  return this;
}

// 5. hoursWorkedOnDate
// input: date "YYYY-MM-DD"
// returns hours worked that day as integer
function hoursWorkedOnDate(date) {
  const inEvent = this.timeInEvents.find(e => e.date === date);
  const outEvent = this.timeOutEvents.find(e => e.date === date);
  return (outEvent.hour - inEvent.hour) / 100;
}

// 6. wagesEarnedOnDate
// input: date "YYYY-MM-DD"
// returns pay owed as number
function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// 7. allWagesFor
// no input, returns sum of wages for all dates worked by employee record (this)
function allWagesFor() {
  // collect all unique dates from timeInEvents
  const dates = this.timeInEvents.map(e => e.date);
  // sum wages for all dates
  return dates.reduce((total, d) => total + wagesEarnedOnDate.call(this, d), 0);
}

// 8. findEmployeeByFirstName
// input: array of employee records, firstName string
// returns employee record or undefined
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(emp => emp.firstName === firstName);
}

// 9. calculatePayroll
// input: array of employee records
// returns total payroll owed to all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, emp) => total + allWagesFor.call(emp), 0);
}

// Export functions for test harness (if using Node.js)
if (typeof module !== "undefined") {
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
  };
}
