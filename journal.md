## 26.01.2020
Deciso l'oggetto da configurare: un profumatore per l'ambiente che avevo a disposizione a casa.
Ho deciso di configurare questo oggetto perchè ho l'intenzione di modellare l'oggetto io stesso, per imparare ad utilizzare meglio Blender.
Ho proseguito quindi l'iniziare la modellazione dell'oggetto che in se non è risultata difficile, la parte complicata si è rivelata creargli la mappatura UV.

## 27.01.2020
Terminata la modellazione, compresa la mappatura UV che mi mancava, ho iniziato a progettare la pagina del configuratore.
La pagina si dividerà in due parti: a sinistra la visualizzazione 3D dell'oggetto che permetterà di ruotarlo per vederlo dai vari punti di vista mentre a destra la parte del configuratore vero e proprio, dove ci sarà la lista delle varianti e le relative opzioni da poter scegliere.
Per sviluppare la parte di interfaccia ho deciso di sperimentare con ReactJS in quanto Angular, con cui sono già familiare, risulta essere troppo "grosso" da utilizzare per un progetto così snello.
Ho quindi inizato a sviluppare l'interfaccia, concentrandomi inizialmente sulla parte dell'anteprima 3D dell'oggetto e portandola a termine.

## 28.01.2020
Ho iniziato a sviluppare la parte di interfaccia che prevede l'utilizzo di React. Come prima cosa ho dovuto documentarmi su come utilizzare React a da subito mi sono trovato davanti qualche difficoltà in quanto la maggior parte degli esempi e tutorial di React utilizzano un interprete javascript chiamato Babel, il quale richiede che il codice javascript venga "compilato" prima di poter essere utilizzato dalla pagina web. Siccome non volevo introdurre altri strumenti che mi permettessero di compilare il javascript ho speso buona parte del tempo a cercare come poter fare a meno di Babel, mantenendo però la semplicità di React.

## 29.01.2020
Presa confidenza con React ho proseguito a completare la maggior parte dell'interfaccia del configuratore, compreso il passaggio tra una sezione all'altra.
Una volta completato lo scheletro dell'interfaccia ho continuato predisponendo i materiali da poter applicare all'oggetto. Per questi ho deciso di crearne alcuni da zero, andando solamente a lavorare sui parametri albedo, roughness e metalness, mentre ho utilizzato delle texture scaricare dal sito Poliigon per gli altri.

## 30.01.2020
Ho continuato a lavorare sui materiali, riscaricando tutte le texture in quanto mi sono reso conto che quelle che avevo scaricato inizialmente non avevano una risoluzione abbastanza alta e quindi non ho ritenuto abbastanza buona la loro resa.

## 31.01.2020
Ho concluso la creazione dei materiali e ho apportato gli ultimi ritocchi: cambiato l'environment map per avere un'illuminazione migliore, aggiunta una texture di occlusione ambientale al pavimento per simulare l'obra dei bastoni e del contenitore sul pavimento, modificato il clear color della scena per "nascondere" la presenza del pavimento e aggiunto le icone alle varianti e alle opzioni di configurazione. 