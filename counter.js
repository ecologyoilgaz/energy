// counter.js — time-based illustrative counters
// NOTE: These are NOT real visitor/partner counts. They are derived from uptime.
// Last updated: 2026-11-16

const COUNTER_START = new Date("2026-11-16T00:00:00Z").getTime();

function pad(n) { return String(n).padStart(2, "0"); }

function formatNumber(n) {
  return new Intl.NumberFormat("en-US").format(n);
}

function renderCounters() {
  const el = document.getElementById("live-counters");
  if (!el) return;

  const now = Date.now();
  const elapsedMs = Math.max(0, now - COUNTER_START);

  // Hours since start
  const totalHours = Math.floor(elapsedMs / (1000 * 60 * 60));

  // Visitors: +1 every 5 seconds
  const visitors = Math.floor(elapsedMs / (1000 * 5));

  // Partners: +1 every 2 minutes
  const partners = Math.floor(elapsedMs / (1000 * 60 * 2));

  // Days / hours breakdown for "Hours of operation"
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);

  el.innerHTML = `
    <div class="counter-card">
      <span class="counter-val">${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s</span>
      <span class="counter-lbl">Hours of Operation</span>
    </div>
    <div class="counter-card">
      <span class="counter-val">${formatNumber(visitors)}</span>
      <span class="counter-lbl">Visitors</span>
    </div>
    <div class="counter-card">
      <span class="counter-val">${formatNumber(partners)}</span>
      <span class="counter-lbl">Partners</span>
    </div>
    <div class="counter-note">
      
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCounters();
  setInterval(renderCounters, 1000);
});
