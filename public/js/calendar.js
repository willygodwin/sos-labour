const fetchEmployersCalendarData = () => 
    fetch(`/api/employers/calendar`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },  
    });

const parsingEmployersCalendarData = (data) => {
    return new Promise ((resolve) => {
      const Jobs = (data == null) ? [] : data.Jobs;
      const eventsArray = Jobs.map(el => {
        let event = {};
        let endDate = new Date(el.end_date).getDate() + 1;
        event.jobId = el.id;
        event.title = `${el.address}, ${el.suburb}, ${el.city} ${el.state} ${el.postcode}`,
        event.start = el.start_date;
        event.end = el.end_date.slice(0,8) + endDate;
        return event;
      })
      resolve(eventsArray) 
    })
}

const renderEmployersCalendar = (data) => {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: data,
      eventClick: function(info) {
        const jobId = info.event.jobId;
        const origin = window.location.origin;
        location.href = `${origin}/employers/viewjob/${jobId}`
      },
      eventMouseEnter: function(mouseEnterInfo){
        mouseEnterInfo.el.style.cursor = 'pointer'
        mouseEnterInfo.el.style.borderColor = 'grey';
        mouseEnterInfo.el.style.backgroundColor = 'grey';
      },  
      eventMouseLeave: function(mouseLeaveInfo){
        mouseLeaveInfo.el.style.borderColor = null;
        mouseLeaveInfo.el.style.backgroundColor = null;
      },  
    });
    calendar.render();
}

const fetchLabourersCalendarData = () => 
    fetch(`/api/labourers/calendar`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },  
    });

const parsingLabourersCalendarData = (data) => {
      return new Promise ((resolve) => {
        const Jobs = (data == null) ? [] : data;
        const eventsArray = Jobs.map(el => {
          let event = {};
          let endDate = new Date(el.Job.end_date).getDate() + 1;
          event.jobId = el.Job.id;
          event.title = `${el.Job.address}, ${el.Job.suburb}, ${el.Job.city} ${el.Job.state} ${el.Job.postcode}`,
          event.start = el.Job.start_date;
          event.end = el.Job.end_date.slice(0,8) + endDate;
          return event;
        })
        resolve(eventsArray) 
      })
  }
  
  
  const renderLabourersCalendar = (data) => {
      let calendarEl = document.getElementById('calendar');
      let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: data,
        // eventClick: function(info) {
        //   const jobId = info.event.jobId;
        //   const origin = window.location.origin;
        //   location.href = `${origin}/employers/viewjob/${jobId}`
        // },
        eventMouseEnter: function(mouseEnterInfo){
          mouseEnterInfo.el.style.cursor = 'pointer'
          mouseEnterInfo.el.style.borderColor = 'grey';
          mouseEnterInfo.el.style.backgroundColor = 'grey';
        },  
        eventMouseLeave: function(mouseLeaveInfo){
          mouseLeaveInfo.el.style.borderColor = null;
          mouseLeaveInfo.el.style.backgroundColor = null;
        },  
      });
      calendar.render();
  }   

if(window.location.pathname == '/employers/dashboard/calendar'){
  console.log('running fetch api');
  fetchEmployersCalendarData()
  .then(res => res.json())
  .then(parsingEmployersCalendarData)
  .then(renderEmployersCalendar)
  .catch((err) => console.log(err));
}

if(window.location.pathname == '/labourers/dashboard/calendar'){
  console.log('running fetch api');
  fetchLabourersCalendarData()
  .then(res => res.json())
  .then(parsingLabourersCalendarData)
  .then(renderLabourersCalendar)
  .catch((err) => console.log(err));
}


// if(window.location.href == '/employers/dashboard/calendar' || window.location.href == '/labourers/dashboard/calendar'){
//     document.addEventListener('DOMContentLoaded', function() {
//         let calendarEl = document.getElementById('calendar');
//         let calendar = new FullCalendar.Calendar(calendarEl, {
//           initialView: 'dayGridMonth',
//           events: [
//             { jobId: '1', start: '2021-03-07', end: '2021-03-08', title: 'address' },
//             { id: '2', resourceId: 'c', start: '2021-03-12', end: '2021-03-12', title: 'event 2',description:'description of event 2' },
//             { id: '3', resourceId: 'd', start: '2021-03-13', end: '2021-03-15', title: 'event 3',description:'description of event 3' },
//             { id: '4', resourceId: 'e', start: '2021-03-16T03:00:00', end: '2021-03-25T08:00:00', title: 'event 4',description:'description of event 4' },
//             { id: '5', resourceId: 'f', start: '2021-03-26T00:30:00', end: '2021-03-27T02:30:00', title: 'event 5',description:'description of event 5' },
//             { id: '6', start: '2021-02-26', end: '2021-02-27T23:59:59', title: 'event 6',description:'description of event 6' }
//           ],
//         //   displayEventTime: false,
       
//           eventClick: function(info) {
//             window.open('localhost:8080')
//             // alert('Event: ' + info.event.title);
//             // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
//             // alert('View: ' + info.view.type);
    
//             // change the border color just for fun
//             // info.el.style.borderColor = 'red';
//           },
//           eventMouseEnter: function(mouseEnterInfo){
//             mouseEnterInfo.el.style.cursor = 'pointer'
//             mouseEnterInfo.el.style.borderColor = 'red';
//             mouseEnterInfo.el.style.backgroundColor = 'red';
//           },  
//           eventMouseLeave: function(mouseLeaveInfo){
//             mouseLeaveInfo.el.style.borderColor = null;
//             mouseLeaveInfo.el.style.backgroundColor = null;
//           },  
//         });
//         calendar.render();
//       });
// }
