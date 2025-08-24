// Script para a primeira seção (Capital Wealth)
// Dados para o gráfico de setas
const investmentData = [
    { month: 'Jan', value: 14500, change: 1.8 },
    { month: 'Fev', value: 15800, change: 2.4 },
    { month: 'Mar', value: 17200, change: 3.1 },
    { month: 'Abr', value: 19200, change: 4.2 },
    { month: 'Mai', value: 21500, change: 1.2 },
    { month: 'Jun', value: 24300, change: 6.1 },
    { month: 'Jul', value: 27800, change: 7.3 }
];

// Gerar o gráfico de setas
function generateArrowChart() {
    const container = document.querySelector('.capital-wealth-section .arrow-chart-container');
    container.innerHTML = '';
    
    const maxValue = Math.max(...investmentData.map(item => item.value));
    const containerHeight = container.offsetHeight;
    
    investmentData.forEach((data, index) => {
        const heightPercentage = (data.value / maxValue) * 70;
        const arrowHeight = (heightPercentage / 100) * containerHeight;
        
        const arrowColumn = document.createElement('div');
        arrowColumn.className = 'arrow-column';
        
        const arrow = document.createElement('div');
        arrow.className = 'arrow';
        arrow.style.height = '0px';
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'arrow-value';
        valueLabel.textContent = `R$${data.value.toLocaleString()}`;
        
        const monthLabel = document.createElement('div');
        monthLabel.className = 'arrow-label';
        monthLabel.textContent = data.month;
        
        arrowColumn.appendChild(arrow);
        arrowColumn.appendChild(valueLabel);
        arrowColumn.appendChild(monthLabel);
        container.appendChild(arrowColumn);
        
        // Animação de entrada
        setTimeout(() => {
            arrow.style.transition = 'height 1.2s ease-out';
            arrow.style.height = `${arrowHeight}px`;
        }, index * 250);
    });
}

// Atualizar dados de investimento
function updateInvestmentData() {
    const values = document.querySelectorAll('.capital-wealth-section .stat-value');
    const changes = document.querySelectorAll('.capital-wealth-section .stat-change');
    
    values.forEach((value, index) => {
        const currentValue = parseFloat(value.textContent.replace('+', '').replace('%', ''));
        const fluctuation = (Math.random() * 2) + 0.5; // Entre 0.5 e 2.5
        const newValue = currentValue * (1 + fluctuation/100);
        
        value.textContent = `+${newValue.toFixed(1)}%`;
        
        // Atualizar mudança percentual
        const changeElement = changes[index];
        changeElement.innerHTML = `<i class="fas fa-caret-up"></i> +${fluctuation.toFixed(2)}% (30D)`;
    });
    
    // Atualizar gráfico
    generateArrowChart();
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Criar partículas douradas
function createParticles() {
    const container = document.getElementById('goldParticles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamanho aleatório entre 1 e 3px
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição inicial aleatória
        particle.style.left = `${Math.random() * 100}%`;
        
        // Duração and atraso aleatórios para a animação
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// Script para a terceira seção (Como trabalhamos)
function initThirdSection() {
    const section3 = document.querySelector(".sessao-3");
    const video = document.querySelector(".video-hero");

    // Verifica se o IntersectionObserver está disponível
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        section3.classList.add("visivel");
                        if (video) video.play();
                    } else {
                        if (video) video.pause();
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(section3);
    } else {
        // Fallback para navegadores sem IntersectionObserver
        section3.classList.add("visivel");
    }

    // Respeitar prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches && video) {
        video.autoplay = false;
        video.controls = true;
    }
}

// Criar animação de moléculas
function createMoleculeAnimation() {
    const container = document.getElementById('moleculeAnimation');
    if (!container) return;
    
    const moleculeCount = 6;
    
    for (let i = 0; i < moleculeCount; i++) {
        const atom = document.createElement('div');
        atom.classList.add('atom');
        
        // Posição aleatória
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        atom.style.left = `${posX}%`;
        atom.style.top = `${posY}%`;
        
        // Tamanho aleatório
        const size = 6 + Math.random() * 4;
        atom.style.width = `${size}px`;
        atom.style.height = `${size}px`;
        
        // Criar elétrons
        const electronCount = 3 + Math.floor(Math.random() * 3);
        for (let j = 0; j < electronCount; j++) {
            const electron = document.createElement('div');
            electron.classList.add('electron');
            
            // Duração aleatória da animação
            const duration = 6 + Math.random() * 6;
            electron.style.animation = `orbit ${duration}s linear infinite`;
            
            // Tamanho aleatório do raio
            const radius = 20 + Math.random() * 30;
            electron.style.transform = `translateX(${radius}px)`;
            
            atom.appendChild(electron);
        }
        
        container.appendChild(atom);
    }
}

// Animação de revelação ao rolar
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

// Efeito de clique no botão CTA
function setupCtaButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return;
    
    ctaButton.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 10px;"></i> Redirecionando...';
        setTimeout(() => {
            // Aqui você pode adicionar o redirecionamento real
            alert('Cadastro aberto! Redirecionando para o formulário...');
            // window.location.href = 'URL_DO_FORMULARIO';
        }, 1000);
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    // Botão de refresh da primeira seção
    const refreshBtn = document.querySelector('.capital-wealth-section .stats-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', updateInvestmentData);
    }
    
    // Inicializar gráfico da primeira seção
    if (document.querySelector('.capital-wealth-section')) {
        generateArrowChart();
    }
    
    // Header scroll event
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Criar partículas
    createParticles();
    
    // Inicializar terceira seção
    initThirdSection();
    
    // Animação para os cartões de benefícios da segunda seção
    const benefitCards = document.querySelectorAll('.invest-brasil-section .benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
    
    // Animação para estatísticas da segunda seção
    const stats = document.querySelectorAll('.invest-brasil-section .stat-item');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        
        setTimeout(() => {
            stat.style.transition = 'opacity 0.8s ease';
            stat.style.opacity = '1';
        }, 800 + (index * 200));
    });

    // Inicializar animações das seções adicionais
    createMoleculeAnimation();
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Verificar elementos já visíveis
    setupCtaButton();
});
