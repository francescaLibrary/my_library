/**
 * Template Renderer Module - Pagine e Parole
 * Renders dynamic content from JSON data
 */

class TemplateRenderer {
    constructor() {
        this.ratingLabels = {
            5: 'Capolavoro',
            4: 'Ottimo',
            3: 'Buono',
            2: 'Discreto',
            1: 'Deludente'
        };
    }

    /**
     * Render star rating
     * @param {number} rating - Rating 1-5
     * @param {string} size - 'small', 'normal', 'large'
     * @returns {string}
     */
    renderRating(rating, size = 'normal') {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(`<span class="rating-star ${i <= rating ? 'filled' : ''}">★</span>`);
        }
        const sizeClass = size === 'large' ? 'rating-large' : '';
        return `<div class="rating ${sizeClass}">${stars.join('')}</div>`;
    }

    /**
     * Render rating with label
     * @param {number} rating - Rating 1-5
     * @returns {string}
     */
    renderRatingWithLabel(rating) {
        return `
            ${this.renderRating(rating, 'large')}
            <span class="rating-label">${this.ratingLabels[rating] || ''}</span>
        `;
    }

    /**
     * Render genre tags
     * @param {Array} genreIds - Genre IDs
     * @param {Array} allGenres - All genres data
     * @returns {string}
     */
    renderGenreTags(genreIds, allGenres) {
        if (!genreIds || !allGenres) return '';
        
        return genreIds.map(id => {
            const genre = allGenres.find(g => g.id === id);
            if (!genre) return '';
            return `<span class="tag">${genre.icon} ${genre.name}</span>`;
        }).join('');
    }

    /**
     * Render book cover with placeholder fallback
     * @param {Object} book - Book data
     * @returns {string}
     */
    renderBookCover(book) {
        return `
            <img src="${book.cover}" 
                 alt="${book.title}" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="book-card-cover-placeholder" style="display: none;">
                <span class="icon">📚</span>
                <span class="title">${book.title}</span>
                <span class="author">${book.author}</span>
            </div>
        `;
    }

    /**
     * Render book card
     * @param {Object} book - Book data
     * @param {Array} genres - All genres
     * @returns {string}
     */
    renderBookCard(book, genres = []) {
        return `
            <a href="libro.html?id=${book.id}" class="book-card">
                <div class="book-card-cover">
                    ${this.renderBookCover(book)}
                    ${book.favorite ? '<span class="book-card-favorite">❤️</span>' : ''}
                </div>
                <div class="book-card-body">
                    <h3 class="book-card-title">${book.title}</h3>
                    <p class="book-card-author">${book.author}</p>
                    <div class="book-card-meta">
                        <div class="book-card-rating">
                            ${this.renderRating(book.rating)}
                        </div>
                    </div>
                    <div class="book-card-genres">
                        ${this.renderGenreTags(book.genres?.slice(0, 2), genres)}
                    </div>
                </div>
            </a>
        `;
    }

    /**
     * Render book grid
     * @param {Array} books - Books array
     * @param {Array} genres - All genres
     * @returns {string}
     */
    renderBookGrid(books, genres = []) {
        if (!books || books.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-state-icon">📚</div>
                    <h3 class="empty-state-title">Nessun libro trovato</h3>
                    <p class="empty-state-text">Prova a modificare i filtri di ricerca</p>
                </div>
            `;
        }
        return books.map(book => this.renderBookCard(book, genres)).join('');
    }

    /**
     * Render featured book (horizontal card)
     * @param {Object} book - Book data
     * @param {Array} genres - All genres
     * @returns {string}
     */
    renderFeaturedBook(book, genres = []) {
        return `
            <div class="featured-book-card">
                <div class="featured-book-cover">
                    <img src="${book.cover}" 
                         alt="${book.title}"
                         onerror="this.parentElement.innerHTML='<div class=\\'book-card-cover-placeholder\\' style=\\'height:100%;display:flex;\\'><span class=\\'icon\\'>📚</span><span class=\\'title\\'>${book.title}</span></div>';">
                </div>
                <div class="featured-book-body">
                    <span class="featured-book-badge">⭐ Libro del Mese</span>
                    <h2 class="featured-book-title">${book.title}</h2>
                    <p class="featured-book-author">${book.author}</p>
                    <p class="featured-book-excerpt">${book.review}</p>
                    <div class="featured-book-footer">
                        <div class="book-card-rating">
                            ${this.renderRatingWithLabel(book.rating)}
                        </div>
                        <a href="libro.html?id=${book.id}" class="btn btn-primary">Leggi la recensione</a>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render stats grid
     * @param {Object} stats - Stats object
     * @returns {string}
     */
    renderStats(stats) {
        return `
            <div class="stat-card">
                <span class="stat-icon">📚</span>
                <span class="stat-number">${stats.totalBooks}</span>
                <span class="stat-label">Libri Letti</span>
            </div>
            <div class="stat-card">
                <span class="stat-icon">📄</span>
                <span class="stat-number">${stats.totalPages.toLocaleString()}</span>
                <span class="stat-label">Pagine Totali</span>
            </div>
            <div class="stat-card">
                <span class="stat-icon">⭐</span>
                <span class="stat-number">${stats.averageRating}</span>
                <span class="stat-label">Media Voto</span>
            </div>
            <div class="stat-card">
                <span class="stat-icon">❤️</span>
                <span class="stat-number">${stats.favoriteCount}</span>
                <span class="stat-label">Preferiti</span>
            </div>
        `;
    }

    /**
     * Render library item (cover only)
     * @param {Object} book - Book data
     * @returns {string}
     */
    renderLibraryItem(book) {
        return `
            <a href="libro.html?id=${book.id}" class="library-item">
                <img src="${book.cover}" 
                     alt="${book.title}"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="library-item-placeholder" style="display: none;">📚</div>
                <div class="library-item-overlay">
                    <span class="library-item-title">${book.title}</span>
                    <div class="library-item-rating">
                        ${this.renderRating(book.rating, 'small')}
                    </div>
                </div>
            </a>
        `;
    }

    /**
     * Render library grid
     * @param {Array} books - Books array
     * @returns {string}
     */
    renderLibraryGrid(books) {
        if (!books || books.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-state-icon">📚</div>
                    <h3 class="empty-state-title">La libreria è vuota</h3>
                </div>
            `;
        }
        return books.map(book => this.renderLibraryItem(book)).join('');
    }

    /**
     * Render quote card
     * @param {string} quote - Quote text
     * @param {string} title - Book title
     * @param {string} author - Book author
     * @returns {string}
     */
    renderQuote(quote, title, author) {
        return `
            <div class="quote-card">
                <p class="quote-text">${quote}</p>
                <div class="quote-source">
                    <span class="quote-source-title">${title}</span>
                    <span class="quote-source-author">— ${author}</span>
                </div>
            </div>
        `;
    }

    /**
     * Render genre filter options
     * @param {Array} genres - All genres
     * @param {string} selected - Selected genre ID
     * @returns {string}
     */
    renderGenreOptions(genres, selected = '') {
        let html = '<option value="">Tutti i generi</option>';
        genres.forEach(genre => {
            html += `<option value="${genre.id}" ${genre.id === selected ? 'selected' : ''}>
                ${genre.icon} ${genre.name}
            </option>`;
        });
        return html;
    }

    /**
     * Render rating filter options
     * @param {string} selected - Selected rating
     * @returns {string}
     */
    renderRatingOptions(selected = '') {
        let html = '<option value="">Tutti i voti</option>';
        for (let i = 5; i >= 1; i--) {
            html += `<option value="${i}" ${i.toString() === selected ? 'selected' : ''}>
                ${'★'.repeat(i)} ${this.ratingLabels[i]}
            </option>`;
        }
        return html;
    }

    /**
     * Render year filter options
     * @param {Array} years - Available years
     * @param {string} selected - Selected year
     * @returns {string}
     */
    renderYearOptions(years, selected = '') {
        let html = '<option value="">Tutti gli anni</option>';
        years.forEach(year => {
            html += `<option value="${year}" ${year === selected ? 'selected' : ''}>${year}</option>`;
        });
        return html;
    }

    /**
     * Render favorite genres cards
     * @param {Array} genres - Favorite genres
     * @returns {string}
     */
    renderFavoriteGenres(genres) {
        return genres.map(genre => `
            <div class="genre-card">
                <span class="genre-card-icon">${genre.icon}</span>
                <h3 class="genre-card-name">${genre.name}</h3>
                <p class="genre-card-description">${genre.description}</p>
            </div>
        `).join('');
    }

    /**
     * Render fun facts
     * @param {Array} facts - Fun facts array
     * @returns {string}
     */
    renderFunFacts(facts) {
        return facts.map(fact => `
            <div class="fun-fact">
                <span class="fun-fact-icon">${fact.icon}</span>
                <span class="fun-fact-text">${fact.text}</span>
            </div>
        `).join('');
    }

    /**
     * Render reading goal progress
     * @param {Object} goal - Reading goal data
     * @returns {string}
     */
    renderReadingGoal(goal) {
        const percentage = Math.min((goal.current / goal.target) * 100, 100);
        return `
            <div class="reading-goal">
                <div class="reading-goal-header">
                    <span class="reading-goal-title">📖 Obiettivo ${goal.year}</span>
                    <span class="reading-goal-count">${goal.current} / ${goal.target}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <p class="reading-goal-text">
                    ${goal.current >= goal.target 
                        ? '🎉 Obiettivo raggiunto!' 
                        : `Ancora ${goal.target - goal.current} libri da leggere`}
                </p>
            </div>
        `;
    }

    /**
     * Render contact cards
     * @param {Object} social - Social links
     * @returns {string}
     */
    renderContactCards(social) {
        return `
            <a href="mailto:${social.email.address}" class="contact-card">
                <span class="contact-card-icon">${social.email.icon}</span>
                <span class="contact-card-label">Email</span>
                <span class="contact-card-value">${social.email.address}</span>
            </a>
            <a href="${social.instagram.url}" target="_blank" class="contact-card">
                <span class="contact-card-icon">${social.instagram.icon}</span>
                <span class="contact-card-label">Instagram</span>
                <span class="contact-card-value">@${social.instagram.username}</span>
            </a>
            <a href="${social.goodreads.url}" target="_blank" class="contact-card">
                <span class="contact-card-icon">${social.goodreads.icon}</span>
                <span class="contact-card-label">Goodreads</span>
                <span class="contact-card-value">@${social.goodreads.username}</span>
            </a>
        `;
    }

    /**
     * Format date for display
     * @param {string} dateStr - Date string (YYYY-MM)
     * @returns {string}
     */
    formatDate(dateStr) {
        if (!dateStr) return '';
        const months = [
            'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
            'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
        ];
        const [year, month] = dateStr.split('-');
        return `${months[parseInt(month) - 1]} ${year}`;
    }
}

// Export singleton instance
window.TemplateRenderer = new TemplateRenderer();
