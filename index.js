/* Your Code Here *
/*


 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(data) {
  return data.map(createEmployeeRecord);
}

function createTimeInEvent(emp, dateTime) {
  if (!dateTime) throw new Error("createTimeInEvent requires a dateTime string");
  const [date, hour] = dateTime.split(" ");
  emp.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10)
  });
  return emp;
}

function createTimeOutEvent(emp, dateTime) {
  if (!dateTime) throw new Error("createTimeOutEvent requires a dateTime string");
  const [date, hour] = dateTime.split(" ");
  emp.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10)
  });
  return emp;
}

function hoursWorkedOnDate(emp, date) {
  const inEvent = emp.timeInEvents.find(e => e.date === date);
  const outEvent = emp.timeOutEvents.find(e => e.date === date);
  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(emp, date) {
  return hoursWorkedOnDate(emp, date) * emp.payPerHour;
}

function computeAllWagesFor(emp) {
  return emp.timeInEvents.reduce((total, e) => {
    return total + wagesEarnedOnDate(emp, e.date);
  }, 0);
}

function calculatePayroll(employees) {
  return employees.reduce((sum, emp) => sum + allWagesFor(emp), 0);
}

function findEmployeeByFirstName(collection, firstNameString) {
  return collection.find(emp => emp.firstName === firstNameString);
}

if (typeof module !== "undefined") {
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor:computeAllWagesFor,
    calculatePayroll,
    findEmployeeByFirstName,
  };
}
