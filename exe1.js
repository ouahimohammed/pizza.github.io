let TArticles = [];

function init() {
  fetch('articles.json')
    .then(response => response.json())
    .then(data => {
      TArticles = data;
    })
    .catch(error => console.error('Erreur lors du chargement des articles:', error));
}

window.onload = init;
let TArticlesChoisis = [];

function ajouter() {
  const nom = document.getElementById('nom').value;
  const adresse = document.getElementById('adresse').value;
  const quantite = parseInt(document.getElementById('quantite').value);
  const pizzaCode = document.getElementById('pizza').value;
  
  if (!nom || !adresse || quantite < 1 || quantite > 10) {
    alert('Veuillez remplir correctement le formulaire.');
    return;
  }

  const article = TArticles.find(article => article.code === pizzaCode);
  const total = article.prix * quantite;
  
  TArticlesChoisis.push({
    designation: article.designation,
    prix: article.prix,
    quantite,
    total
  });

  afficherTableau();
  calculerTotal();
}

function afficherTableau() {
  const tbody = document.querySelector('#tableauArticles tbody');
  tbody.innerHTML = '';

  TArticlesChoisis.forEach(article => {
    const row = `<tr>
      <td>${article.designation}</td>
      <td>${article.prix}</td>
      <td>${article.quantite}</td>
      
    </tr>`;
    tbody.innerHTML += row;
  });
}

function calculerTotal() {
  const total = TArticlesChoisis.reduce((acc, article) => acc + article.total, 0);
  document.getElementById('total').innerText = total;
}
function toggleCardInput() {
    const paiement = document.getElementById('paiement').value;
    const carte = document.getElementById('carte');
    carte.disabled = paiement === 'cheque';
  }
  document.getElementById('commandePizza').onsubmit = function (e) {
    e.preventDefault();
    let recap = 'Récapitulatif de votre commande :\n';
    TArticlesChoisis.forEach(article => {
      recap += `${article.designation}, Quantité: ${article.quantite}, Total: ${article.total} DH\n`;
    });
    recap += `Montant total : ${document.getElementById('total').innerText} DH`;
    
    if (confirm(recap + '\nVoulez-vous imprimer la commande ?')) {
      window.print();
    }
  };
  document.getElementById('enregistrerBtn').onclick = function() {
    if (TArticlesChoisis.length === 0) {
        alert("Aucune commande à enregistrer !");
        return;
    }

  
    alert("Commande enregistrée avec succès !");
};
function toggleCardInput() {
    const carte = document.getElementById('carte');
    const carteBancaireInput = document.getElementById('carteBancaire');
    
    // Vérifie si la carte bancaire est sélectionnée
    carteBancaireInput.disabled = !carte.checked;
}

// Ajoute un gestionnaire d'événements pour les boutons radio de paiement
document.querySelectorAll('input[name="paiement"]').forEach(input => {
    input.addEventListener('change', toggleCardInput);
});

// Appelle la fonction une fois au chargement pour définir l'état initial
toggleCardInput();
function calculerTotal() {
    const total = TArticlesChoisis.reduce((acc, article) => acc + article.total, 0);
    document.getElementById('total').innerText = total;
    document.getElementById('montantTotal').value = total;
}
function annuler() {
    document.getElementById('commandePizza').reset();
    TArticlesChoisis = [];
    afficherTableau();
    document.getElementById('total').innerText = '0';
    document.getElementById('montantTotal').value = '';
}

document.getElementById('annulerBtn').onclick = annuler;
