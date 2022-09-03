let presentTime = moment().format("LLLL");
console.log(moment().format("LLLL"));

const currentDay = document.getElementById("currentDay");
currentDay.innerHTML = presentTime;

const timeArray = [9, 10, 11, 12, 1, 2, 3, 4, 5];

const eventContainer = document.getElementById("eventContainer");

const createDayEvents = (time, index) => {
  const DateTime = luxon.DateTime;

//   console.log("this is my index", index);
  let presentHour = DateTime.local().c.hour;
  let AMorPM;

  if (presentHour > 12) {
    AMorPM = "PM";
  } else {
    AMorPM = "AM";
  }

  if (presentHour > 12) {
    // console.log("bigger than 12");
    presentHour = presentHour - 12;
  }

  let addEventRow = eventRow(time, index, presentHour, AMorPM);

  //eventContainer.appendChild(addEventRow);
  let presentHtml = eventContainer.innerHTML;
  presentHtml += addEventRow;
  eventContainer.innerHTML = presentHtml;

//   document.querySelector(`[data-eventid=events-${index}]`).addEventListener("click", btnListener)

  const allBtns = document.querySelectorAll('.saveBtn');
  for (let i=0; i < allBtns.length; i++) {
    const element = allBtns[i];
    element.addEventListener("click", btnListener)
  }
};

let eventRow = (time, idx, presentHour, AMorPM) => {
    
let timeText;
     if (
    time == 12 ||
    time == 1 ||
    time == 2 ||
    time == 3 ||
    time == 4 ||
    time == 5
  ) {
    timeText = `${time}PM`;
  } else {
    timeText = `${time}AM`;
  }

    let timeTense;

     if (AMorPM == "AM") {
       if (presentHour == time) {
         console.log("present");
        //  textArea.setAttribute("class", "present");
         timeTense = "present";
       } else if (
         time == 1 ||
         time == 2 ||
         time == 3 ||
         time == 4 ||
         time == 5 ||
         time == 12 ||
         time > presentHour
       ) {
        //  textArea.setAttribute("class", "future");
         timeTense = "future";
         console.log("future");
       } else if (presentHour > time) {
         console.log("Past");
        //  textArea.setAttribute("class", "past");
         timeTense = "past";
       }
     } else if (AMorPM == "PM") {
       if (presentHour == time) {
         console.log("present");
        //  textArea.setAttribute("class", "present");
         timeTense = "present";
       } else if (
         time == 9 ||
         time == 10 ||
         time == 11 ||
         time == 12 ||
         time < presentHour
       ) {
         console.log("past");
        //  textArea.setAttribute("class", "past");
         timeTense = "past";
       } else {
        //  textArea.setAttribute("class", "future");
         timeTense = "future";
         console.log("future");
       }
     }

  return `
        <div class="row">
            <div class="inline hour">${timeText}</div>
            <div class="inline">
                <textarea class="${timeTense}" cols="80" name="events-${idx}" id="events-${idx}"></textarea>
            </div>
            <div class="inline">
                <button class="saveBtn" data-eventid="events-${idx}">Save</button>
            </div>
        </div>
`;
};

function btnListener(evt) {
  // console.log(evt.target.parentElement.parentElement);
  let eventId = evt.target.getAttribute("data-eventid");
  // console.log(evt.target.getAttribute("data-eventid"));
  let eventInfo = document.getElementById(eventId).value;
  let eventName = document.getElementById(eventId).getAttribute("name");
  localStorage.setItem(eventName, eventInfo);
  // console.log(eventName);
  // console.log(eventInfo);
}

// NOTE: Function: setEvents
function setEvents() {
  for (let idx = 0; idx < timeArray.length; ++idx) {
    let eventToDo = `events-${idx}`;
    // console.log(eventToDo);
    if (localStorage.getItem(eventToDo) !== null) {
    //   console.log(localStorage.getItem(eventToDo));
    //   console.log(document.getElementById(eventToDo));
      document.getElementById(eventToDo).value =
        localStorage.getItem(eventToDo);
    }
  }
}

timeArray.map((time, idx) => {
  createDayEvents(time, idx);
});

setEvents();