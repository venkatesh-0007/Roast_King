import { useEffect, useRef } from "react";

export default function CosmicBackground({ intensity = "gentle" }) {
  const canvasRef = useRef(null);
  
  // Use ref to pass intensity shifts to the animation loop without restarting the useEffect
  const intensityRef = useRef(intensity);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Track mouse coordinate offsets
    let mouse = { x: null, y: null, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class with gradual velocity interpolation
    class Particle {
      constructor() {
        this.reset();
        this.vx = this.speedX;
        this.vy = this.speedY;
        this.lastMode = null;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.2 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        
        // Color distribution: 60% white/blue, 30% purple, 10% cyan
        const r = Math.random();
        if (r < 0.6) {
          this.color = `rgba(224, 242, 254, ${Math.random() * 0.5 + 0.25})`; // Light blue/white
        } else if (r < 0.9) {
          this.color = `rgba(168, 85, 247, ${Math.random() * 0.5 + 0.25})`; // Purple
        } else {
          this.color = `rgba(6, 182, 212, ${Math.random() * 0.5 + 0.25})`; // Cyan
        }

        // Angle and radius for black hole spiraling
        const dx = this.x - canvas.width / 2;
        const dy = this.y - canvas.height / 2;
        this.angle = Math.atan2(dy, dx);
        this.distance = Math.sqrt(dx * dx + dy * dy);
        this.spinSpeed = (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
      }

      update(mode) {
        if (mode === "black_hole" && this.lastMode !== "black_hole") {
          // Sync distance and angle to current position to avoid glitch/jump
          const dx = this.x - canvas.width / 2;
          const dy = this.y - canvas.height / 2;
          this.angle = Math.atan2(dy, dx);
          this.distance = Math.sqrt(dx * dx + dy * dy);
        }
        this.lastMode = mode;

        let targetVx = this.speedX;
        let targetVy = this.speedY;

        if (mode === "gentle") {
          targetVx = this.speedX;
          targetVy = this.speedY;

          // Wrap boundaries
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
          if (this.y < 0) this.y = canvas.height;
          if (this.y > canvas.height) this.y = 0;
        } 
        
        else if (mode === "meteor") {
          // Fast diagonal meteor storm movement
          targetVx = this.speedX * 3.0 - 1.2;
          targetVy = this.speedY * 3.0 + 2.0;

          // Re-spawn offscreen
          if (this.y > canvas.height || this.x < 0) {
            this.y = 0;
            this.x = Math.random() * canvas.width * 1.5;
            this.vx = targetVx;
            this.vy = targetVy;
          }
        } 
        
        else if (mode === "black_hole") {
          // Spiral inwards toward gravity singularity center
          this.angle += this.spinSpeed;
          this.distance -= 0.65; 

          // Recalculate coordinates
          const spiralX = canvas.width / 2 + Math.cos(this.angle) * this.distance;
          const spiralY = canvas.height / 2 + Math.sin(this.angle) * this.distance;

          targetVx = spiralX - this.x;
          targetVy = spiralY - this.y;

          // Reset if too close to center or offscreen
          if (this.distance < 15 || this.distance > Math.max(canvas.width, canvas.height)) {
            this.reset();
            this.distance = Math.random() * 180 + Math.max(canvas.width, canvas.height) / 2;
            const dx = this.x - canvas.width / 2;
            const dy = this.y - canvas.height / 2;
            this.angle = Math.atan2(dy, dx);
            
            const snapX = canvas.width / 2 + Math.cos(this.angle) * this.distance;
            const snapY = canvas.height / 2 + Math.sin(this.angle) * this.distance;
            this.x = snapX;
            this.y = snapY;
            this.vx = 0;
            this.vy = 0;
          }
        }

        // Interpolate velocity vector smoothly (easing logic)
        const ease = 0.04; // 4% adjust per frame for seamless easing
        this.vx += (targetVx - this.vx) * ease;
        this.vy += (targetVy - this.vy) * ease;

        this.x += this.vx;
        this.y += this.vy;

        // Gravitational Mouse Attraction Effect
        if (mouse.x !== null && mouse.y !== null && mode !== "black_hole") {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Strength increases closer to cursor
            const force = (mouse.radius - distance) / mouse.radius;
            const pullStrength = mode === "meteor" ? 1.6 : 0.8;
            
            this.x += (dx / distance) * force * pullStrength * 0.08;
            this.y += (dy / distance) * force * pullStrength * 0.08;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // High intensity glowing trails
        const mode = intensityRef.current;
        if (this.size > 1.8 && mode !== "gentle") {
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset
        }
      }
    }

    // Initialize particle array once
    const particleCount = 180;
    const particles = Array.from({ length: particleCount }, () => new Particle());

    let currentAlpha = 1.0;

    // Animation loop
    const animate = () => {
      const mode = intensityRef.current;
      let targetAlpha = 1.0;

      if (mode === "black_hole") {
        targetAlpha = 0.12;
      } else if (mode === "meteor") {
        targetAlpha = 0.15;
      } else {
        targetAlpha = 1.0;
      }

      // Smoothly transition background alpha clear value
      currentAlpha += (targetAlpha - currentAlpha) * 0.1;
      ctx.fillStyle = `rgba(3, 0, 20, ${currentAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cosmic nebula gradients
      const grad1 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.2, 0,
        canvas.width * 0.2, canvas.height * 0.2, canvas.width * 0.8
      );
      grad1.addColorStop(0, "rgba(88, 28, 135, 0.12)"); // Purple nebula
      grad1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grad2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.8, 0,
        canvas.width * 0.8, canvas.height * 0.8, canvas.width * 0.8
      );
      grad2.addColorStop(0, "rgba(6, 182, 212, 0.08)"); // Cyan nebula
      grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render and update particles
      particles.forEach((particle) => {
        particle.update(mode);
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures particles are never reset

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
    />
  );
}
