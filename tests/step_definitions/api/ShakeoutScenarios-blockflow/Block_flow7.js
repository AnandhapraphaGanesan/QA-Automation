const fs = require('fs');
const XLSX = require('xlsx');
const supertest = require('supertest');
const path = require('path');



// Load the JSON data from the file
const FilePath = './Config.json';
const Data = JSON.parse(fs.readFileSync(FilePath, 'utf8'));
const filepath = Data.filepath;

// Load the JSON data from the file
const jsonFilePath = filepath.jsoninputpath;
const testData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
//console.log(testData);
let excelData = [];
//let reservation.authToken1;
let BlockID; 
let CancellationId;
let PaymentMethod;
let StartDate;
let EndDate;
let cancellationID;
let CurrencyCode;
let BlockCode;


 // Variable to store the campaign id from the first program's response 
 const reservation = testData.reservation;
 describe('api Authu Token', function () {
    const reservation = testData.reservation;
    // before(async function () {
    //     const reservation = testData.reservation;
    //     await supertest(reservation.request)
    //         .post(reservation.Authendpath)
    //         .set('Content-Type', reservation['Content-Type'])
    //         .set('x-app-key', reservation['x-app-key'])
    //         .set('Authorization', reservation.Authorization)
    //         .send({
    //             username: reservation.username,
    //             password: reservation.password,
    //             grant_type: 'password'
    //         })
    //         .expect(200)
    //         .expect('Content-Type', /json/)
    //         .then(function (response) {
    //             reservation.authToken1 = response.body.access_token;
    //             //console.log('Auth Token:', reservation.authToken1); // Logging the token
    //         });
    //     });


  it('post api test to create the group block', async function({supertest}) {
    await supertest
    .request(reservation.request)
    .post(reservation.Postendpath3)
    .set('Content-Type', reservation['Content-Type1'])
    .set('x-hotelid', reservation.hotelId)
    .set('x-app-key', reservation['x-app-key'])
    .set('bypass-routing', reservation['bypass-routing'])
    .set('Authorization', 'Bearer ' + reservation.authToken1)
    .send(
        {
            "blocks": {
                "blockInfo": {
                    "block": {
                        "blockDetails": {
                            "blockCode": reservation.blockcode7,
                            "blockName": "allocation",
                            "timeSpan": {
                                "startDate": reservation.arrivalDate2,
                                "endDate": reservation.departureDate2
                            },
                            "shoulderDates": "",
                            "blockStatus": {
                                "bookingStatus": {
                                    "status": {
                                        "code": reservation.currentBlockStatus
                                    }
                                }
                            },
                            "reservationType": {
                                "reservationType": "GT"
                            },
                            "marketCode": {
                            "marketCode": "G"
                            },
                            "sourceOfSale": {
                                "sourceCode": {
                                    "sourceCode": "GD"
                                }
                            },
                            "reservationMethod": "",
                            "bookingType": "",
                            "blockOrigin": "PMS",
                            "rateProtectionDetails": {
                                "criteria": "None"
                            },
                            "nonCompeteDetails": {
                                "criteria": "None"
                            },
                            "blockClassification": "RegularBooking",
                            "cateringOnlyBlock": "false",
                            "allowRateOverride": "false",
                            "manualCutOff": "false",
                            "wholesaleBlock": "false",
                            "controlBlockLocally": "false"
                        },
                        "blockOwners": {
                            "owner": [
                                {
                                    "ownership": "Block",
                                    "ownerCode": "ALL",
                                    "primary": "true"
                                },
                                {
                                    "ownership": "Catering",
                                    "ownerCode": "ALL",
                                    "primary": "true"
                                },
                                {
                                    "ownership": "Rooms",
                                    "ownerCode": "ALL",
                                    "primary": "true"
                                }
                            ],
                            "lockBlockOwners": "false",
                            "lockRoomsOwners": "false",
                            "lockCateringOwners": "false"
                        },
                        "reservationDetails": {
                            "traceCode": "",
                            "breakfast": {
                                "breakfastIncluded": "false",
                                "price": ""
                            },
                            "porterage": {
                                "porterageIncluded": "false",
                                "price": ""
                            },
                            "elastic": "2",
                            "printRate": "true",
                            "housing": "true",
                            "controlBlockLocally": "false"
                        },
                        "catering": {
                            "cateringStatus": {
                                "bookingStatus": {
                                    "status": ""
                                }
                            },
                            "eventAttendees": "",
                            "overrideEventsProcessingWarnings": "true"
                        },
                        "blockProfiles": {
                            "fullOverlay": "false"
                        },
                        "externalAttributes": {
                            "eventType": "Convention",
                            "rollEndDate": "false"
                        },
                        "hotelId": reservation.hotelId,
                        "markAsRecentlyAccessed": "true"
                    }
                }
            }
        }
    )
    
    
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function(response){
        //console.log(response)
        const locationHeader = response.headers.location;
        console.log("Location Header: ", locationHeader);

        const urlParts = locationHeader.split('/');
        BlockID = urlParts[urlParts.length - 1];
        console.log("BLOCK ID: ", BlockID);
    
    });
});
it('Get api test after login', async function ({ supertest }) {
  await supertest
    .request(reservation.request)
    .get(`/blk/v1/hotels/GRVZA/blocks/${BlockID}`)
   .set('Content-Type', reservation['Content-Type1'])
  .set('x-hotelid', reservation.hotelId)
  .set('x-app-key', reservation['x-app-key1'])
  .set('bypass-routing', reservation['bypass-routing'])
  .set('Authorization', 'Bearer ' + reservation.authToken1)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(function (response) {
    // console.log(response.text); // Output the raw response for debugging
      
      // Parse the response text into a JSON object
      const jsonResponse = JSON.parse(response.text);
      
      // Now access the fields safely
      const blockInfo = jsonResponse.blocks.blockInfo[0].block.blockDetails;
      const startDate = blockInfo.timeSpan.startDate;
      const endDate = blockInfo.timeSpan.endDate;
      const blockCode = blockInfo.blockCode;
      
      
    
      // Print the extracted data
      console.log(`Start Date: ${startDate}`);
      console.log(`End Date: ${endDate}`);
      console.log(`Block Code: ${blockCode}`);
      
      
    });
     
    });
it('put api test update the payment type', async function({supertest}) {
    await supertest
     .request(reservation.request)
     .put(`/blk/v1/hotels/GRVZA/blocks/${BlockID}`)
      .set('Content-Type', reservation['Content-Type1'])
     .set('x-hotelid', reservation.hotelId)
     .set('x-app-key', reservation['x-app-key1'])
     .set('bypass-routing', reservation['bypass-routing'])
     .set('Authorization', 'Bearer ' + reservation.authToken1)
    .send({
        "blocks": {
          "responseInstructions": {
            "confirmationOnly": true
          },
          "blockIdList": {
            "type": "Block",
            "idContext": "OPERA",
            "id": BlockID
          },
          "blockDetails": {
            "blockCode": reservation.blockcode7,
            "blockName": reservation.blockName,
            "timeSpan": {
              "startDate": reservation.arrivalDate2,
              "endDate": reservation.departureDate2
            },
            "blockDates": {
              "startDate": reservation.arrivalDate2,
              "endDate": reservation.departureDate2
            },
            "shoulderDates": "",
            "blockStatus": {
              "bookingStatus": {
                "status": {
                  "code": reservation.currentBlockStatus
                }
              }
            },
            "reservationType": {
              "reservationType": "GT"
            },
            "marketCode": {
              "marketCode": "G"
            },
            "sourceOfSale": {
              "sourceCode": {
                "sourceCode": "GD"
              }
            },
            "reservationMethod": "",
            "status": "O",
            "paymentMethod": {
              "code": "CASH"
            },
            "currencyCode": "GBP",
            "blockClassification": "RegularBooking",
            "synchronized": false,
            "cateringOnlyBlock": false,
            "flexibleDates": false,
            "autoloadContractGrid": true,
            "allowRateOverride": false,
            "manualCutOff": false,
            "wholesaleBlock": false,
            "controlBlockLocally": true
          },
          "blockOwners": {
            "owner": [
              {
                "ownership": "Block",
                "hotel": {
                  "code": reservation.hotelId
                },
                "ownerCode": "ALL",
                "profileId": {
                  "type": "Profile",
                  "idContext": "OPERA",
                  "id": reservation.profileId
                },
                "name": {
                  "givenName": reservation.givenName,
                  "surname": reservation.lastName
                },
                "email": {
                  "email": ""
                },
                "primary": true
              },
              {
                "ownership": "Rooms",
                "hotel": {
                  "code": reservation.hotelId
                },
                "ownerCode": "ALL",
                "profileId": {
                  "type": "Profile",
                  "idContext": "OPERA",
                  "id": reservation.profileId
                },
                "name": {
                  "givenName":reservation.givenName,
                  "surname": reservation.lastName
                },
                "email": {
                  "email": ""
                },
                "primary": true
              },
              {
                "ownership": "Catering",
                "hotel": {
                  "code": reservation.hotelId
                },
                "ownerCode": "ALL",
                "profileId": {
                  "type": "Profile",
                  "idContext": "OPERA",
                  "id": reservation.profileId
                },
                "name": {
                  "givenName": reservation.givenName,
                  "surname": reservation.lastName
                },
                "email": {
                  "email": ""
                },
                "primary": true
              }
            ],
            "lockBlockOwners": false,
            "lockRoomsOwners": false,
            "lockCateringOwners": false
          },
          "reservationDetails": {
            "breakfast": {
              "breakfastIncluded": false,
              "price": ""
            },
            "porterage": {
              "porterageIncluded": false,
              "price": ""
            },
            "cutOffDays": 0,
            "updateGridOnCutoffChange": false,
            "elastic": 2,
            "suppressRate": false,
            "printRate": true,
            "rateGuarantee": false,
            "housing": true,
            "guaranteeRequired": false,
            "controlBlockLocally": true
          },
          "catering": {
            "cateringStatus": {
              "bookingStatus": {
                "status": ""
              }
            },
            "eventAttendees": {
              "attendeesGuaranteed": false
            },
            "trackChanges": false,
            "eventOrder": {
              "distributed": false
            },
            "pkgsTmplt": false,
            "overrideEventsProcessingWarnings": false
          },
          "blockSecurity": {
            "securedFromDIDisplayYn": false,
            "securedFromDIDisplay": false,
            "securedFromDIdisplayYn": false,
            "allDescriptionDDSecured": false,
            "allDescriptionDDSecuredYn": false,
            "ratesSecuredfromGNRYn": false,
            "ratesSecuredfromGNR": false,
            "ratesSecuredfromAllDisplays": false,
            "ratesSecuredfromAllDisplaysYn": false,
            "housingInformationSecured": false,
            "housingInformationSecuredYn": false,
            "returnOneDayAtTimeYn": false,
            "commissionableYn": false
          },
          "externalAttributes": {
            "eventType": "Convention",
            "rollEndDate": false
          },
          "hotelId": reservation.hotelId,
          "markAsRecentlyAccessed": true
        }
      })
    .expect(200)
    .expect('Content-Type', /json/)
    .then(function(response){
     // console.log(response)
      
  });
});
  


it('put api test Cancel the group block', async function({supertest}) {
    await supertest
     .request(reservation.request)
     .put(`/blk/v1/hotels/GRVZA/blocks/${BlockID}/status`)
      .set('Content-Type', reservation['Content-Type1'])
     .set('x-hotelid', reservation.hotelId)
     .set('x-app-key', reservation['x-app-key1'])
     .set('bypass-routing', reservation['bypass-routing'])
     .set('Authorization', 'Bearer ' + reservation.authToken1)
    .send(
        {
            "verificationOnly": "false",
            "changeBlockStatus": {
                "hotelId": reservation.hotelId,
                "blockId": {
                    "type": "Block",
                    "idContext": "OPERA",
                    "id": BlockID
                },
                "currentBlockStatus": "TEN",
                "newBlockStatus": "CXL",
                "reservationType": "GT",
                "cancellationDetails": {
                    "cancellationCode": {
                        "code": "CRS"
                    },
                    "cancellationInfo": "Cancelled by CRS"
                },
                "pMReservationsCancellationDetails": {
                    "cancellationCode": {
                        "code": "CRS"
                    }
                },
                "overbookAll": "false",
                "cancelAllPMReservations": "true",
                "applyChangesToCateringSatus": "false",
                "overrideEventsProcessingWarnings": "false"
            },
            "_xmlns": "http://xmlns.oracle.com/cloud/adapter/REST/Receive/types"
        }
    
    ,)
    .expect(200)
      .expect('Content-Type', /json/)
      .then(function(response) {
        // Extract block ID
        const blockId = response.body.block.blockIdList[0].id || 'Not found';
      
        // Extract cancellation ID
        const cancellationId = response.body.cancellationDetails.cancellationNumber.id || 'Not found';
        CancellationId = cancellationId;
      
        // Console output to show extracted values
        console.log(`Status: Block cancellation retrieved successfully`);
        console.log('Cancellation ID:',CancellationId);
      });
        
    });
    it('Get api test after update payment method and cancel', async function ({ supertest }) {
      await supertest
        .request(reservation.request)
        .get(`/blk/v1/hotels/GRVZA/blocks/${BlockID}`)
       .set('Content-Type', reservation['Content-Type1'])
      .set('x-hotelid', reservation.hotelId)
      .set('x-app-key', reservation['x-app-key1'])
      .set('bypass-routing', reservation['bypass-routing'])
      .set('Authorization', 'Bearer ' + reservation.authToken1)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function (response) {
          //console.log(response.text); // Output the raw response for debugging
          
          // Parse the response text into a JSON object
          const jsonResponse = JSON.parse(response.text);
          
          // Now access the fields safely
          const blockInfo = jsonResponse.blocks.blockInfo[0].block.blockDetails;
          const startDate = blockInfo.timeSpan.startDate;
          StartDate = startDate;
          const endDate = blockInfo.timeSpan.endDate;
          EndDate = endDate;
          const blockCode = blockInfo.blockCode;
          BlockCode = blockCode;
          const paymentMethod = blockInfo.paymentMethod.description;
          PaymentMethod = paymentMethod;
          const currencyCode = blockInfo.currencyCode;
          CurrencyCode = currencyCode;
          const cancellationId = blockInfo.cancellationDetails.cancellationNumber.id;
          cancellationID = cancellationId;
        
          // Print the extracted data
          console.log('Start Date:',StartDate);
          console.log('End Date:',EndDate);
          console.log('Block Code:',BlockCode);
          console.log('Payment Method:',PaymentMethod);
          console.log('Currency Code:',CurrencyCode);
          console.log('Cancellation ID:',cancellationID);
          excelData.push([BlockID, StartDate, EndDate, cancellationID, PaymentMethod, CurrencyCode, BlockCode]); 
        })
         
        });
       
        after(function () {
          const excelFilePath = path.join(filepath.exceloutputpath);
          
          // Ensure the directory exists
          const dir = path.dirname(excelFilePath);
          if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
          }
        
          let wb;
          let ws;
          
          // Define a unique sheet name for each program
          const sheetName = 'Block Flow7';  // Change this for each program (e.g., 'Program1', 'Program2', etc.)
        
          // Use an object to map sheet names to their corresponding headers
          const headersMap = {
              'Block Flow7': ['BlockID', 'StartDate', 'EndDate', 'Cancellation ID', 'PaymentMethod', 'CurrencyCode', 'Blockcode'],
              
          };
        
          // Get the appropriate headers for the current program from the map
          const headers = headersMap[sheetName];
        
          // Check if the Excel file exists
          if (fs.existsSync(excelFilePath)) {
              // If the file exists, read the workbook
              wb = XLSX.readFile(excelFilePath);
        
              // Check if the specific sheet for the program exists
              if (wb.SheetNames.includes(sheetName)) {
                  // Load the existing sheet
                  ws = wb.Sheets[sheetName];
        
                  // Convert the existing sheet to JSON format for easy manipulation
                  let existingData = XLSX.utils.sheet_to_json(ws, { header: 1 });
        
                  // Append new data to the existing sheet
                  existingData.push(...excelData);
        
                  // Log the data being appended for debugging
                 // console.log("Data being appended:", existingData);
        
                  // Convert the updated data back to a sheet
                  ws = XLSX.utils.aoa_to_sheet(existingData);
        
                  // Remove the old sheet
                  wb.SheetNames = wb.SheetNames.filter(sheet => sheet !== sheetName);
              } else {
                  // If the sheet doesn't exist, create it and prepend headers
                  let existingData = [];
                  existingData.push(headers);  // Add headers for the new sheet
                  existingData.push(...excelData);
        
                  // Create a new sheet from the data
                  ws = XLSX.utils.aoa_to_sheet(existingData);
              }
          } else {
              // If the file doesn't exist, create a new workbook and sheet
              wb = XLSX.utils.book_new();
        
              let existingData = [];
              existingData.push(headers);  // Add headers for the new sheet
              existingData.push(...excelData);
        
              // Create a new sheet from the data
              ws = XLSX.utils.aoa_to_sheet(existingData);
          }
        
          // Append the updated or newly created sheet to the workbook
          XLSX.utils.book_append_sheet(wb, ws, sheetName);
        
          // Save the updated workbook to the Excel file
          XLSX.writeFile(wb, excelFilePath);
          //console.log(`Data successfully saved to ${excelFilePath} under sheet: ${sheetName}`);
        });
    
});  
          


