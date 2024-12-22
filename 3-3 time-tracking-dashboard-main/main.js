
function updateData(data) {
    data.forEach((datum) => {
        let {
            title, 
            timeframes: {
                daily,
                weekly,
                monthly,
            },
        } = datum;
        h2activities.forEach((h2) => {
            if (h2.textContent === title) {
                h2node = h2;
            }
        })
        divActivityContent = h2node.parentNode;
        divActivityContent.querySelectorAll("div.time-statistic").forEach((div) => {
            if (div.classList.contains("daily")) {
                div.querySelector("span.total-time-latest").textContent = 
                Number(daily.current) > 1 ? `${daily.current}hrs` : `${daily.current}hr`;
                div.querySelector("span.total-time-previous").textContent = 
                Number(daily.previous) > 1 ? `Yesterday - ${daily.previous}hrs` : `Yesterday - ${daily.previous}hr`;
            }
            else if (div.classList.contains("weekly")) {
                div.querySelector("span.total-time-latest").textContent = 
                Number(weekly.current) > 1 ? `${weekly.current}hrs` : `${weekly.current}hr`;
                div.querySelector("span.total-time-previous").textContent = 
                Number(weekly.previous) > 1 ? `Last week - ${weekly.previous}hrs` : `Last week - ${weekly.previous}hr`;
            }
            else if (div.classList.contains("monthly")) {
                div.querySelector("span.total-time-latest").textContent = 
                Number(monthly.current) > 1 ? `${monthly.current}hrs` : `${monthly.current}hr`;
                div.querySelector("span.total-time-previous").textContent = 
                Number(monthly.previous) > 1 ? `Last month - ${monthly.previous}hrs` : `Last month - ${monthly.previous}hr`;
            }
        })
    })
}
fetch("./data.json")
    .then(
        (response) => response.json()
    )
    .then(
        (data) => {
            updateData(data);
        }
    );

// change display data by selected timeframe
const h2activities = document.querySelectorAll("h2")
const divTimeStatistics = document.querySelectorAll("div.time-statistic");
const timeframeForm = document.getElementById("timeframe-form");
let currentTimeframe = timeframeForm.querySelector("input[type='radio']:checked").value.toLowerCase();
timeframeForm.addEventListener("change", (e) => {
    currentTimeframe = e.target.value.toLowerCase();
    divTimeStatistics.forEach((div) => {
        div.classList.remove("active");
        if (div.classList.contains(currentTimeframe)) {
            div.classList.add("active");
        }
    })
});

