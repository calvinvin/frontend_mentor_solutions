function Card({item}) {
    return (
        <li className="summary__card" style={{"--card-color": `var(--${item.cssColor})`}}>
            <div className="summary__card-heading-container">
                <img className="summary__card-icon" src={item.icon} alt=""/>
                <h3 className="summary__card-heading">{item.category}</h3>
            </div>
            <p className="summary__card-content-container">
                <strong className="summary__card-score">{item.score}</strong>
                <span className="summary__card-score-maximum">/ 100</span>
            </p>
        </li>
    )
}

function CardContainer({data}) {
    return (
        <ul className="summary__card-container" role="list">
            {data.map(item=><Card item={item} key={item.category}/>)}
        </ul>
    )
}

function hydrateCards(cardContainerId, data) {
    const cardContainerElement = document.getElementById(cardContainerId);
    const cardContainer = ReactDOM.createRoot(cardContainerElement);
    cardContainer.render(<CardContainer data={data} />);
}

const summaryItems = [];
const dataURL = "./data.json";
const dataPromise = fetch(dataURL);
dataPromise.then((response)=>{
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
}).then((data)=>{
    hydrateCards("card-container", data);
});
