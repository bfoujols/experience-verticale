# L'expérience verticale — site statique

Version statique (HTML / CSS / JavaScript, sans dépendance) du site WordPress
https://www.experience-verticale.com/, reproduite à l'identique (mêmes gabarits,
mêmes points de rupture responsive : 1120, 991, 767 et 479 px).

## Structure

```
index.html                     Accueil
<page>/index.html              Une page par dossier (URLs identiques à WordPress)
assets/css/base.css            Fondations (framework Oxygen, slider)
assets/css/layout.css          Header et footer communs
assets/css/template-*.css      Gabarits des pages intérieures
assets/css/pages/*.css         Styles propres à chaque page
assets/css/universal.css       Styles globaux du site
assets/js/main.js              Header sticky, menu mobile, slider, blocs dépliables
assets/img/                    Images (rapatriées de Cloudinary et wp-content/uploads)
sitemap.xml, robots.txt
```

Les polices (Montserrat, Raleway, Source Sans Pro, Lobster) sont servies par
[Bunny Fonts](https://fonts.bunny.net), alternative à Google Fonts conforme au RGPD.

## Aperçu en local

```bash
python3 -m http.server 8080
```

puis ouvrir http://localhost:8080.

## Contact

La page « Nous contacter » a été supprimée : les boutons « Nous contacter » /
« Demande de devis » et le lien du footer ouvrent un e-mail vers
`contact@experience-verticale.com`.

## Mise en ligne

Copier tout le dossier (sauf `.claude/` et `README.md`) à la racine de
l'hébergement. Aucun serveur applicatif n'est nécessaire.
