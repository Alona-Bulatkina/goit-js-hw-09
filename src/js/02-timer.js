import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let userDate;

const start = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

start.setAttribute('disabled', true);
start.addEventListener('click', onStartBtn);

const options = {
    enableTime: true, 
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userDate = selectedDates[0];
      if (userDate > Date.now()) {
          start.removeAttribute('disabled');
      } else {
          Notify.failure("Please choose a date in the future");
          start.setAttribute('disabled', true);
      } 
    },
  };
  flatpickr("input#datetime-picker", options);

  function onStartBtn () {
    setInterval(() => {
        if (userDate <= Date.now()) return;
        const currentTime = convertMs(userDate - Date.now());

        seconds.textContent = addLeadingZero(currentTime.seconds);
        minutes.textContent = addLeadingZero(currentTime.minutes);
        hours.textContent = addLeadingZero(currentTime.hours);
        days.textContent = addLeadingZero(currentTime.days);
        
    }, 1000);
};

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}
  