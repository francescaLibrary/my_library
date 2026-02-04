# 📚 Pagine e Parole - Blog di Recensioni Libri

Un blog elegante e professionale per recensioni di libri, costruito con HTML, CSS e JavaScript vanilla.

## ✨ Caratteristiche

- **Sistema JSON-based**: Tutti i contenuti sono gestiti tramite file JSON facilmente modificabili
- **Rating 1-5 stelle**: Sistema di valutazione visivo con etichette
- **Filtri avanzati**: Cerca per genere, voto, anno, titolo o autore
- **Responsive Design**: Ottimizzato per desktop, tablet e mobile
- **Copertine libri**: Supporto immagini con placeholder automatico
- **Citazioni preferite**: Sezione dedicata alle frasi più belle
- **Statistiche automatiche**: Conteggio libri, pagine, media voti
- **Libro del mese**: Evidenzia un libro in homepage

## 📁 Struttura del Progetto

```
book_blog/
├── index.html          # Homepage
├── recensioni.html     # Catalogo recensioni con filtri
├── libreria.html       # Vista griglia copertine
├── chi-sono.html       # Pagina about
├── libro.html          # Singola recensione
├── css/
│   ├── base.css        # Variabili e stili base
│   ├── navigation.css  # Navbar
│   ├── components.css  # Componenti UI
│   └── pages.css       # Stili pagine
├── js/
│   ├── data-loader.js      # Caricamento JSON
│   ├── template-renderer.js # Rendering templates
│   ├── component-loader.js  # Componenti HTML
│   └── app.js              # Controller principale
├── data/
│   ├── site.json           # Configurazione sito
│   ├── personal.json       # Info blogger
│   ├── books.json          # Libri e recensioni
│   └── categories.json     # Generi letterari
├── components/
│   ├── navbar.html
│   └── footer.html
└── assets/
    ├── covers/         # Copertine libri
    └── images/         # Immagini profilo
```

## 🚀 Come Usare

### 1. Personalizzare le Informazioni

Modifica `data/personal.json` con i tuoi dati:
- Nome e ruolo
- Biografia
- Generi preferiti
- Obiettivo di lettura
- Link social

### 2. Aggiungere un Libro

Aggiungi un nuovo oggetto in `data/books.json`:

```json
{
  "id": "nome-libro",
  "title": "Titolo del Libro",
  "author": "Nome Autore",
  "cover": "assets/covers/nome-libro.jpg",
  "genres": ["narrativa-contemporanea", "giallo-thriller"],
  "year": 2023,
  "pages": 350,
  "publisher": "Editore",
  "dateRead": "2025-01",
  "rating": 4,
  "favorite": true,
  "review": "La tua recensione...",
  "quotes": ["Una citazione memorabile..."],
  "tags": ["tag1", "tag2"]
}
```

### 3. Aggiungere una Copertina

1. Salva l'immagine della copertina in `assets/covers/`
2. Usa il nome file nel campo `cover` del libro
3. Se l'immagine non è disponibile, viene mostrato un placeholder

### 4. Modificare il Libro del Mese

In `data/site.json`, modifica:

```json
"bookOfMonth": {
  "enabled": true,
  "bookId": "id-del-libro"
}
```

### 5. Generi Disponibili

I generi sono definiti in `data/categories.json`:
- narrativa-contemporanea
- giallo-thriller
- romanzo-storico
- classici
- saga-familiare
- fantasy
- biografia
- saggistica
- romanzo-formazione
- rosa-sentimentale

## 🎨 Personalizzazione Colori

Modifica le variabili CSS in `css/base.css`:

```css
:root {
    --primary: #722F37;      /* Bordeaux */
    --secondary: #F5F0E8;    /* Crema */
    --accent: #C9A227;       /* Oro */
}
```

## 📱 Hosting

Il sito è statico e può essere hostato su:
- GitHub Pages
- Netlify
- Vercel
- Qualsiasi hosting web

## 📝 Note

- Le immagini delle copertine sono placeholder - aggiungere le proprie
- L'immagine profilo va in `assets/images/profile.jpg`
- Il sito funziona completamente offline una volta caricati i file

---

Creato con ❤️ per gli amanti dei libri
