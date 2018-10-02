Feature: Categories - List Page All Actions

  @watch
  Scenario Outline: Categories - List Page All Actions
    Given I open url provided in input
    When I enter credentials with id "okta-signin-username" as "OktaDMPUsername" extracted from file "Credential.properties"
    When I enter credentials with id "okta-signin-password" as "OktaDMPPassword" extracted from file "Credential.properties"
    Then I click input button having id "okta-signin-submit"
    ##---CREATE---
    Then I click input button "Create"
    When I enter "Name" as "CatName" extracted from file "Credential.properties"
    Then I enter multiline text in "Description" as "Test Description"
    Then I click button "Create"
    Then I enter placeholder "Search for an item by name or description" as "CatName" extracted from file "Credential.properties"
    Then I click on "Test Description"
    Then I verify existence of extracted text "Credential.properties/CatName" is present
    ##---VERIFY DEFAULT ACTIONS---
    Then I verify image button " Check In" as enabled
    Then I verify image button " Preview" as enabled
    Then I verify image button " Delete" as enabled
    Then I verify image button " Check Out" as disabled
    Then I verify image button " Cancel Check Out" as disabled
    ##---ACTIONS ON LIST PAGE TOOLBAR---
    Then I click Image button "Check In"
    Then I enter multiline text in "Check in comments" as "Check In Multiple"
    Then I click button "Check In"
    ##---PREVIEW AND VIEW---
    Then I click Image button "Preview"
    Then I verify existence of extracted text "Credential.properties/CatName" is present
    Then I click input button "Open Editor"
    ##---CHECK OUT AND CANCEL CHECK OUT---
    When I click on "Categories and Products"
    Then I enter placeholder "Search for an item by name or description" as "CatName" extracted from file "Credential.properties"
    Then I click on "Test Description"
    Then I click Image button "Check Out"
    Then I verify image button " Cancel Check Out" as enabled
    Then I click Image button "Cancel Check Out"
    Then I click button " Yes"
    ##---DELETE---
    Then I click Image button "Check Out"
    Then I verify image button " Delete" as enabled
    Then I click Image button "Delete"
    Then I click on button name " Yes"
    Then I click Image button "Check In"
    Then I enter multiline text in "Check in comments" as "Check In Delete"
    Then I click button "Check In"
    ##--- THE END---
    Then Browser Ending Actions

    Examples:
      | Login | Password | CatName |
      | admin | admin | Category99 |
