
// Module data
const modules = [
    {
        id: "module1",
        title: "Introduction to Penetration Testing",
        description: "Fundamentals and methodology",
        file: "module1.html"
    },
    {
        id: "module2",
        title: "Linux Command Line Basics",
        description: "Essential commands for penetration testing",
        file: "module2.html"
    },
    {
        id: "module3",
        title: "Network Fundamentals",
        description: "Understanding network protocols and services",
        file: "module3.html"
    },
    {
        id: "module4",
        title: "Information Gathering",
        description: "Reconnaissance and footprinting techniques",
        file: "module4.html"
    },
    {
        id: "module5",
        title: "Vulnerability Assessment",
        description: "Identifying and analyzing vulnerabilities",
        file: "module5.html"
    },
    {
        id: "module6",
        title: "Web Application Security",
        description: "Testing web applications for vulnerabilities",
        file: "module6.html"
    },
    {
        id: "module7",
        title: "Network Penetration Testing",
        description: "Exploiting network vulnerabilities",
        file: "module7.html"
    },
    {
        id: "module8",
        title: "Wireless Security",
        description: "WiFi and wireless network testing",
        file: "module8.html"
    },
    {
        id: "module9",
        title: "Post-Exploitation",
        description: "Maintaining access and privilege escalation",
        file: "module9.html"
    },
    {
        id: "module10",
        title: "Social Engineering",
        description: "Human element in security testing",
        file: "module10.html"
    },
    {
        id: "module11",
        title: "Reporting and Documentation",
        description: "Professional reporting techniques",
        file: "module11.html"
    },
    {
        id: "module12",
        title: "Legal and Ethical Considerations",
        description: "Legal framework and ethical guidelines",
        file: "module12.html"
    }
];

let currentModule = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    populateModuleList();
    showHome();
});

// Populate the module list in the sidebar
function populateModuleList() {
    const moduleList = document.getElementById('moduleList');
    
    modules.forEach(module => {
        const listItem = document.createElement('li');
        listItem.className = 'module-item';
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'module-link';
        link.dataset.moduleId = module.id;
        
        link.innerHTML = `
            <div class="module-title">${module.title}</div>
            <div class="module-description">${module.description}</div>
        `;
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            loadModule(module);
        });
        
        listItem.appendChild(link);
        moduleList.appendChild(listItem);
    });
}

// Show home content
function showHome() {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <div class="home-content">
            <h1>Welcome to the Ultimate Guide to Penetration Testing</h1>
            <p>This comprehensive course covers penetration testing fundamentals using Debian-based operating systems. Learn ethical hacking, vulnerability assessment, and security testing through 12 structured modules.</p>
            
            <div class="features">
                <div class="feature-card">
                    <h3>12 Comprehensive Modules</h3>
                    <p>From basic Linux commands to advanced exploitation techniques</p>
                </div>
                <div class="feature-card">
                    <h3>Hands-on Learning</h3>
                    <p>Practical exercises and real-world scenarios</p>
                </div>
                <div class="feature-card">
                    <h3>Ethical Framework</h3>
                    <p>Learn responsible disclosure and legal considerations</p>
                </div>
                <div class="feature-card">
                    <h3>Industry Tools</h3>
                    <p>Master tools like Nmap, Metasploit, and Burp Suite</p>
                </div>
                <div class="feature-card">
                    <h3>Network Security</h3>
                    <p>Understand network protocols and attack vectors</p>
                </div>
                <div class="feature-card">
                    <h3>Professional Skills</h3>
                    <p>Learn reporting and documentation best practices</p>
                </div>
            </div>
            
            <div style="margin-top: 2rem; text-align: center;">
                <p style="margin-bottom: 1rem;">Ready to start your cybersecurity journey?</p>
                <button class="btn" onclick="loadModule(modules[0])">Begin with Module 1</button>
            </div>
        </div>
    `;
    
    // Clear active states
    document.querySelectorAll('.module-link').forEach(link => {
        link.classList.remove('active');
    });
    currentModule = null;
}

// Load a specific module
async function loadModule(module) {
    const contentArea = document.getElementById('contentArea');
    
    // Show loading state
    contentArea.innerHTML = '<div class="loading">Loading module...</div>';
    
    try {
        // Try to load the module content from the public/modules folder
        const response = await fetch(`public/modules/${module.file}`);
        
        if (response.ok) {
            const content = await response.text();
            contentArea.innerHTML = `<div class="module-content">${content}</div>`;
        } else {
            // Fallback content if file doesn't exist
            contentArea.innerHTML = `
                <div class="module-content">
                    <h1>${module.title}</h1>
                    <p>${module.description}</p>
                    <p>This module content is being developed. Please check back later for detailed content.</p>
                    
                    <h2>Learning Objectives</h2>
                    <ul>
                        <li>Understand the core concepts of this topic</li>
                        <li>Learn practical applications and techniques</li>
                        <li>Practice with hands-on exercises</li>
                        <li>Apply knowledge in real-world scenarios</li>
                    </ul>
                    
                    <h2>Prerequisites</h2>
                    <p>Basic understanding of computer systems and networks is recommended.</p>
                    
                    <h2>Duration</h2>
                    <p>Estimated completion time: 2-3 hours</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading module:', error);
        contentArea.innerHTML = `
            <div class="module-content">
                <h1>${module.title}</h1>
                <p>Error loading module content. Please try again later.</p>
            </div>
        `;
    }
    
    // Update active state
    document.querySelectorAll('.module-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-module-id="${module.id}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    currentModule = module;
}

// Add navigation functionality
function navigateToModule(moduleId) {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
        loadModule(module);
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!currentModule) return;
    
    const currentIndex = modules.findIndex(m => m.id === currentModule.id);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        loadModule(modules[currentIndex - 1]);
    } else if (e.key === 'ArrowRight' && currentIndex < modules.length - 1) {
        loadModule(modules[currentIndex + 1]);
    } else if (e.key === 'Escape') {
        showHome();
    }
});

// Add home navigation
document.querySelector('.header-content h1').addEventListener('click', showHome);
document.querySelector('.header-content h1').style.cursor = 'pointer';
