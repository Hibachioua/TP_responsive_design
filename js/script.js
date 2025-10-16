function slideToggle(block, open = true, ms = 250) {
  if (open) {
    block.hidden = false;
    const h = block.scrollHeight;
    block.style.height = '0px';
    block.style.transform = 'scaleY(0.3)';
    block.style.transformOrigin = 'top';
    
    setTimeout(() => {
      block.style.transition = `height ${ms}ms ease, transform ${ms}ms ease`;
      block.style.height = h + 'px';
      block.style.transform = 'scaleY(1)';
      
      setTimeout(() => {
        block.style.height = '';
        block.style.transition = '';
        block.style.transform = '';
      }, ms);
    }, 10);
  } else {
    const h = block.scrollHeight;
    block.style.height = h + 'px';
    block.style.transform = 'scaleY(1)';
    
    setTimeout(() => {
      block.style.transition = `height ${ms}ms ease, transform ${ms}ms ease`;
      block.style.height = '0px';
      block.style.transform = 'scaleY(0.3)';
      
      setTimeout(() => {
        block.hidden = true;
        block.style.height = '';
        block.style.transition = '';
        block.style.transform = '';
      }, ms);
    }, 10);
  }
}

function closeSiblings(section, exceptEl) {
  section.querySelectorAll('.details').forEach(d => {
    if (d !== exceptEl && !d.hidden) {
      const btn = section.querySelector(`.btn-details[aria-controls="${d.id}"]`);
      slideToggle(d, false);
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Détails +';
      }
    }
  });
}


let skillsData = [];

async function loadSkillsData() {
  try {
    // Charger le fichier JSON
    const response = await fetch('skills.json');
    
    // Vérifier que le chargement a réussi
    if (!response.ok) {
      throw new Error('Erreur de chargement du fichier skills.json');
    }
    
    // Convertir la réponse en objet JavaScript
    skillsData = await response.json();
    
    // Une fois les données chargées, afficher les étoiles et le graphique
    displaySkillsRating();
    drawSkillsChart();
    
  } catch (error) {
    console.error('Erreur lors du chargement des compétences:', error);
    // Afficher un message d'erreur à l'utilisateur
    const container = document.getElementById('skills-rating');
    if (container) {
      container.innerHTML = '<p style="color: red;">Erreur de chargement des données.</p>';
    }
  }
}


function displaySkillsRating() {
  const container = document.getElementById('skills-rating');
  if (!container) return;

  // Vider le container avant d'ajouter les compétences
  container.innerHTML = '';

  // Parcourir chaque compétence du tableau
  skillsData.forEach(skill => {
    // Créer un div pour chaque compétence
    const item = document.createElement('div');
    item.className = 'skill-rating-item';

    // Créer le nom de la compétence
    const nameSpan = document.createElement('span');
    nameSpan.className = 'skill-name';
    nameSpan.textContent = skill.name;

    // Créer les étoiles
    const starsSpan = document.createElement('span');
    starsSpan.className = 'stars';
    // Répéter l'étoile selon le niveau (1 à 5)
    starsSpan.textContent = '⭐'.repeat(skill.level);

    // Ajouter le nom et les étoiles au div
    item.appendChild(nameSpan);
    item.appendChild(starsSpan);

    // Ajouter le div au container
    container.appendChild(item);
  });
}


function drawSkillsChart() {
  const canvas = document.getElementById('skills-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Paramètres du graphique
  const barWidth = 80;
  const barSpacing = 20;
  const maxHeight = height - 100; // Espace pour les labels
  const maxLevel = 5; // Maximum d'étoiles
  const startX = 50;
  const startY = height - 50;

  // Couleurs des barres
  const barColor = '#2c5aa0';
  const textColor = '#333';

  // Effacer le canvas
  ctx.clearRect(0, 0, width, height);

  // Titre du graphique
  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.fillText('Niveau de maîtrise des compétences', width / 2, 30);

  // Dessiner chaque barre
  skillsData.forEach((skill, index) => {
    const x = startX + index * (barWidth + barSpacing);
    const barHeight = (skill.level / maxLevel) * maxHeight;
    const y = startY - barHeight;

    // Dessiner la barre
    ctx.fillStyle = barColor;
    ctx.fillRect(x, y, barWidth, barHeight);

    // Ajouter une bordure
    ctx.strokeStyle = '#1a3d73';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);

    // Afficher le niveau en chiffre au-dessus de la barre
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText(skill.level + '/5', x + barWidth / 2, y - 10);

    // Afficher le nom de la compétence en dessous
    ctx.font = '14px sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    // Couper le texte pour qu'il rentre dans la barre
    const maxWidth = barWidth - 5;
    ctx.fillText(skill.name, x + barWidth / 2, startY + 20, maxWidth);

    // Afficher les étoiles en dessous du nom
    ctx.font = '12px sans-serif';
    ctx.fillText('⭐'.repeat(skill.level), x + barWidth / 2, startY + 35);
  });


  ctx.strokeStyle = '#999';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(startX - 20, startY);
  ctx.lineTo(width - 30, startY);
  ctx.stroke();
}






document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('xp');
  if (!section) return;

  section.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      if (!isOpen) closeSiblings(section, panel);
      slideToggle(panel, !isOpen);

      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.textContent = !isOpen ? 'Détails –' : 'Détails +';
    });
  });


  const tooltip = document.getElementById('tooltip');
  const skills = document.querySelectorAll('.skill');

  skills.forEach(function(skill) {
    
    skill.addEventListener('mouseenter', function() {
      const text = this.getAttribute('data-info');
      tooltip.textContent = text;
      tooltip.classList.add('show');
    });

    skill.addEventListener('mousemove', function(e) {
      tooltip.style.left = (e.clientX + 10) + 'px';
      tooltip.style.top = (e.clientY + 10) + 'px';
    });

    skill.addEventListener('mouseleave', function() {
      tooltip.classList.remove('show');
    });

  });

  loadSkillsData();

});
