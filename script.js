// ═══════════════════════════════════════════════════════════════
// 🎵 Profile Page - Main Script
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────────────────────
    // Get all page elements
    // ─────────────────────────────────────────────────────────────
    const elements = {
        introOverlay: document.getElementById('intro-overlay'),
        mainContent: document.getElementById('main-content'),
        video: document.getElementById('bg-video'),
        music: document.getElementById('bg-music'),
        volumeSlider: document.getElementById('volume-slider'),
        volumeIcon: document.getElementById('volume-icon'),
        playPauseBtn: document.getElementById('play-pause-btn'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        progressBar: document.getElementById('progress-bar'),
        progressContainer: document.getElementById('progress-container'),
        timeDisplay: document.getElementById('time-display'),
        songTitle: document.getElementById('song-title'),
        typewriter: document.getElementById('typewriter-text')
    };

    // ─────────────────────────────────────────────────────────────
    // Music player state
    // ─────────────────────────────────────────────────────────────
    let currentSongIndex = 0;
    let isPlaying = false;
    const playlist = CONFIG.music.playlist;

    // ─────────────────────────────────────────────────────────────
    // 🎨 Load Config Values into HTML
    // ─────────────────────────────────────────────────────────────
    function loadConfig() {
        // Profile
        document.getElementById('profile-username').textContent = CONFIG.profile.username;
        document.getElementById('profile-image').src = CONFIG.profile.image;
        document.getElementById('profile-views').textContent = CONFIG.profile.views;
        document.getElementById('profile-location').textContent = CONFIG.profile.location;

        // Discord
        document.getElementById('discord-username').textContent = CONFIG.discord.username;
        document.getElementById('discord-avatar').src = CONFIG.discord.image;
        document.getElementById('discord-lastseen').textContent = CONFIG.discord.lastSeen;

        // Discord status indicator
        const statusIndicator = document.getElementById('discord-status-indicator');
        const statusColors = {
            online: 'bg-green-500',
            idle: 'bg-yellow-500',
            dnd: 'bg-red-500',
            offline: 'bg-gray-500'
        };
        const statusDot = statusIndicator.querySelector('div');
        statusDot.className = `w-2 h-2 rounded-full ${statusColors[CONFIG.discord.status] || 'bg-gray-500'}`;

        // Minecraft
        document.getElementById('minecraft-username').textContent = CONFIG.minecraft.username;
        document.getElementById('minecraft-avatar').src = CONFIG.minecraft.image;
        document.getElementById('minecraft-status-text').textContent = CONFIG.minecraft.statusText;

        // Social links
        document.getElementById('discord-link').href = CONFIG.social.discordLink;
        document.getElementById('instagram-link').href = CONFIG.social.instagramLink;

        // Volume
        elements.volumeSlider.value = CONFIG.music.volume;
    }

    // ─────────────────────────────────────────────────────────────
    // 🎬 Intro Screen - Click to enter
    // ─────────────────────────────────────────────────────────────
    elements.introOverlay.addEventListener('click', () => {
        // Start background video immediately
        elements.video.play().catch(e => console.log("Video play error:", e));

        // Fade out intro
        elements.introOverlay.style.opacity = '0';
        elements.introOverlay.style.pointerEvents = 'none';

        // Show main content immediately (fade in)
        elements.mainContent.style.opacity = '1';
        elements.mainContent.style.pointerEvents = 'auto';

        setTimeout(() => {
            elements.introOverlay.style.display = 'none';
        }, 1000);

        // Start music if autoplay is enabled
        if (CONFIG.music.autoPlay) {
            elements.music.volume = CONFIG.music.volume / 100;
            elements.music.play()
                .then(() => {
                    isPlaying = true;
                    updatePlayPauseIcon();
                })
                .catch(err => console.log('Music autoplay blocked:', err));
        }

        // Start typewriter effect
        startTypewriter();
    });

    // ─────────────────────────────────────────────────────────────
    // 🔊 Volume Control
    // ─────────────────────────────────────────────────────────────
    let lastVolume = CONFIG.music.volume;

    elements.volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        elements.music.volume = volume;
        updateVolumeIcon(parseInt(e.target.value));
    });

    elements.volumeIcon.addEventListener('click', () => {
        if (elements.music.volume > 0) {
            lastVolume = elements.volumeSlider.value;
            elements.music.volume = 0;
            elements.volumeSlider.value = 0;
            updateVolumeIcon(0);
        } else {
            // Restore to last volume, or default to 70 if 0
            let targetVol = lastVolume > 0 ? lastVolume : 70;
            elements.music.volume = targetVol / 100;
            elements.volumeSlider.value = targetVol;
            updateVolumeIcon(targetVol);
        }
    });

    function updateVolumeIcon(volume) {
        elements.volumeIcon.classList.remove('fa-volume-high', 'fa-volume-low', 'fa-volume-xmark');

        if (volume == 0) {
            elements.volumeIcon.classList.add('fa-volume-xmark');
        } else if (volume < 50) {
            elements.volumeIcon.classList.add('fa-volume-low');
        } else {
            elements.volumeIcon.classList.add('fa-volume-high');
        }
    }

    // ─────────────────────────────────────────────────────────────
    // ✍️ Typewriter Effect (Bio)
    // ─────────────────────────────────────────────────────────────
    function startTypewriter() {
        const texts = [
            "Welcome to my realm",
            "drifting where the light fades.."
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];

            if (!isDeleting && charIndex < currentText.length) {
                // Typing forward
                elements.typewriter.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            }
            else if (!isDeleting && charIndex === currentText.length) {
                // Pause at end
                isDeleting = true;
                setTimeout(type, 2000);
            }
            else if (isDeleting && charIndex > 0) {
                // Deleting backward
                elements.typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            }
            else if (isDeleting && charIndex === 0) {
                // Move to next text
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        }

        type();
    }

    // ─────────────────────────────────────────────────────────────
    // 🏷️ Title Typewriter Effect
    // ─────────────────────────────────────────────────────────────
    function startTitleTypewriter() {
        const text = CONFIG.profile.username;
        let index = 0;
        let isDeleting = false;

        function type() {
            if (!isDeleting && index < text.length) {
                // Typing forward
                document.title = text.substring(0, index + 1);
                index++;
                setTimeout(type, 200); // Faster typing
            }
            else if (!isDeleting && index === text.length) {
                // Pause at end
                isDeleting = true;
                setTimeout(type, 2000);
            }
            else if (isDeleting && index > 1) {
                // Deleting backward - Stop at 1 char to avoid showing URL
                document.title = text.substring(0, index - 1);
                index--;
                setTimeout(type, 100); // Faster deleting
            }
            else if (isDeleting && index <= 1) {
                // Start over
                isDeleting = false;
                setTimeout(type, 500);
            }
        }

        type();
    }



    // ─────────────────────────────────────────────────────────────
    // 🎵 Music Player Functions
    // ─────────────────────────────────────────────────────────────

    function loadSong(index) {
        elements.music.src = playlist[index].file;
        elements.songTitle.textContent = playlist[index].title;
        elements.music.load();
    }

    function togglePlayPause() {
        if (isPlaying) {
            elements.music.pause();
            isPlaying = false;
        } else {
            elements.music.play()
                .catch(err => console.log('Play error:', err));
            isPlaying = true;
        }
        updatePlayPauseIcon();
    }

    function updatePlayPauseIcon() {
        const icon = elements.playPauseBtn.querySelector('i');
        icon.classList.remove('fa-play', 'fa-pause');
        icon.classList.add(isPlaying ? 'fa-pause' : 'fa-play');
    }

    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        if (isPlaying) elements.music.play();
    }

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        if (isPlaying) elements.music.play();
    }

    // ─────────────────────────────────────────────────────────────
    // ⏱️ Progress Bar
    // ─────────────────────────────────────────────────────────────

    function updateProgress() {
        const progress = (elements.music.currentTime / elements.music.duration) * 100;
        elements.progressBar.style.width = `${progress}%`;
        elements.timeDisplay.textContent =
            `${formatTime(elements.music.currentTime)} / ${formatTime(elements.music.duration)}`;
    }

    function seekMusic(e) {
        const rect = elements.progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        elements.music.currentTime = percentage * elements.music.duration;
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ─────────────────────────────────────────────────────────────
    // 🎧 Event Listeners
    // ─────────────────────────────────────────────────────────────

    elements.playPauseBtn.addEventListener('click', togglePlayPause);
    elements.prevBtn.addEventListener('click', playPreviousSong);
    elements.nextBtn.addEventListener('click', playNextSong);
    elements.music.addEventListener('timeupdate', updateProgress);
    elements.progressContainer.addEventListener('click', seekMusic);
    elements.music.addEventListener('ended', playNextSong);

    // ─────────────────────────────────────────────────────────────
    // 🚀 Initialize - Load config and start
    // ─────────────────────────────────────────────────────────────

    loadConfig();  // Load all config values into HTML
    loadSong(currentSongIndex);
    updateVolumeIcon(CONFIG.music.volume);
    startTitleTypewriter(); // Start title animation
});
