# Usa un'immagine di base con Node.js
FROM node:14

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia il package.json e il package-lock.json nel container
COPY package*.json ./

# Esegui npm install per installare le dipendenze
RUN npm install

# Copia tutti i file del gioco nella directory del container
COPY . .

# Copia la cartella "assets" nel container
COPY assets ./assets

# Espone la porta 80 per l'applicazione
EXPOSE 80

# Comando per avviare l'applicazione
CMD ["node", "game.js"]
