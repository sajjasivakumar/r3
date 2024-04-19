############################################################################################################
# File Name          : 001_USDConversionTests                                                              #
# Author             : Siva Kumar Sajja                                                                    #
# Description        : R3 API USD Conversion Rate Tests                                                    #
# Test Count         : 05                                                                                  #
############################################################################################################

@APITest
Feature: USD Conversion API Tests

  Scenario: API call is successful and returns valid price
    Given the user make a GET request to the API
    When the response status code should is 200
    Then the response should contain a valid USD price

  Scenario: Check status code and status returned by the API response
    Given the user make a GET request to the API
    When the response status code should is 200
    Then the response should contain a status
    And the status should be "success"

  Scenario: Fetch the USD price against the AED and ensure the prices are in range 3.6 - 3.7
    Given the user make a GET request to the API
    When the response status code should is 200
    Then the USD price against AED should be within range 3.6 - 3.7

  Scenario: Verify that 162 currency pairs are returned by the API
    Given the user make a GET request to the API
    When the response status code should is 200
    Then the number of currency pairs returned should be 162

  Scenario: Make sure API response matches the JSON schema
    Given the user make a GET request to the API
    When the response status code should is 200
    Then the response should match the JSON schema
