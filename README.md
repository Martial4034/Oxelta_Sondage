# À 18 ans : Réalisation d'une Solution de Sondage Complète pour [Oxelta.io](https://www.oxelta.io/)

## Introduction

**[Oxelta.io](https://www.oxelta.io/)** , une start-up innovante spécialisée dans la création de jeux dans le domaine du Web 3, souhaitait évaluer l'intérêt des utilisateurs pour un nouveau jeu en développement. Pour ce faire, ils avaient besoin d'une **solution de sondage efficace, rapide et intuitive**. J'ai eu l'opportunité de collaborer étroitement avec eux pour concevoir, développer et déployer cette solution complète, incluant un **sondage minimaliste multilingue** et un **dashboard analytique sécurisé**.

## Table des Matières

-   [Défis et Objectifs](#d%C3%A9fis-et-objectifs)
-   [Approche Stratégique](#approche-strat%C3%A9gique)
-   [Caractéristiques du Sondage](#caract%C3%A9ristiques-du-sondage)
-   [Dashboard Analytique](#dashboard-analytique)
-   [Sécurisation et Authentification](#s%C3%A9curisation-et-authentification)
-   [Technologies Utilisées](#technologies-utilis%C3%A9es)
-   [Enseignements et Compétences Acquises](#enseignements-et-comp%C3%A9tences-acquises)
-   [Ressources Visuelles](#ressources-visuelles)

----------

## Défis et Objectifs

-   **Délai Serré**: La start-up avait besoin d'une solution opérationnelle **le plus rapidement possible** pour aligner leur stratégie de lancement.
-   **Collecte de Données Pertinentes**: Au-delà des simples réponses au sondage, l'objectif principal était de **collecter des adresses email** pour identifier des potentiels acheteurs pour leur private sale de tokens.
-   **Expérience Utilisateur Optimale**: Minimiser la friction pour maximiser le taux de réponse, tout en assurant une **expérience utilisateur fluide et agréable**.

## Approche Stratégique

1.  **Identification des Besoins**: Sessions de brainstorming avec l'équipe d'Oxelta.io pour définir les objectifs clés et les métriques de succès.
2.  **Élaboration Rapide de la Stratégie**: Proposition de plusieurs solutions avec une analyse des avantages et inconvénients de chacune.
3.  **Allers-Retours Constants**: Communication continue avec le client pour s'assurer que chaque étape du développement correspondait à leurs attentes.
4.  **Mise en Production Rapide**: Déploiement rapide de la solution et liaison avec leurs noms de domaine pour une intégration transparente.

## Caractéristiques du Sondage

-   **Design Minimaliste**: Une page épurée avec un focus sur la facilité de réponse.
-   **Questions Simples et Rapides**:
    -   **Oui/Non**
    -   **Boutons à Cocher**
    -   **Sliders (Échelle de 1 à 10)**
-   **Multilingue**: Disponibilité en **anglais** et **français** pour toucher un public plus large.
-   **Collecte d'Emails**: Intégration d'un champ obligatoire pour recueillir les adresses email des participants.
-   **Confirmation par Email**: Envoi automatique d'un email de remerciement, adapté à la langue du participant, après la soumission du sondage.

### Sondage Multi langue
![Photo du sondage ](https://i.imgur.com/YoMOays.png)


![Email et comportement de l'utilisateur](https://i.imgur.com/mMoATpT.png)
## Dashboard Analytique

-   **Visualisation des Données**: Utilisation de **Chart.js** pour représenter graphiquement les réponses.
-   **Filtres Avancés**:
    -   **Tri par Réponses Spécifiques** (e.g., tous les participants ayant répondu "Oui" à une question particulière).
    -   **Sélection des Participants ayant Fournis leur Email** pour des campagnes ciblées.
-   **Exportation des Données**: Possibilité d'exporter les adresses email et autres données pertinentes.
-   **KPI Personnalisés**: Mise en place de métriques clés définies par Oxelta.io, telles que le taux de clic sur les emails envoyés, la provenance géographique des répondants, etc.

## Sécurisation et Authentification

-   **Login par Email**: Mise en place d'un système d'authentification sans mot de passe pour minimiser la friction. Les employés référencés saisissent leur email et reçoivent un lien de connexion instantané.
-   **Middleware de Sécurité**: Utilisation de **NextAuth** combiné à un middleware pour garantir que seuls les utilisateurs autorisés accèdent au dashboard.
-   **Hébergement Sécurisé**: Déploiement via **Vercel** pour bénéficier de leurs mesures de sécurité intégrées.

## Technologies Utilisées

- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) **Next.js 14**: Framework principal pour le développement frontend et backend.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**: Stylisation rapide et responsive du sondage et du dashboard.
- ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) **Firebase Firestore**: Base de données NoSQL pour stocker les réponses au sondage et les informations des utilisateurs.
- ![Resend](https://img.shields.io/badge/Resend-0A0A0A?style=for-the-badge&logo=resend&logoColor=white) **Resend**: Service d'envoi d'emails transactionnels pour la confirmation et le remerciement des participants.
- ![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextauthdotjs&logoColor=white) **NextAuth + Middleware**: Gestion de l'authentification sécurisée des employés accédant au dashboard.
- ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white) **Chart.js**: Bibliothèque de graphiques pour la visualisation des données.
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) **Vercel**: Plateforme de déploiement pour une mise en production rapide et fiable.


## Enseignements et Compétences Acquises

-   **Gestion de Projet Rapide**: Capacité à élaborer une stratégie complète et à la mettre en œuvre dans des délais serrés.
-   **Communication Efficace**: Maintien d'un dialogue constant avec le client pour s'assurer que toutes les attentes sont satisfaites.
-   **Design Centré sur l'Utilisateur**: Création d'interfaces intuitives pour maximiser l'engagement et la satisfaction des utilisateurs.
-   **Sécurité et Authentification**: Mise en place de systèmes sécurisés pour protéger les données sensibles.
-   **Analyse de Données**: Collecte et interprétation des données pour fournir des insights exploitables au client.

## Ressources Visuelles

-   Aperçu du Sondage
-   Aperçu du Dashboard

----------

_Ce projet a été une expérience enrichissante, me permettant de combiner stratégie, développement rapide et communication efficace pour répondre aux besoins spécifiques d'une start-up en pleine croissance._
