Feature: Achat sur Swag Labs
  Comme utilisateur standard, je veux acheter le premier produit le moins cher.

  Scenario: Parcours d'achat complet
    Given que je suis sur la page de connexion Swag Labs
    When je me connecte avec "standard_user" et "secret_sauce"
    And je trie les produits par prix croissant
    And j'ajoute le premier produit au panier
    And j'ouvre le panier
    Then je vois ce produit dans le panier
    When je passe au paiement avec "John" "Doe" "75000"
    Then je vois le message "Thank you for your order!"


  Scenario: Supprimer un article du panier
  Given que je suis sur la page de connexion Swag Labs
  When je me connecte avec "standard_user" et "secret_sauce"
  And je trie les produits par prix croissant
  And j'ajoute le premier produit au panier
  And j'ouvre le panier
  When je supprime ce produit du panier
  Then le panier est vide
