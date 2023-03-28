const Calendar = (nowDate) => {

    let nowYear = nowDate.getFullYear();
    let nowMonthIndex = nowDate.getMonth();
    let months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    let monthList = months[nowMonthIndex];

    const preDay = new Date(nowYear, nowMonthIndex, 1).getDay();
    const preDate = new Date(nowYear, nowMonthIndex, 0).getDate();
    const endDay = new Date(nowYear, nowMonthIndex + 1, 0).getDay();
    const endDate = new Date(nowYear, nowMonthIndex + 1, 0).getDate();
    
    const handleClickDay = (dayElement) => {
        dayElement.addEventListener('click', (e) => {
            e.target.parentElement.querySelectorAll('.click-date').forEach(element => {
                element.classList.remove('click-date');
            });

            const inputElement = element.parentElement.querySelector('input');
            inputElement.value = e.target.dataset.date;
            dayElement.classList.add('click-date');
            element.classList.add('hidden');
        })
    };


    const beforeDays = [];
    for (let i = preDate - preDay + 1; i <= preDate; i++) {
        let dayElement = document.createElement('div');
        dayElement.className = 'previous-day';
        dayElement.innerHTML = String(i);
        beforeDays.push(dayElement);

        const month = String(nowDate.getMonth()).padStart(2, '0');
        const day = String(i).padStart(2, '0');
        dayElement.dataset.date = `${nowDate.getFullYear()}-${month}-${day}`;

        handleClickDay(dayElement);
    }


    const currentDate = new Date();

    const currentDays = [];
    for (let i = 1; i <= endDate; i++) {
        let addClass = '';
        if(nowDate.getFullYear() === currentDate.getFullYear()
            && nowDate.getMonth() === currentDate.getMonth()
            && nowDate.getDate() === i
        ) {
            addClass = 'today';
        }

        let dayElement = document.createElement('div');
        dayElement.className = `day ${addClass}`;
        dayElement.innerHTML = String(i);
        const month = String(nowDate.getMonth() + 1).padStart(2, '0');
        const day = String(i).padStart(2, '0');
        dayElement.dataset.date = `${nowDate.getFullYear()}-${month}-${day}`;

        handleClickDay(dayElement);

        currentDays.push(dayElement);
    }


    const nextDays = [];
    for (let i = 1; i < (7 - endDay-1 === 7 ? 0 : 7 - endDay); i++) {
        let dayElement = document.createElement('div');
        dayElement.className = 'next-day';
        dayElement.innerHTML = String(i);
        nextDays.push(dayElement);

        const month = String(nowDate.getMonth() + 2).padStart(2, '0');
        const day = String(i).padStart(2, '0');
        dayElement.dataset.date = `${nowDate.getFullYear()}-${month}-${day}`;

        handleClickDay(dayElement);
    }

    let element = document.createElement('div');
    element.className = 'calendar hidden';

    const calendarNavElement = document.createElement('div');
    calendarNavElement.className = 'calendar-nav';


    const leftNavElement = document.createElement('div');
    leftNavElement.className = 'triangle-left';
    leftNavElement.addEventListener('click', function () {
        const calendar = Calendar(new Date(nowDate.setMonth(nowDate.getMonth() - 1)));
        calendar.classList.remove('hidden');
        element.replaceWith(calendar);
    });

    calendarNavElement.appendChild(leftNavElement);

    calendarNavElement.insertAdjacentHTML('beforeend', `
        <div class='view-month-year'>
            <div class='month'>${monthList}</div>
            <div class='year'>${nowYear}</div>
        </div>
    `);

    const rightNavElement = document.createElement('div');
    rightNavElement.className = 'triangle-right';
    rightNavElement.addEventListener('click', function () {
        const calendar = Calendar(new Date(nowDate.setMonth(nowDate.getMonth() + 1)));
        calendar.classList.remove('hidden');
        element.replaceWith(calendar);
    });

    calendarNavElement.appendChild(rightNavElement);
    element.appendChild(calendarNavElement);


    let calendarGridElement = document.createElement('div');
    calendarGridElement.className = 'calendar-grid';

    calendarGridElement.insertAdjacentHTML('beforeend', `
            <div class='day-of-the-week'>SUN</div>
            <div class='day-of-the-week'>MON</div>
            <div class='day-of-the-week'>TUE</div>
            <div class='day-of-the-week'>WED</div>
            <div class='day-of-the-week'>THU</div>
            <div class='day-of-the-week'>FRI</div>
            <div class='day-of-the-week'>SAT</div>
    `);

    element.appendChild(calendarGridElement);

    beforeDays.map(day => {
        calendarGridElement.appendChild(day);
    });

    currentDays.map(day => {
        calendarGridElement.appendChild(day);
    });

    nextDays.map(day => {
        calendarGridElement.appendChild(day);
    });


    return element;

}

export default Calendar;