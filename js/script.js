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

const skillsData = [
  { "name": "Python", "level": 4 },
  { "name": "JavaScript", "level": 5 },
  { "name": "React.js", "level": 4 },
  { "name": "HTML/CSS", "level": 5 },
  { "name": "Git", "level": 4 },
  { "name": "Docker", "level": 3 },
  { "name": "FastAPI", "level": 4 },
  { "name": "Node.js", "level": 3 }
];

function displaySkillsRating() {
  const container = document.getElementById('skills-rating');
  if (!container) return;

  container.innerHTML = '';

  skillsData.forEach(skill => {
    const item = document.createElement('div');
    item.className = 'skill-rating-item';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'skill-name';
    nameSpan.textContent = skill.name;

    const starsSpan = document.createElement('span');
    starsSpan.className = 'stars';
    starsSpan.textContent = '⭐'.repeat(skill.level);

    item.appendChild(nameSpan);
    item.appendChild(starsSpan);
    container.appendChild(item);
  });
}

function drawSkillsChart() {
  const canvas = document.getElementById('skills-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  const barWidth = 80;
  const barSpacing = 20;
  const maxHeight = height - 150;
  const maxLevel = 5;
  const startX = 50;
  const startY = height - 50;

  const barColor = '#2c5aa0';
  const textColor = '#333';

  ctx.clearRect(0, 0, width, height);

  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.fillText('Niveau de maîtrise des compétences', width / 2, 30);

  skillsData.forEach((skill, index) => {
    const x = startX + index * (barWidth + barSpacing);
    const barHeight = (skill.level / maxLevel) * maxHeight;
    const y = startY - barHeight;

    ctx.fillStyle = barColor;
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.strokeStyle = '#1a3d73';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText(skill.level + '/5', x + barWidth / 2, y - 10);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    const maxWidth = barWidth - 5;
    ctx.fillText(skill.name, x + barWidth / 2, startY + 20, maxWidth);

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
  if (section) {
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
  }

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

  displaySkillsRating();
  drawSkillsChart();

});