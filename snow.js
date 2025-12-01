// Optimized Falling Snow Effect
(function () {
    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d');

    let snowflakes = [];
    let animationId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Optimized snowflake class
    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.size = Math.random() * 10 + 10; // Font size 10-20px (smaller)
            this.speed = Math.random() * 1.5 + 1; // Faster speed (1-2.5)
            this.opacity = Math.random() * 0.4 + 0.6; // 0.6-1
            this.drift = (Math.random() - 0.5) * 0.5; // Gentle horizontal drift
        }

        update() {
            // Simple vertical fall with gentle drift
            this.y += this.speed;
            this.x += this.drift;

            // Reset if off screen
            if (this.y > canvas.height + 20) {
                this.reset();
            }

            if (this.x > canvas.width + 20) {
                this.x = -20;
            } else if (this.x < -20) {
                this.x = canvas.width + 20;
            }
        }

        draw() {
            ctx.save();
            ctx.font = `${this.size}px Arial`;
            ctx.globalAlpha = this.opacity;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText('❄', this.x, this.y);
            ctx.restore();
        }
    }

    // Initialize snowflakes (reduced count)
    function initSnow() {
        snowflakes = [];
        // Fewer snowflakes for better performance
        const snowflakeCount = Math.floor((canvas.width * canvas.height) / 100000);

        for (let i = 0; i < snowflakeCount; i++) {
            snowflakes.push(new Snowflake());
        }
    }

    // Optimized animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snowflakes.length; i++) {
            snowflakes[i].update();
            snowflakes[i].draw();
        }

        animationId = requestAnimationFrame(animate);
    }

    // Start the snow effect
    function startSnow() {
        resizeCanvas();
        initSnow();
        animate();
    }

    // Handle window resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initSnow();
        }, 250);
    });

    // Start snow when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startSnow);
    } else {
        startSnow();
    }
})();
