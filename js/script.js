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

  const barHeight = 25;
  const barSpacing = 15;
  const maxBarWidth = width - 280;
  const maxLevel = 5;
  const startX = 180;
  const startY = 40;
  const labelX = 20;

  const barColor = '#2c5aa0';
  const barBgColor = '#e8e8e8';
  const textColor = '#333';

  ctx.clearRect(0, 0, width, height);

  skillsData.forEach((skill, index) => {
    const y = startY + index * (barHeight + barSpacing);
    const barWidth = (skill.level / maxLevel) * maxBarWidth;

    ctx.fillStyle = barBgColor;
    ctx.fillRect(startX, y, maxBarWidth, barHeight);

    ctx.fillStyle = barColor;
    ctx.fillRect(startX, y, barWidth, barHeight);

    ctx.strokeStyle = '#1a3d73';
    ctx.lineWidth = 1;
    ctx.strokeRect(startX, y, maxBarWidth, barHeight);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'left';
    ctx.fillText(skill.name, labelX, y + barHeight / 2 + 5);

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'left';
    ctx.fillText(skill.level + '/5', startX + maxBarWidth + 10, y + barHeight / 2 + 5);
  });
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

  const chartBtn = document.querySelector('.btn-details[aria-controls="chart-container"]');
  const chartContainer = document.getElementById('chart-container');
  
  if (chartBtn && chartContainer) {
    chartBtn.addEventListener('click', () => {
      const isOpen = chartBtn.getAttribute('aria-expanded') === 'true';
      slideToggle(chartContainer, !isOpen);
      chartBtn.setAttribute('aria-expanded', String(!isOpen));
      chartBtn.textContent = !isOpen ? 'Masquer –' : 'Afficher +';
      
      if (!isOpen) {
        setTimeout(() => drawSkillsChart(), 50);
      }
    });
  }

});