document.addEventListener('DOMContentLoaded', function() {
    // --- 3D Background ---
    let scene, camera, renderer, stars;
    function init3DBackground() {
        if (typeof THREE === 'undefined') {
            console.error('Three.js is not loaded.');
            return;
        }
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        camera.rotation.x = Math.PI / 2;
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const starGeo = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 6000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        let starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.7 });
        stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);
        window.addEventListener('resize', onWindowResize, false);
        animate();
    }

    function animate() {
        if (stars) stars.rotation.y += 0.0002;
        if (renderer && scene && camera) renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    function onWindowResize() {
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    // --- Page Navigation ---
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-btn');
    const pages = document.querySelectorAll('.page');
    function switchPage(targetId) {
        pages.forEach(page => {
            if (page) page.classList.remove('active');
        });
        const targetPage = document.querySelector(targetId);
        if(targetPage) targetPage.classList.add('active');
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            }
        });
        window.scrollTo(0,0);
    }
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            switchPage(targetId);
        });
    });

    // --- Project Data & Injection ---
    const projectsData = [
        {
            title: 'Enterprise-Ready 3D Automation Tool',
            description: 'Created an AI-powered automation pipeline for Blender using Python and LLM APIs, cutting modelling and rendering time by 65%.',
            tech: ['Python', 'Blender API', 'LLM APIs', 'Docker', 'AI/ML']
        },
        {
            title: 'Ehaa Earth Website & Sensor Integration',
            description: 'Managed and optimized the official website for performance and UX. Also led the integration of advanced sensors (PM2.5, PM10) into air purifiers for real-time monitoring.',
            tech: ['HTML/CSS', 'JavaScript', 'Firebase', 'Arduino', 'Sensors']
        },
        {
            title: 'Flood Detection & Alert System (IoT)',
            description: 'Built an IoT-based flood detection system with real-time alerts via AWS IoT Core and MQTT, ensuring high reliability and low latency.',
            tech: ['NodeMCU', 'AWS IoT', 'MQTT', 'JavaScript', 'MySQL']
        },
        {
            title: 'Stress Prediction IoT System (IIT Bombay)',
            description: 'Enhanced a wearable-based system for real-time stress monitoring using physiological sensors and Python for data analysis. Achieved 3rd Prize among 10,000+ participants.',
            tech: ['Arduino', 'Python', 'Power BI', 'Data Analytics']
        }
    ];

    const projectsContainer = document.getElementById('projects-grid');
    if (projectsContainer) {
        projectsData.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'card-3d bg-white p-8 rounded-xl border border-gray-200/80 flex flex-col';
            projectCard.innerHTML = `
                <h3 class="text-2xl font-bold text-gray-900 mb-3">${project.title}</h3>
                <p class="text-gray-600 flex-grow mb-6">${project.description}</p>
                <div class="flex flex-wrap gap-2">
                    ${project.tech.map(t => `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">${t}</span>`).join('')}
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }

    // --- Initialize ---
    init3DBackground();
});
