// Falling Snow Effect - Emoji Snowflakes
(function () {
    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d');

    let snowflakes = [];
    let animationId;
    let windForce = 0;
    let windTarget = 0;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Lightweight snowflake class with emoji
    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.size = Math.random() * 12 + 12; // Font size between 12-24px
            this.speed = Math.random() * 0.3 + 0.4; // Consistent slower speed (0.4-0.7)
            this.mass = this.size * 0.5;
            this.wind = 0;
            this.opacity = Math.random() * 0.4 + 0.6; // 0.6-1
            this.swing = Math.random() * 0.5 + 0.2; // Reduced swing (0.2-0.7)
            this.swingSpeed = Math.random() * 0.008 + 0.004; // Slower swing
            this.swingCounter = Math.random() * Math.PI * 2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.015; // Slower rotation
            this.turbulence = Math.random() * 0.3; // Reduced turbulence
        }

        update() {
            // Wind
            this.wind = windForce / this.mass;

            // Simple turbulence (reduced)
            const turbulenceX = Math.sin(this.y * 0.01 + this.turbulence * 10) * 0.15; // Reduced from 0.3

            // Update position
            this.y += this.speed;
            this.swingCounter += this.swingSpeed;
            this.x += Math.sin(this.swingCounter) * this.swing + this.wind + turbulenceX;
            this.rotation += this.rotationSpeed;

            // Reset if off screen
            if (this.y > canvas.height + 30) {
                this.reset();
            }

            if (this.x > canvas.width + 30) {
                this.x = -30;
            } else if (this.x < -30) {
                this.x = canvas.width + 30;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            // Set font and opacity
            ctx.font = `${this.size}px Arial`;
            ctx.globalAlpha = this.opacity;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Add subtle glow
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity * 0.5})`;

            // Set white color for snowflake
            ctx.fillStyle = '#FFFFFF';

            // Draw snowflake emoji
            ctx.fillText('❄', 0, 0);

            ctx.restore();
        }
    }

    // Initialize snowflakes
    function initSnow() {
        snowflakes = [];
        // Fewer snowflakes (reduced count)
        const snowflakeCount = Math.floor((canvas.width * canvas.height) / 70000);

        for (let i = 0; i < snowflakeCount; i++) {
            snowflakes.push(new Snowflake());
        }
    }

    // Update wind
    function updateWind() {
        windForce += (windTarget - windForce) * 0.02;

        if (Math.random() < 0.01) {
            windTarget = (Math.random() - 0.5) * 1; // Reduced wind strength
        }
    }

    // Optimized animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        updateWind();

        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    // Start the snow effect
    function startSnow() {
        resizeCanvas();
        initSnow();
        animate();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initSnow();
    });

    // Start snow when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startSnow);
    } else {
        startSnow();
    }
})();
