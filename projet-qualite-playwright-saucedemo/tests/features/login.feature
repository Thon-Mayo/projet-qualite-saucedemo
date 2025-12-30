Feature: Authentification Swag Labs

  Scenario: Login invalide affiche une erreur
    Given que je suis sur la page de connexion Swag Labs
    When je me connecte avec "standard_user" et "bad_password"
    Then je vois un message d'erreur de connexion contenant "Username and password do not match"

  Scenario: Compte verrouillé refuse la connexion
    Given que je suis sur la page de connexion Swag Labs
    When je me connecte avec "locked_out_user" et "secret_sauce"
    Then je vois un message d'erreur de connexion contenant "locked out"
