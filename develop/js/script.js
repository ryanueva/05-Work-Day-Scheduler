$(document).ready(function () {
  //Holds all time slots (instead of index.html)
  const timesOfWork = [
    {
      label: "9:00AM",
      timeNumber: "9",
      userInput: "",
    },
    {
      label: "10:00AM",
      timeNumber: "10",
      userInput: "",
    },
    {
      label: "11:00AM",
      timeNumber: "11",
      userInput: "",
    },
    {
      label: "12:00PM",
      timeNumber: "12",
      userInput: "",
    },
    {
      label: "01:00PM",
      timeNumber: "13",
      userInput: "",
    },
    {
      label: "02:00PM",
      timeNumber: "14",
      userInput: "",
    },
    {
      label: "03:00PM",
      timeNumber: "15",
      userInput: "",
    },
    {
      label: "04:00PM",
      timeNumber: "16",
      userInput: "",
    },
    {
      label: "05:00PM",
      timeNumber: "17",
      userInput: "",
    },
  ];

  //Displays time (on header)
  var currentTime = dayjs().format("MMMM D, YYYY h:mm:ss A");
  console.log(currentTime);
  //appends the current time when loaded onto the page
  $("#currentDay").append(currentTime);
  //adds a row for each hour block in the timesOfWork
  $(timesOfWork).each(function () {
    let newRow = $("<div>");
    //loops through until it has all time blocks
    //adds the predetirmed row class to the new div to be added
    newRow.addClass("row");

    $(".container").append(newRow);
  });

  //adds class for the columns
  $("div .row").each(function (index) {
    let timeSlot;
    let labelEl = $("<div>");
    let userEl = $("<div>");
    //Ties in new divs to premade classes
    timeSlot = timesOfWork[index].timeNumber;
    labelEl.addClass("col-2 hour").text(timesOfWork[index].label);
    userEl.addClass("col-8 time-block").attr("value", timeSlot);
    //appends to "this" which is "div .row"
    $(this).append(labelEl);
    $(this).append(userEl);
  });

  //Styles the time blocks based actual time
  $(".time-block").each(function () {
    //makes the hours into two digit numbers
    let realTime = parseInt(dayjs().format("HH"));
    //adds "value" to "this" which is the time-block class
    let timeBlock = $(this).attr("value");
    if (realTime > timeBlock) {
      $(this).addClass("past");
    } else if (realTime === timeBlock) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  //Creates the button element (styled in css already)
  $(".time-block").each(function (index) {
    let saveBtn = $("<button>");
    let numberedBlock = timesOfWork[index].timeNumber;
    let inputArea = $("<textarea>").text(timesOfWork[index].userInput);
    //adds class using bootstrap to style and
    inputArea.addClass("col-10 description").attr("id", numberedBlock);
    saveBtn.addClass("col-2 float-right btn-lg mt-3 saveBtn").text("💾");
    $(this).append(inputArea);
    $(this).append(saveBtn);
    index++;
  });

  //saves entry to local storafge on click
  $(".saveBtn").click(function () {
    let savedEntry = $(this).siblings("textarea").val();
    let entryInput = $(this).parent().attr("value");
    localStorage.setItem(entryInput, savedEntry);
  });

  //pulls from the numbers which were labeled from 9-17
  let j = 9;
  while (j <= 17) {
    $(`#${j}`).val(localStorage.getItem(j));
    console.log(`#${j}`)
    console.log(`${j}`)
    console.log( $(`#${j}`))
    j++;
  }
});