# Gherkin
# Décrit les parcours/scénario en langage naturel

Feature: Flask Lists - Gestion de tâches

  Scenario: Se connecter avec un compte existant
    Given que je suis sur la page d'accueil Flask Lists
    When je vais sur la page de connexion
    And je me connecte avec "pilay23171@daikoa.com" et le mot de passe "test-test-pilay"
    Then je vois que je suis connecté

  Scenario: Créer une liste et ajouter des tâches
    Given que je suis sur la page d'accueil Flask Lists
    When je crée une nouvelle liste
    Then je suis sur la page de création de liste
    When j'ajoute la tâche "Acheter du lait"
    And j'ajoute la tâche "Réviser cours"
    Then je vois la tâche "Acheter du lait"
    And je vois la tâche "Réviser cours"

  Scenario: Supprimer une tâche d'une liste
    Given que je suis sur la page d'accueil Flask Lists
    When je crée une nouvelle liste
    Then je suis sur la page de création de liste
    When j'ajoute la tâche "Tâche à supprimer"
    Then je vois la tâche "Tâche à supprimer"
    When je supprime la tâche "Tâche à supprimer"
    Then je ne vois plus la tâche "Tâche à supprimer"
