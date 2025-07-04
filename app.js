
// Cybersecurity Course Application
class CyberSecApp {
    constructor() {
        this.modules = [];
        this.completedModules = new Set();
        this.currentSection = 'home';
        this.init();
    }

    init() {
        this.loadModules();
        this.loadProgress();
        this.bindEvents();
        this.initScrollToTop();
    }

    loadModules() {
        // Module data - simplified from the original JSON
        this.modules = [
            {
                id: "module1",
                title: "Linux Fundamentals for Penetration Testing",
                summary: "Master essential Linux commands and system administration for security testing",
                duration: "3.5 hours",
                difficulty: "Beginner",
                lessons: 8,
                icon: "fas fa-terminal"
            },
            {
                id: "module2",
                title: "Network Security Fundamentals",
                summary: "Understanding network protocols, security devices, and monitoring techniques",
                duration: "4 hours",
                difficulty: "Beginner",
                lessons: 10,
                icon: "fas fa-network-wired"
            },
            {
                id: "module3",
                title: "Penetration Testing Laboratory Setup",
                summary: "Set up a complete penetration testing environment with virtual machines",
                duration: "2.5 hours",
                difficulty: "Beginner",
                lessons: 6,
                icon: "fas fa-laptop-code"
            },
            {
                id: "module4",
                title: "Information Gathering & Reconnaissance",
                summary: "Passive and active reconnaissance techniques for target assessment",
                duration: "4.5 hours",
                difficulty: "Intermediate",
                lessons: 12,
                icon: "fas fa-search"
            },
            {
                id: "module5",
                title: "Vulnerability Assessment & Scanning",
                summary: "Identify and assess security vulnerabilities using automated tools",
                duration: "3.5 hours",
                difficulty: "Intermediate",
                lessons: 9,
                icon: "fas fa-bug"
            },
            {
                id: "module6",
                title: "Network Enumeration Techniques",
                summary: "Advanced network discovery and service enumeration methods",
                duration: "4 hours",
                difficulty: "Intermediate",
                lessons: 11,
                icon: "fas fa-sitemap"
            },
            {
                id: "module7",
                title: "Web Application Security Testing",
                summary: "Comprehensive web application vulnerability assessment and exploitation",
                duration: "6 hours",
                difficulty: "Intermediate",
                lessons: 15,
                icon: "fas fa-globe"
            },
            {
                id: "module8",
                title: "SQL Injection Exploitation",
                summary: "Advanced SQL injection techniques and database exploitation",
                duration: "3.5 hours",
                difficulty: "Advanced",
                lessons: 8,
                icon: "fas fa-database"
            },
            {
                id: "module9",
                title: "Cross-Site Scripting (XSS) Attacks",
                summary: "Client-side attack vectors and browser exploitation techniques",
                duration: "3 hours",
                difficulty: "Advanced",
                lessons: 7,
                icon: "fas fa-code"
            },
            {
                id: "module10",
                title: "Metasploit Framework Mastery",
                summary: "Advanced exploitation framework usage and custom module development",
                duration: "5 hours",
                difficulty: "Advanced",
                lessons: 13,
                icon: "fas fa-rocket"
            },
            {
                id: "module11",
                title: "Post-Exploitation Techniques",
                summary: "Maintain access, privilege escalation, and lateral movement strategies",
                duration: "4.5 hours",
                difficulty: "Advanced",
                lessons: 11,
                icon: "fas fa-user-secret"
            },
            {
                id: "module12",
                title: "Active Directory & Windows Security",
                summary: "Windows domain exploitation and Active Directory attack techniques",
                duration: "5.5 hours",
                difficulty: "Advanced",
                lessons: 14,
                icon: "fab fa-microsoft"
            },
            {
                id: "module13",
                title: "Wireless Network Security Testing",
                summary: "WiFi security assessment, WPA/WEP cracking, and rogue access point detection",
                duration: "4 hours",
                difficulty: "Intermediate",
                lessons: 10,
                icon: "fas fa-wifi"
            },
            {
                id: "module14",
                title: "Mobile Application Security",
                summary: "iOS and Android application security testing methodologies",
                duration: "4.5 hours",
                difficulty: "Advanced",
                lessons: 12,
                icon: "fas fa-mobile-alt"
            },
            {
                id: "module15",
                title: "IoT & Embedded Systems Security",
                summary: "Internet of Things device security assessment and firmware analysis",
                duration: "3.5 hours",
                difficulty: "Advanced",
                lessons: 9,
                icon: "fas fa-microchip"
            },
            {
                id: "module16",
                title: "Cloud Security Assessment",
                summary: "AWS, Azure, and GCP security testing methodologies",
                duration: "5 hours",
                difficulty: "Advanced",
                lessons: 13,
                icon: "fas fa-cloud"
            },
            {
                id: "module17",
                title: "Container & Kubernetes Security",
                summary: "Docker and Kubernetes security assessment techniques",
                duration: "4 hours",
                difficulty: "Advanced",
                lessons: 10,
                icon: "fab fa-docker"
            },
            {
                id: "module18",
                title: "API Security Testing",
                summary: "REST and GraphQL API security assessment methodologies",
                duration: "3.5 hours",
                difficulty: "Intermediate",
                lessons: 9,
                icon: "fas fa-exchange-alt"
            },
            {
                id: "module19",
                title: "Database Security Assessment",
                summary: "Database server security testing and data protection evaluation",
                duration: "3 hours",
                difficulty: "Intermediate",
                lessons: 8,
                icon: "fas fa-server"
            },
            {
                id: "module20",
                title: "Cryptography & Password Security",
                summary: "Cryptographic implementations and password attack techniques",
                duration: "4 hours",
                difficulty: "Advanced",
                lessons: 11,
                icon: "fas fa-key"
            },
            {
                id: "module21",
                title: "Social Engineering & Physical Security",
                summary: "Human factor exploitation and physical security assessment",
                duration: "3.5 hours",
                difficulty: "Intermediate",
                lessons: 9,
                icon: "fas fa-user-shield"
            },
            {
                id: "module22",
                title: "Threat Modeling & Risk Assessment",
                summary: "Systematic threat identification and risk analysis methodologies",
                duration: "3 hours",
                difficulty: "Intermediate",
                lessons: 7,
                icon: "fas fa-shield-alt"
            },
            {
                id: "module23",
                title: "Evasion Techniques & Anti-Detection",
                summary: "Advanced evasion methods and anti-forensics techniques",
                duration: "4 hours",
                difficulty: "Expert",
                lessons: 10,
                icon: "fas fa-mask"
            },
            {
                id: "module24",
                title: "Red Team Operations",
                summary: "Advanced persistent threat simulation and campaign management",
                duration: "6 hours",
                difficulty: "Expert",
                lessons: 15,
                icon: "fas fa-crosshairs"
            },
            {
                id: "module25",
                title: "Industrial Control Systems (ICS/SCADA)",
                summary: "Critical infrastructure and industrial control system security",
                duration: "4.5 hours",
                difficulty: "Expert",
                lessons: 11,
                icon: "fas fa-industry"
            },
            {
                id: "module26",
                title: "Incident Response & Digital Forensics",
                summary: "Security incident handling and digital evidence analysis",
                duration: "5 hours",
                difficulty: "Advanced",
                lessons: 12,
                icon: "fas fa-search-plus"
            },
            {
                id: "module27",
                title: "Legal & Ethical Considerations",
                summary: "Legal frameworks, compliance requirements, and ethical hacking principles",
                duration: "2.5 hours",
                difficulty: "Beginner",
                lessons: 6,
                icon: "fas fa-balance-scale"
            },
            {
                id: "module28",
                title: "Professional Development & Certification",
                summary: "Career advancement, certification preparation, and continuing education",
                duration: "2 hours",
                difficulty: "Beginner",
                lessons: 5,
                icon: "fas fa-graduation-cap"
            },
            {
                id: "module29",
                title: "Advanced Reporting & Documentation",
                summary: "Professional report writing and client communication strategies",
                duration: "2.5 hours",
                difficulty: "Intermediate",
                lessons: 6,
                icon: "fas fa-file-alt"
            },
            {
                id: "module30",
                title: "Capstone Project & Portfolio Development",
                summary: "Comprehensive penetration testing project and portfolio creation",
                duration: "8 hours",
                difficulty: "Expert",
                lessons: 4,
                icon: "fas fa-trophy"
            }
        ];
    }

    loadProgress() {
        const saved = localStorage.getItem('cybersec-progress');
        if (saved) {
            this.completedModules = new Set(JSON.parse(saved));
        }
        this.updateProgress();
    }

    saveProgress() {
        localStorage.setItem('cybersec-progress', JSON.stringify([...this.completedModules]));
        this.updateProgress();
    }

    updateProgress() {
        const completed = this.completedModules.size;
        const total = this.modules.length;
        const percent = Math.round((completed / total) * 100);

        document.getElementById('completedCount').textContent = completed;
        document.getElementById('totalCount').textContent = total;
        document.getElementById('progressPercent').textContent = percent + '%';
        document.getElementById('progressBar').style.width = percent + '%';
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('href').substring(1);
                this.showSection(section);
            });
        });

        // Mark complete button
        document.getElementById('markCompleteBtn').addEventListener('click', () => {
            this.markCurrentModuleComplete();
        });
    }

    showSection(section) {
        // Hide all sections
        document.querySelectorAll('section').forEach(s => s.classList.add('d-none'));
        
        // Show requested section
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            sectionElement.classList.remove('d-none');
            sectionElement.classList.add('fade-in');
        }

        this.currentSection = section;

        // Load modules if showing modules section
        if (section === 'modules') {
            this.renderModules();
        }
    }

    renderModules() {
        const container = document.getElementById('modulesList');
        container.innerHTML = '';

        this.modules.forEach(module => {
            const isCompleted = this.completedModules.has(module.id);
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';
            
            card.innerHTML = `
                <div class="card module-card ${isCompleted ? 'completed' : ''}" data-module-id="${module.id}">
                    <div class="card-body text-center">
                        <i class="${module.icon} module-icon"></i>
                        <h5 class="card-title">${module.title}</h5>
                        <p class="card-text">${module.summary}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="badge difficulty-${module.difficulty.toLowerCase()}">${module.difficulty}</span>
                            <small class="text-muted">${module.duration}</small>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <small class="text-muted">${module.lessons} lessons</small>
                            ${isCompleted ? '<i class="fas fa-check-circle text-success"></i>' : ''}
                        </div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => this.openModule(module));
            container.appendChild(card);
        });
    }

    async openModule(module) {
        document.getElementById('moduleModalTitle').textContent = module.title;
        this.currentModuleId = module.id;

        // Update mark complete button
        const markCompleteBtn = document.getElementById('markCompleteBtn');
        const isCompleted = this.completedModules.has(module.id);
        markCompleteBtn.textContent = isCompleted ? 'Completed' : 'Mark as Complete';
        markCompleteBtn.disabled = isCompleted;

        // Load module content
        try {
            const response = await fetch(`/public/modules/${module.id}.html`);
            if (response.ok) {
                let content = await response.text();
                // Extract content from body tag
                const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                if (bodyMatch) {
                    content = bodyMatch[1];
                }
                document.getElementById('moduleContent').innerHTML = `<div class="module-content">${content}</div>`;
            } else {
                document.getElementById('moduleContent').innerHTML = `
                    <div class="alert alert-warning">
                        <h4>${module.title}</h4>
                        <p><strong>Duration:</strong> ${module.duration}</p>
                        <p><strong>Difficulty:</strong> ${module.difficulty}</p>
                        <p><strong>Lessons:</strong> ${module.lessons}</p>
                        <p><strong>Summary:</strong> ${module.summary}</p>
                        <p class="mt-3">Module content is being prepared. Please check back later.</p>
                    </div>
                `;
            }
        } catch (error) {
            document.getElementById('moduleContent').innerHTML = `
                <div class="alert alert-danger">
                    <h4>Error Loading Module</h4>
                    <p>Unable to load module content. Please try again later.</p>
                </div>
            `;
        }

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('moduleModal'));
        modal.show();
    }

    markCurrentModuleComplete() {
        if (this.currentModuleId) {
            this.completedModules.add(this.currentModuleId);
            this.saveProgress();
            
            // Update button
            const markCompleteBtn = document.getElementById('markCompleteBtn');
            markCompleteBtn.textContent = 'Completed';
            markCompleteBtn.disabled = true;
            
            // Re-render modules to show completion
            this.renderModules();
        }
    }

    initScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.remove('d-none');
            } else {
                scrollBtn.classList.add('d-none');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Global functions
function showModules() {
    app.showSection('modules');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CyberSecApp();
});
