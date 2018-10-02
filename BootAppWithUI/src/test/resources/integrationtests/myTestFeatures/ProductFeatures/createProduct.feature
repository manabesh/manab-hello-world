@watch
Feature: I want to test product page functionality

Scenario: I want to create a product in products page
    Given I navigate to "http://localhost:9090"
    Then I click anchor "Create Product"
    Then I enter "manabProduct" in input with id "productId"
    Then I enter "My product Description" in input with id "description"
    Then I enter "5000" in input with id "price"
    Then I enter "images/NewBannerBOOTS_2.png" in input with id "imageUrl"
    Then I click on button name "Submit"
    Then I verify heading "Product Details" exists
    Then I wait for "5000"
