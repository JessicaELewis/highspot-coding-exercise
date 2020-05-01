import React from 'react';

const Cards = ({ cards }) => {
    return (
        <div className="cards-list d-flex flex-wrap justify-content-center">
            {cards.map((card) => (
                <div className="card" key={card.id}>
                    <div className="card-body">
                        <img src={card.imageUrl} />
                        <h3 className="card-title">{card.name}</h3>
                        <p>
                            Type: {card.type}<br />
                            Set Type: {card.set.name}
                        </p>
                        <p>{card.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards;