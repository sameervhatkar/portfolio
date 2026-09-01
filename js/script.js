
        // Initialize Lucide Icons
        lucide.createIcons();

        // --- PROJECT DATA ---
        const projectData = [
            {
                title: "HeapVortex",
                subtitle: "Java | Spring Boot | JVM | JMX | Eclipse MAT",
                description: `
                    <p>A full-stack JVM diagnostic application designed to orchestrate automated heap dump analysis and serve data for 15,000+ memory objects via RESTful APIs[cite: 2].</p>
                    <p>This system replaces manual monitoring by extracting live memory metrics and parsing multi-gigabyte binary files to accelerate memory leak detection[cite: 2].</p>
                `,
                features: [
                    "Integrated secure JMX telemetry over SSL/TLS for encrypted extraction of live memory metrics[cite: 2]",
                    "Engineered a headless Eclipse MAT integration to parse multi-gigabyte .hprof binary files[cite: 2]",
                    "Utilized algorithmic sorting to extract the heaviest memory footprints[cite: 2]",
                    "Containerized the backend infrastructure using Docker with dynamic volume mapping[cite: 2]",
                    "Achieved 1-click cross-platform deployments, eliminating OS-level file pathing discrepancies[cite: 2]"
                ],
                github: "https://github.com/vhatkarsameer/heapvortex-java-fullstack"
            },
            {
                title: "E-commerce Microservices Backend",
                subtitle: "Java | Spring Boot | MySQL",
                description: `
                    <p>A full-scale E-commerce backend system built using <strong>Java, Spring Boot, MySQL, and microservices architecture</strong>.</p>
                    <p>This system was designed to simulate high-traffic online retail environments, ensuring scalability and fault tolerance.</p>
                    <p>Built with layered architecture, DTOs, REST APIs, and real-world scalable patterns.</p>
                `,
                features: [
                    "Product Service (product CRUD)",
                    "User Service (registration, login, JWT authentication)",
                    "Order Service (order placement & workflow)",
                    "Payment Service (mock payment handler)",
                    "Microservices Communication",
                    "MySQL Database Integration"
                ],
                github: "https://github.com/sameervhatkar/EcommerceProductService" // Main profile as fallback
            },
            {
                title: "BookMyShow Backend",
                subtitle: "Java Spring Boot | RDBMS",
                description: `
                    <p>A backend project inspired by <strong>BookMyShow</strong>, designed to handle the complexities of a movie ticket booking system.</p>
                    <p>Developed using Java Spring Boot and advanced relational database modeling, focusing on One-to-Many and Many-to-Many relationships to handle users, theaters, and movies effectively.</p>
                `,
                features: [
                    "Movie management",
                    "Showtimes handling",
                    "Theater layout modeling",
                    "Seat selection logic",
                    "Ticket booking workflow",
                    "User account handling",
                    "Payment simulation"
                ],
                github: "https://github.com/sameervhatkar/MovieBookingSystem"
            },
            {
                title: "Fake Store API Integration",
                subtitle: "RestTemplate | WebClient",
                description: `
                    <p>A practical integration project using the <strong>Fake Store API</strong> to fetch and handle external product data.</p>
                    <p>This project demonstrates the ability to consume third-party RESTful services within a Java application, a critical skill for modern enterprise development.</p>
                `,
                features: [
                    "API consumption via RestTemplate/WebClient",
                    "Data filtering & transformation",
                    "Exception & error handling",
                    "Clean controller-service design",
                    "JSON Response Parsing"
                ],
                github: "https://github.com/sameervhatkar/fakestore"
            }
        ];

        // --- VIEW SWITCHING LOGIC ---
        function showView(viewName) {
            // Hide all views
            document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
            
            // Show selected view
            const selectedView = document.getElementById(`view-${viewName}`);
            if (selectedView) {
                selectedView.classList.add('active');
            }

            // Scroll to top
            window.scrollTo(0, 0);

            // Re-initialize icons
            lucide.createIcons();
        }

        function openProject(index) {
            const project = projectData[index];
            if (!project) return;

            // Populate details
            document.getElementById('detail-title').innerText = project.title;
            document.getElementById('detail-subtitle').innerText = project.subtitle;
            document.getElementById('detail-description').innerHTML = project.description;
            
            // Populate features
            const featuresList = document.getElementById('detail-features');
            featuresList.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.className = "flex items-start";
                li.innerHTML = `<span class="text-red-600 mr-2">></span> ${feature}`;
                featuresList.appendChild(li);
            });

            // Set Link
            document.getElementById('detail-github').href = project.github;

            // Show view
            showView('project-details');
        }

        function showContact() {
            showView('home');
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); 
        }

        // --- PARTICLE SYSTEM (THE UPSIDE DOWN SPORES) ---
        const canvas = document.getElementById('spores');
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Very slow horizontal drift
                this.vy = (Math.random() - 0.5) * 0.5; // Very slow vertical drift
                this.size = Math.random() * 2;
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 200, 220, ${this.alpha})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 150; i++) { // Number of spores
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });

        resize();
        initParticles();
        animate();