// Page load animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Filter Cards
function filterCards(category) {
  const cards = document.querySelectorAll('.card');
  const buttons = document.querySelectorAll('.filter-bar button');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Modal logic
const modal = document.getElementById('toolModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    modalImg.src = card.dataset.img;
    modalTitle.textContent = card.dataset.name;
    modalDesc.textContent = card.dataset.longdesc;
    modal.classList.add('active');
  });
});
function closeModal() { modal.classList.remove('active'); }
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// Search
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const desc = card.dataset.desc.toLowerCase();
    if (name.includes(query) || desc.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
