# LIP Industrie Précision — page de présentation (QR Micronora)

Landing page mobile-first (style sombre « Netflix », vert de marque) destinée au QR code
du stand **Micronora 2026** (Hall B1, Stand 503).

## Fichiers
- `index.html` — la page (2 onglets : **Présentation** / **Contact**)
- `style.css` — thème & responsive
- `script.js` — onglets, génération de la vCard, animations au scroll
- `logo-lip/` et `img-site/` — images (déjà présentes)

## Tester en local
Ouvrez simplement `index.html` dans un navigateur (double-clic), ou lancez un petit serveur :

```powershell
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Mettre en ligne (GitHub Pages)
1. Créez un dépôt GitHub et poussez **tout le dossier** (avec `logo-lip/` et `img-site/`).
2. Dépôt → **Settings → Pages**.
3. *Source* : `Deploy from a branch`, branche `main`, dossier `/ (root)` → **Save**.
4. Au bout d'une minute, l'URL publique s'affiche :
   `https://<votre-compte>.github.io/<nom-du-depot>/`
5. Générez le QR code pointant vers cette URL.

> Tous les chemins sont **relatifs**, la page fonctionne donc dans un sous-dossier de Pages.

## SEO — indexation & « jus » vers lip-industrie.com
La page est **indexable** (`robots: index, follow`) et conçue pour **renforcer le site
officiel** :

- **`canonical` → `https://www.lip-industrie.com/`** : Google crédite le site officiel
  plutôt que la page GitHub (évite le contenu dupliqué concurrent). La page GitHub reste
  crawlée et transmet son autorité au site officiel.
- **Liens `dofollow` riches** (footer + carte de visite) avec ancres descriptives vers
  lip-industrie.com → transmission du « link juice ».
- **Données structurées JSON-LD** (`LocalBusiness`) pointant vers le site officiel →
  aide au Knowledge Graph / résultats enrichis.

### Pour que l'indexation fonctionne bien sur GitHub Pages
- **`robots.txt` n'est servi qu'à la racine d'un domaine.** Sur une URL de type
  `https://<compte>.github.io/<depot>/`, le `robots.txt` de ce dépôt **n'est pas** lu par
  Google (il ne lit que `https://<compte>.github.io/robots.txt`). Deux options :
  1. Hébergez la page sur un dépôt nommé `<compte>.github.io` (URL racine), **ou**
  2. Utilisez un **domaine personnalisé** (Settings → Pages → Custom domain), ex.
     `salon.lip-industrie.com`, ce qui est aussi bien meilleur pour le SEO et la confiance.
- Après mise en ligne, soumettez l'URL dans **Google Search Console** pour accélérer
  l'indexation.
- Un fichier **`.nojekyll`** est inclus pour que GitHub Pages serve tous les fichiers tels
  quels (notamment les dossiers/images) sans traitement Jekyll.

> Astuce : un domaine personnalisé type `micronora.lip-industrie.com` renforcerait encore
> le lien SEO avec votre marque et rendrait le QR code plus rassurant pour les visiteurs.

## Personnalisation rapide
- **Email** : `contact@lip-industrie.com` (dans `index.html` + `script.js`).
- **Couleur** : variable `--vert` en haut de `style.css`.
- **Infos vCard** : bloc `vcard` au début de `script.js`.
