# Star Wars Characters App

Bu proje, Star Wars karakterlerinin listesini getiren, filtreleyen, sayfalayan ve Excel çıktısı üreten bir React uygulamasıdır.

## Özellikler:
- Star Wars karakterlerini listeleme
- Cinsiyete göre filtreleme
- Sayfalama (pagination) özelliği
- Listeyi Excel formatında dışa aktarma

## Kullanılan Teknolojiler:
- React
- Apollo Client (GraphQL API ile veri çekme)
- TypeScript
- XLSX (Excel çıktısı üretme)
- File-Saver (Dosya indirme)

## Kurulum ve Çalıştırma:

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/kullaniciAdi/star-wars-app.git


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
