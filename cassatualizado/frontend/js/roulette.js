const wheel = document.getElementById('wheel');
const result = document.getElementById('result');
const btn = document.getElementById('spinBtn');
const confettiRoot = document.getElementById('confetti');

const slices = [
  { label: 'R$ 5', val: 5 },
  { label: 'R$ 10', val: 10 },
  { label: 'R$ 20', val: 20 },
  { label: 'R$ 0', val: 0 },
  { label: 'R$ 50', val: 50 },
  { label: 'R$ 0', val: 0 },
  { label: 'R$ 100', val: 100 },
  { label: 'R$ 0', val: 0 },
];

const ctx = wheel.getContext('2d');
const center = wheel.width/2;
const radius = center-8;

function drawWheel(angle=0){
  ctx.clearRect(0,0,wheel.width,wheel.height);
  const step = (Math.PI*2) / slices.length;
  for(let i=0;i<slices.length;i++){
    const start = i*step + angle;
    const end = start + step;
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = i%2===0 ? '#1a2130' : '#0f1420';
    ctx.fill();
    ctx.strokeStyle = 'rgba(200,163,74,.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // neon accent
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(start + step/2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#e8e8ea';
    ctx.font = 'bold 16px Orbitron, sans-serif';
    ctx.shadowColor = '#14e0ff';
    ctx.shadowBlur = 8;
    ctx.fillText(slices[i].label, radius-10, 6);
    ctx.restore();
  }

  // pointer
  ctx.beginPath();
  ctx.moveTo(center, center-radius-6);
  ctx.lineTo(center-10, center-radius-26);
  ctx.lineTo(center+10, center-radius-26);
  ctx.closePath();
  ctx.fillStyle = '#c8a34a';
  ctx.fill();
}

let spinning = false;
drawWheel();

btn.addEventListener('click', async () => {
  if(spinning) return;
  spinning = true;
  btn.disabled = true;

  const target = Math.floor(Math.random()*slices.length);
  const step = (Math.PI*2)/slices.length;
  const targetAngle = (Math.PI*2)*6 + (Math.PI*2 - (target*step + step/2)); // 6 voltas + alinhamento no topo

  const t0 = performance.now();
  const dur = 4200;
  const animate = (t) => {
    const p = Math.min(1, (t - t0)/dur);
    const ease = 1 - Math.pow(1-p, 3);
    drawWheel(ease*targetAngle);
    if(p<1) requestAnimationFrame(animate);
    else {
      const prize = slices[target];
      result.textContent = `Parabéns! Você ganhou ${prize.label}`;
      burstConfetti();
      credit(prize.val);
      spinning = false;
      btn.disabled = false;
    }
  };
  requestAnimationFrame(animate);
});

function credit(amount){
  if(amount<=0) return;
  const user = JSON.parse(localStorage.getItem('user'));
  user.balance += amount;
  localStorage.setItem('user', JSON.stringify(user));
}

function burstConfetti(){
  const N = 140;
  for(let i=0;i<N;i++){
    const p = document.createElement('div');
    p.style.position='absolute';
    p.style.top='50%'; p.style.left='50%';
    p.style.width='8px'; p.style.height='8px';
    p.style.background='white';
    p.style.transform=`translate(-50%,-50%) rotate(${Math.random()*360}deg)`;
    p.style.opacity='.9';
    p.style.borderRadius='2px';
    p.style.boxShadow='0 0 10px rgba(20,224,255,.8)';
    confettiRoot.appendChild(p);
    const dx = (Math.random()-0.5)*600;
    const dy = (Math.random()-0.5)*420 - 200;
    const rot = (Math.random()-0.5)*720;
    p.animate([
      { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity: 0 }
    ], { duration: 1200 + Math.random()*800, easing: 'cubic-bezier(.2,.6,.2,1)' }).onfinish = () => p.remove();
  }
}
