## Dmoney-Performance-Testing

## Project Scenario (Request):

  1. Login to user
  2. Create a new agent
  3. Give balance to the newly created agent from system
  4. Create a customer
  5. Search the newly created user by phone number
  6. Deposit balance to the customer from the agent
  7. Withdraw some money from the agent
  8. Delete the user

## Technology and Tool Used
  - Apache Jmeter
  - JAVA 8
 
## Prerequisite
  - Jmeter must be installed
  - JAVA 8 or 11 must be installed
  
## How to run this project
  - Clone this project
  - Copy the Dmoney-Load-Test.jmx file and place it in the bin folder of the Jmeter installation location
  - Run the project by opening the Dmoney-Load-Test.jmx file in Jmeter
  
## How to generate report
  - Delete the previously Report folder from the project 
  - Open command promt in bin folder of the Jmeter installation location
  - hit this command: jmeter -n -t .\Dmoney-Api-Performance-Test.jmx -l dmoneyapi-performance.csv -e -o Reports
   
## Report of load testing


## Test Plan

## View Result Tree

## Summary Report
