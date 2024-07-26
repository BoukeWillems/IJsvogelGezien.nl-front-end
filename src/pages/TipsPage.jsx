
import '../styles/TipsPage.css';

const TipsPage = () => {

    return (
        <div className="tips-page">
            <header>
                <h1>Tips voor het vinden en fotograferen van IJsvogels</h1>
            </header>
            <main>
                <section id="where-to-find" className="where-to-find">
                    <img src="public/images/AdobeStock_55417638.jpeg" alt="IJsvogel habitat" className="section-image"/>
                    <div className="text">
                    <h2>Waar vind je de IJsvogel?</h2>
                    <p>IJsvogels komen vaak voor in de buurt van langzaam stromende of stilstaande wateren, zoals rivieren, beken, meren en vijvers. Ze houden van heldere wateren waar ze gemakkelijk vissen kunnen zien en vangen.
                        Een ideale plek om ijsvogels te spotten is bij rivieren en beken met overhangende vegetatie, waar ze vaak laag over het water scheren. Vijvers en meren met rietkragen bieden ook een uitstekende habitat voor deze prachtige vogels.
                        Daarnaast zijn langzaam stromende kanalen en natuurreservaten met visrijke wateren goede plekken om te zoeken. Als je in deze gebieden geduldig en stil blijft, is de kans groot dat je een ijsvogel zult zien.</p>
                    </div>
                </section>

                <section id="when-to-find" className="when-to-find">
                    <div className="text">
                        <h2>Wanneer kan ik een IJsvogel tegenkomen?</h2>
                        <p>IJsvogels kunnen het hele jaar door worden gezien, maar de beste tijden om ze te observeren
                            zijn vroeg in de ochtend of laat in de middag wanneer ze het meest actief zijn.
                            Vroege ochtenden bij zonsopgang zijn bijzonder goed omdat het licht dan zacht en mooi is,
                            wat ook ideaal is voor fotografie. Late namiddagen voor zonsondergang zijn ook uitstekende
                            momenten om ijsvogels te spotten.
                            In de winter, wanneer veel wateren bevroren zijn, kun je ijsvogels vaak vinden bij open
                            water waar ze nog steeds kunnen vissen.</p>
                    </div>
                        <img src="public/images/AdobeStock_82757054.jpeg" alt="IJsvogel spotten"
                             className="section-image"/>
                </section>

                <section id="how-to-photograph" className="how-to-photograph">
                    <img src="public/images/AdobeStock_241563395.jpeg" alt="IJsvogel fotograferen"
                         className="section-image"/>
                    <div className="text">
                        <h2>Hoe fotografeer ik een IJsvogel?</h2>
                        <p>Het fotograferen van ijsvogels kan uitdagend zijn vanwege hun schuwe aard en snelle
                            bewegingen. Een telelens is essentieel om van een afstand te kunnen fotograferen zonder ze
                            te storen.
                            Zoek een rustige plek in de buurt van hun leefgebied en blijf stil zitten om hun vertrouwen
                            te winnen. Stel je camera in op een hoge sluitertijd om hun snelle bewegingen vast te leggen
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            en fotografeer in burst-modus om meerdere foto's achter elkaar te maken.
                            Let op hun favoriete zitplaatsen, zoals takken boven het water, en wacht geduldig op het
                            juiste moment. Een statief kan ook helpen voor stabiele opnamen.</p>
                    </div>
                </section>

                <section id="general-tips" className="general-tips">
                    <div className="text">
                        <h2>Algemene Tips & tricks</h2>
                        <p>IJsvogels zijn te herkennen aan hun heldere blauwe en oranje verenkleed, lange snavel en
                            opvallende visvangsttechniek. Hun fluitende roep is vaak het eerste teken van hun
                            aanwezigheid.
                            Respecteer altijd de natuur en verstoor de vogels niet. Draag camouflagekleding om minder op
                            te vallen en luister naar hun roep om ze te lokaliseren.
                            Neem de tijd en wees geduldig; goede observaties vereisen vaak lange wachttijden. Door de
                            omgeving te kennen en aandacht te besteden aan details, kun je de kans op het zien en
                            fotograferen van een ijsvogel vergroten.
                        </p>
                    </div>
                        <img src="public/images/AdobeStock_433504977.jpeg" alt="IJsvogel observeren"
                             className="section-image"/>
                </section>
            </main>
        </div>
    );
};

export default TipsPage;
