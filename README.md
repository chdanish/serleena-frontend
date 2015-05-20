# serleena Frontend

## Introduzione

Tutti i seguenti comandi devono essere eseguiti nella root directory del progetto.

### Installazione dipendenze

Per installare le dipendenze:

	npm install
	bower install
	
### Compilazione

Per compilare tutti i file JS:

	grunt build

### Test

Per eseguire tutti i test:

	karma start karma-conf.js
	
## Utilizzo del fake backend

Il fake backend si trova nella cartella *utils*. Per avviarlo:

	cd utils
	node fake-backend.js
	
Esso si mette in ascolto sulla porta 3000.

### Configurazione del frontend per l'uso del fake backend

Aprire il file *app/config/app.js* e individuare questa sezione di codice:

	angular.module('serleenaFrontend')
		.constant("DEBUG", false);
		
E sostituire il valore di *DEBUG* a **true**. Salvare e ricompilare il frontend.

**Obbligatorio**: **non** eseguire il commit dell'abilitazione della modalità di debug.
