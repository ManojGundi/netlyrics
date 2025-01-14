// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const carouselContainer = document.querySelector('.carousel-container');

// Featured Songs Data (Example)
const featuredSongs = [
    {
        title: "Midnight Dreams",
        artist: "Luna Eclipse",
        image: "https://picsum.photos/300/200",
        description: "Latest hit from Luna Eclipse's new album 'Nocturnal'"
    },
    {
        title: "Summer Vibes",
        artist: "The Waves",
        image: "https://picsum.photos/300/201",
        description: "Feel-good summer anthem from their EP 'Beach Days'"
    },
    {
        title: "Urban Poetry",
        artist: "Street Tales",
        image: "https://picsum.photos/300/202",
        description: "Hip-hop masterpiece from the album 'City Lights'"
    },
    {
        title: "Dancing in Rain",
        artist: "Electro Pulse",
        image: "https://picsum.photos/300/203",
        description: "Electronic dance hit topping the charts"
    },
    {
        title: "Mountain High",
        artist: "The Wanderers",
        image: "https://picsum.photos/300/204",
        description: "Folk-inspired journey through nature"
    }
];

// Trending Songs Data
const trendingSongs = [
    {
        rank: 1,
        title: "Neon Lights",
        artist: "Cyber Dreams",
        album: "Digital Horizons",
        views: "2.1M",
        trend: "up",
        genre: "Synthwave",
        changePercent: "+15%",
        likes: "156K",
        shares: "45K",
        lastWeekRank: 3
    },
    {
        rank: 2,
        title: "Lost in Tokyo",
        artist: "Night Riders",
        album: "Eastern Nights",
        views: "1.8M",
        trend: "up",
        genre: "J-Pop Fusion",
        changePercent: "+8%",
        likes: "142K",
        shares: "38K",
        lastWeekRank: 4
    },
    // Add more trending songs with similar structure...
];

// Search Functionality
searchInput.addEventListener('input', debounce(handleSearch, 300));
searchBtn.addEventListener('click', handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Implement search logic here
    console.log('Searching for:', searchTerm);
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize Featured Songs Carousel
function initCarousel() {
    featuredSongs.forEach(song => {
        const songElement = createSongElement(song);
        carouselContainer.appendChild(songElement);
    });
}

function createSongElement(song) {
    const div = document.createElement('div');
    div.className = 'carousel-item';
    div.innerHTML = `
        <img src="${song.image}" alt="${song.title}">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
        <p>${song.description}</p>
        <button class="preview-btn" data-tooltip="Preview Lyrics">Preview</button>
    `;
    
    div.querySelector('.preview-btn').addEventListener('click', () => {
        showLyricsPreview(song);
    });
    
    return div;
}

// Sample lyrics data
const lyricsDatabase = {
    "Midnight Dreams": {
        verses: [
            "Verse 1:\nIn the depths of night\nWhere shadows dance and play\nMoonlight whispers secrets\nAs stars light up the way",
            "Chorus:\nMidnight dreams, taking flight\nIn the darkness, we find light\nMidnight dreams, hold on tight\nTill the morning comes alive",
            "Verse 2:\nSilent city sleeps below\nAs we drift through time and space\nEvery dream a story told\nIn this magical embrace",
            "Bridge:\nLet the night unfold\nLet your spirit soar\nIn these midnight dreams\nWe find something more"
        ],
        metadata: {
            writer: "Luna Eclipse",
            producer: "Star Studios",
            releaseDate: "2024",
            duration: "3:45"
        }
    }
    // Add more songs...
};

// Update showLyricsPreview function
function showLyricsPreview(song) {
    const modal = document.getElementById('lyricsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalArtist = document.getElementById('modalArtist');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = song.title;
    modalArtist.textContent = song.artist;
    modalContent.innerHTML = '<div class="loading-spinner"></div>';
    
    modal.style.display = 'flex';
    
    // Simulate API call for lyrics
    setTimeout(() => {
        const lyrics = lyricsDatabase[song.title] || createDummyLyrics(song.title);
        modalContent.innerHTML = `
            <div class="lyrics-content">
                <div class="lyrics-preview">
                    <p>${lyrics.verses[0]}</p>
                    <p>${lyrics.verses[1]}</p>
                </div>
                <button class="view-full-btn" onclick="showFullLyrics('${song.title}')">View Full Lyrics</button>
            </div>
        `;
    }, 1000);
}

function showFullLyrics(songTitle) {
    const modalContent = document.getElementById('modalContent');
    const lyrics = lyricsDatabase[songTitle] || createDummyLyrics(songTitle);
    
    modalContent.innerHTML = `
        <div class="lyrics-content">
            <div class="lyrics-metadata">
                <span>✍️ Written by: ${lyrics.metadata.writer}</span>
                <span>🎵 Producer: ${lyrics.metadata.producer}</span>
                <span>📅 Released: ${lyrics.metadata.releaseDate}</span>
                <span>⏱️ Duration: ${lyrics.metadata.duration}</span>
            </div>
            <div class="full-lyrics">
                ${lyrics.verses.join('\n\n')}
            </div>
            <div class="lyrics-actions">
                <button class="share-btn" onclick="shareLyrics('${songTitle}')">
                    <span>📤</span> Share
                </button>
                <button class="favorite-btn" onclick="toggleFavorite('${songTitle}')">
                    <span>❤️</span> Add to Favorites
                </button>
            </div>
        </div>
    `;
}

function createDummyLyrics(songTitle) {
    return {
        verses: [
            `Verse 1:\nImagine the first verse of "${songTitle}"\nWith powerful words and rhythm\nTelling a story that moves hearts\nIn ways only music can express`,
            "Chorus:\nThis is where the magic happens\nWhen melody meets poetry\nCreating moments that last forever\nIn the hearts of those who listen",
            "Verse 2:\nThe journey continues strong\nWith metaphors and vivid scenes\nPainting pictures in the mind\nOf those who dare to dream",
            "Bridge:\nBringing it all together\nIn a crescendo of emotion\nLeading back to where we started\nBut changed by the experience"
        ],
        metadata: {
            writer: "Anonymous",
            producer: "Studio Productions",
            releaseDate: "2024",
            duration: "3:30"
        }
    };
}

function shareLyrics(songTitle) {
    // Implement sharing functionality
    alert(`Sharing lyrics for: ${songTitle}`);
    // Could integrate with Web Share API or social media platforms
}

function toggleFavorite(songTitle) {
    const btn = document.querySelector('.favorite-btn');
    const isCurrentlyFavorite = btn.innerHTML.includes('❤️');
    
    if (isCurrentlyFavorite) {
        btn.innerHTML = '<span>🤍</span> Add to Favorites';
        // Remove from favorites in backend
    } else {
        btn.innerHTML = '<span>❤️</span> Added to Favorites';
        // Add to favorites in backend
    }
}

// Initialize Trending Section
function initTrendingSection() {
    const trendingContainer = document.querySelector('.trending-container');
    const trendingSection = document.querySelector('.trending-section');
    
    // Add filters header
    const filtersHTML = `
        <div class="trending-header">
            <div class="trending-filters">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="rising">Rising</button>
                <button class="filter-btn" data-filter="viral">Viral</button>
                <button class="filter-btn" data-filter="new">New</button>
            </div>
            <select class="genre-filter">
                <option value="all">All Genres</option>
                <option value="synthwave">Synthwave</option>
                <option value="j-pop">J-Pop</option>
                <option value="rock">Rock</option>
                <option value="hip-hop">Hip Hop</option>
            </select>
        </div>
    `;
    
    trendingSection.insertAdjacentHTML('afterbegin', filtersHTML);
    
    // Create trending items
    trendingSongs.forEach(song => {
        const trendingItem = createEnhancedTrendingItem(song);
        trendingContainer.appendChild(trendingItem);
    });
    
    // Add filter functionality
    addFilterListeners();
}

function createEnhancedTrendingItem(song) {
    const div = document.createElement('div');
    div.className = 'trending-item';
    div.innerHTML = `
        <div class="trending-info">
            <span class="trending-rank">#${song.rank}</span>
            <div class="song-details">
                <h3>${song.title}</h3>
                <div class="song-metadata">
                    <span>${song.artist}</span>
                    <span>•</span>
                    <span>${song.album}</span>
                    <span class="genre-tag">${song.genre}</span>
                </div>
            </div>
            <div class="trending-stats">
                <div class="stat-item">
                    <span class="stat-icon">👁</span>
                    <span>${song.views}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">❤️</span>
                    <span>${song.likes}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">🔄</span>
                    <span>${song.shares}</span>
                </div>
                <div class="change-indicator ${song.trend}">
                    ${song.trend === 'up' ? '↑' : '↓'} ${song.changePercent}
                    <span class="rank-change">(${song.trend === 'up' ? '+' : '-'}${Math.abs(song.rank - song.lastWeekRank)})</span>
                </div>
            </div>
        </div>
    `;
    
    // Add click handler for the full song view
    div.addEventListener('click', () => showLyricsPreview(song));
    
    return div;
}

function addFilterListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const genreFilter = document.querySelector('.genre-filter');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Apply filter
            filterTrendingSongs(btn.dataset.filter, genreFilter.value);
        });
    });
    
    genreFilter.addEventListener('change', () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        filterTrendingSongs(activeFilter, genreFilter.value);
    });
}

function filterTrendingSongs(filter, genre) {
    const trendingContainer = document.querySelector('.trending-container');
    trendingContainer.innerHTML = ''; // Clear current items
    
    let filteredSongs = [...trendingSongs];
    
    // Apply filters
    if (filter !== 'all') {
        filteredSongs = filteredSongs.filter(song => {
            switch(filter) {
                case 'rising': return song.trend === 'up';
                case 'viral': return parseInt(song.shares) > 40000;
                case 'new': return song.lastWeekRank === 0;
                default: return true;
            }
        });
    }
    
    if (genre !== 'all') {
        filteredSongs = filteredSongs.filter(song => 
            song.genre.toLowerCase() === genre.toLowerCase()
        );
    }
    
    // Render filtered songs
    filteredSongs.forEach(song => {
        const trendingItem = createEnhancedTrendingItem(song);
        trendingContainer.appendChild(trendingItem);
    });
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced search with suggestions
let searchTimeout;
const searchSuggestions = document.createElement('div');
searchSuggestions.className = 'search-suggestions';
searchInput.parentNode.appendChild(searchSuggestions);

searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const value = searchInput.value.trim();
        if (value.length > 2) {
            // Simulate API call for suggestions
            showSearchSuggestions([
                `${value} - Popular Song`,
                `${value} - Top Artist`,
                `${value} - Album`
            ]);
        } else {
            searchSuggestions.style.display = 'none';
        }
    }, 300);
});

function showSearchSuggestions(suggestions) {
    searchSuggestions.innerHTML = suggestions
        .map(s => `<div class="suggestion-item" onclick="handleSuggestionClick('${s}')">${s}</div>`)
        .join('');
    searchSuggestions.style.display = 'block';
}

// Enhance search suggestions
function handleSuggestionClick(suggestion) {
    searchInput.value = suggestion;
    searchSuggestions.style.display = 'none';
    handleSearch();
}

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar')) {
        searchSuggestions.style.display = 'none';
    }
});

// Add Modal Functionality
function createLyricsModal() {
    const modalHTML = `
        <div class="modal-overlay" id="lyricsModal">
            <div class="modal">
                <button class="modal-close">×</button>
                <h2 id="modalTitle"></h2>
                <p id="modalArtist"></p>
                <div id="modalContent">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add event listeners
    const modal = document.getElementById('lyricsModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Dark Mode Implementation
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme === 'dark');
        
        // Add animation effect
        document.documentElement.style.transition = 'all 0.3s ease';
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(e.matches);
        }
    });
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.innerHTML = isDark ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', 
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
}

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    createLyricsModal();
    initCarousel();
    initTrendingSection();
    addCarouselControls();
    initMobileMenu();
    initHeaderScroll();
    initThemeToggle();
});

// Add carousel navigation
function addCarouselControls() {
    const carousel = document.querySelector('.carousel-container');
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    
    prevBtn.className = 'carousel-control prev';
    nextBtn.className = 'carousel-control next';
    prevBtn.innerHTML = '←';
    nextBtn.innerHTML = '→';
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });
    
    carousel.parentElement.appendChild(prevBtn);
    carousel.parentElement.appendChild(nextBtn);
}

// Add keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('lyricsModal');
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    }
});

// Add Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    const logoContainer = document.querySelector('.logo-container');
    
    // Insert menu button in logo container
    logoContainer.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        }
    });
}

// Add Header Hide/Show on Scroll Functionality
function initHeaderScroll() {
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Show header at the very top
        if (currentScroll <= headerHeight) {
            header.classList.remove('hide');
            return;
        }
        
        // Hide/show header based on scroll direction
        if (currentScroll > lastScroll && currentScroll > headerHeight) {
            // Scrolling down
            header.classList.add('hide');
        } else {
            // Scrolling up
            header.classList.remove('hide');
        }
        
        lastScroll = currentScroll;
    });
} 