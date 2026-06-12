### Guide d'installation
1. **Installer les dépendances :** `npm install`
2. **Lancer le serveur de développement Expo :** `npx expo start`
3. **Scanner le QR code :** Scannez le QR code affiché dans le terminal avec l'application Expo Go (sur iOS ou Android) en veillant à être sur le même réseau Wi-Fi que votre ordinateur. Vous pouvez également appuyer sur `a` pour lancer l'émulateur Android ou `i` pour le simulateur iOS.

### Fait / Pas fait (Périmètre du TP)

**Fonctionnalités obligatoires**
- [x] Recherche de recettes via l'API TheMealDB
- [x] Liste performante avec FlatList et utilisation d'un composant RecipeCard réutilisable
- [x] Écran de détail (image de la recette, ingrédients structurés, instructions)
- [x] État global géré par un store Redux (Redux Toolkit)
- [x] Favoris ajoutés/retirés via Redux et persistés avec redux-persist + AsyncStorage
- [x] Écran "Favoris" dédié, avec gestion des états (chargement, erreur, liste vide)

**Bonus réalisés**
- [x] Mise en cache des recherches dans le store avec recipesSlice
- [x] Filtrage des recettes par catégories
- [x] Écran "Recette au hasard"
- [x] Navigation avancée par onglets
- [x] Intégration du lien vidéo YouTube de la recette via react-native-youtube-iframe
- [x] Ajout/Retrait rapide des favoris directement depuis les cartes de la page d'accueil

**Fonctionnalités bonus non réalisées**
- [ ] Thème sombre
- [ ] Animations avancées au chargement des listes

### Technologies utilisées
- **Framework :** React Native & Expo
- **Navigation :** React Navigation (Native Stack & Bottom Tabs)
- **Gestion d'état :** Redux Toolkit
- **Persistance :** Redux Persist & AsyncStorage
- **Interface & Icônes :** StyleSheet (Flexbox) & Expo Vector Icons (Ionicons)
- **Vidéos :** React Native Webview & React Native Youtube Iframe

### Difficultés rencontrées
- **Imbrication des navigateurs :** Il a fallu comprendre comment imbriquer correctement le TabNavigator à l'intérieur du StackNavigator principal pour éviter l'erreur de double NavigationContainer et gérer correctement l'affichage de la barre du bas.
- **Typage avec TypeScript :** Résolution de plusieurs conflits de types, notamment la conversion des IDs de recettes de type string (stockés en mémoire) vers le type number attendu par certaines fonctions API.
- **Cycle de vie des onglets :** L'écran affichant une recette aléatoire ne se mettait pas à jour en changeant d'onglet. Le problème a été résolu en remplaçant useEffect par le hook useFocusEffect combiné à useCallback.
- **Intégration Vidéo :** L'extraction de l'ID unique de la vidéo YouTube à partir de l'URL complète fournie par l'API a nécessité une manipulation propre des chaînes de caractères (`.split('=')[1]`).

*Projet réalisé dans le cadre du TP React Native.*
