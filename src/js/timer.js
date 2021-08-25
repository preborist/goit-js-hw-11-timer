const refs = {
  timerDays: document.querySelector('[data-value=days]'),
  timerHours: document.querySelector('[data-value=hours]'),
  timerMins: document.querySelector('[data-value=mins]'),
  timerSecs: document.querySelector('[data-value=secs]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;
    setInterval(this.timerTime, 1000);
  }
  timerTime = () => {
    const currentTime = Date.now();
    const time = this.targetDate - currentTime;

    function pad(value) {
      return String(value).padStart(2, '0');
    }
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    refs.timerDays.textContent = days;

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    refs.timerHours.textContent = hours;

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    refs.timerMins.textContent = mins;

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
    refs.timerSecs.textContent = secs;
  };
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 1, 2022'),
});
