#Mon travail
NIVEAU 1
1. Afficher la liste des utilisateurs chargée depuis l’API. Utiliser useState et useEffect.
• Afficher les données principales : photo, prénom, nom, email.
• Clic sur un utilisateur → afficher ses détails : âge, société, ville, etc.
• Créer au moins 3 composants :
• <UserList />, <UserCard />, <UserDetail />.
• Navigation entre la liste et la fiche de détail via React Router :
• / → liste
• /user/:id → fiche de détail
• Gérer un état de chargement (Loading…) et une erreur réseau.

- Création du modèle, la classe User dans laquelle se trouve les paramètres
- Création de UserApi.tsx pour récupérer les données avec fetch
- Création des composants : UserCard, UserList, UserDetail et leur CSS
- Mise à jour du fichier App.tsx avec les routes
- Mise à jour du main.tsx avec : <BrowserRouter>
      <App />
    </BrowserRouter>

NIVEAU 2
• Conserver les fonctionnalités du niveau 1.
• Ajouter :
• Un champ de recherche (nom, prénom, email) en temps réel.
• Un tri par nom ou par âge.
• Une pagination (10 utilisateurs par page).
• Gestion propre des erreurs via try/catch.

-Ajout des fonctionnnalités dans UserList.tsx
-Mise à jour de UserApi.tsx et adaptation du css
-Résultats de l'erreur via try/catch.
<img width="1911" height="976" alt="image" src="https://github.com/user-attachments/assets/156dc3b8-0449-42f6-a83f-fd3bb0dee26b" />
*Voir code Image.png

NIVEAU 3 (seulement la première étape)
Système de favoris : clic sur une étoile de chaque Card → ajout/suppression,
persistant via localStorage.

-Ajout de l'outil LocalSTorageUtils.tsx
-Adaptation du UserCard.Css














# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
