// Optimized Falling Snow Effect
(function () {
    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d', { alpha: true }); // Optimize for alpha

    let snowflakes = [];
    let animationId;

    // Pre-render snowflake to improve performance
    const snowflakeCanvas = document.createElement('canvas');
    const snowflakeCtx = snowflakeCanvas.getContext('2d');
    snowflakeCanvas.width = 20;
    snowflakeCanvas.height = 20;
    snowflakeCtx.font = '20px Arial';
    snowflakeCtx.fillStyle = '#FFFFFF';
    snowflakeCtx.textAlign = 'center';
    snowflakeCtx.textBaseline = 'middle';
    snowflakeCtx.fillText('❄', 10, 10);

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
            this.size = Math.random() * 10 + 10; // 10-20px
            this.scale = this.size / 20; // Scale based on base size
            this.speed = Math.random() * 1.5 + 1;
            this.opacity = Math.random() * 0.4 + 0.6;
            this.drift = (Math.random() - 0.5) * 0.5;
        }

        update() {
            this.y += this.speed;
            this.x += this.drift;

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
            ctx.globalAlpha = this.opacity;
            // Draw image is faster than fillText
            ctx.drawImage(
                snowflakeCanvas,
                this.x - this.size / 2,
                this.y - this.size / 2,
                this.size,
                this.size
            );
        }
    }

    // Initialize snowflakes
    function initSnow() {
        snowflakes = [];
        // Cap max snowflakes for mobile performance
        let count = Math.floor((canvas.width * canvas.height) / 50000); // Increased density slightly but...
        if (count > 50) count = 50; // Hard cap
        if (window.innerWidth < 768 && count > 30) count = 30; // Mobile cap

        for (let i = 0; i < count; i++) {
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
