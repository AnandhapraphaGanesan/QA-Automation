const xlsx = require("xlsx");
const fs = require("fs");

// Function to read Excel data
function readExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
}

// Function to write results to Excel
function writeResultsToExcel(filePath, sheetName, results) {
  const workbook = xlsx.readFile(filePath);
  const existingSheet = workbook.Sheets[sheetName];

  // Read existing data if the sheet exists
  let existingData = [];
  if (existingSheet) {
    existingData = xlsx.utils.sheet_to_json(existingSheet, { header: 1 });
  }

  // Find the first empty row
  const firstEmptyRow = existingData.findIndex((row) => row.length === 0);
  const startRow = firstEmptyRow === -1 ? existingData.length : firstEmptyRow;

  // Append new results to existing data
  for (let i = 0; i < results.length; i++) {
    existingData[startRow + i] = Object.values(results[i]);
  }

  // Remove the existing sheet if it exists
  if (workbook.SheetNames.includes(sheetName)) {
    delete workbook.Sheets[sheetName];
    const sheetIndex = workbook.SheetNames.indexOf(sheetName);
    if (sheetIndex > -1) {
      workbook.SheetNames.splice(sheetIndex, 1);
    }
  }

  const newSheet = xlsx.utils.aoa_to_sheet(existingData);
  xlsx.utils.book_append_sheet(workbook, newSheet, sheetName);
  xlsx.writeFile(workbook, filePath);
}

// Utility function to format date to string (YYYY-MM-DD)
function formatDateToString(excelDate) {
  const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000); // Adjust Excel date to JavaScript date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Utility function to get current date and time as a formatted string
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Correct file path and sheet name
const filePath = "C:/Users/User/Desktop/GRVXX.xlsx";
const sheetName = "CreateReservation"; // Ensure this matches your sheet name
const resultsSheetName = "Result";

// Read the data from the Excel file
const data = readExcel(filePath, sheetName);
const testResults = []; // Array to store test results

data.forEach((row) => {
  let authToken1,
    authToken2,
    reservationId,
    confirmationId,
    externalReferenceId;
  let ihgConfirmationNumber, externalConfirmationNumber, pmsConfirmationNumber;
  let formattedArrivalDate, formattedDepatureDate;

  describe("api Authu Token", function () {
    it("AuthToken1 ", async function ({ supertest }) {
      await supertest
        .request(
          "https://ihgcu2ua.hospitality-api.us-ashburn-1.ocs.oc-test.com"
        )
        .post("/oauth/v1/tokens")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("x-app-key", "1639912d-392a-473b-ad6f-272421e24849")
        .set("Authorization", "Basic Og==")
        .send({
          username: "HIEUAT_OIC2",
          password: "M2sTdBbk3WtGKF5AhzSxPu4YyV!",
          grant_type: "password",
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .then(function (response) {
          authToken1 = response._body.access_token;
        });
    });

    it(" POST Create Reservation", async function ({ supertest }) {
      // Format dates
      const formattedStartDate = formatDateToString(row.startDate);
      const formattedEndDate = formatDateToString(row.endDate);
      formattedArrivalDate = formatDateToString(row.arrivalDate);
      formattedDepatureDate = formatDateToString(row.depatureDate);

      await supertest
        .request(row.request)
        .post(row.Postendpath)
        .set("Content-Type", row["Content-Type1"])
        .set("x-hotelid", row.hotelId)
        .set("x-app-key", row["x-app-key"])
        .set("bypass-routing", row["bypass-routing"])
        .set("Authorization", "Bearer " + authToken1)
        .send({
          reservations: {
            reservation: {
              roomStay: {
                roomRates: {
                  rates: {
                    rate: {
                      base: {
                        amountBeforeTax: 204,
                        baseAmount: 204,
                      },
                      start: formattedStartDate,
                      end: formattedEndDate,
                    },
                  },
                  stayProfiles: [
                    {
                      reservationProfileType: "Company",
                    },
                    {
                      reservationProfileType: "Group",
                    },
                    {
                      reservationProfileType: "TravelAgent",
                    },
                    {
                      reservationProfileType: "ReservationContact",
                    },
                    {
                      reservationProfileType: "BillingContact",
                    },
                    {
                      reservationProfileType: "Source",
                    },
                  ],
                  guestCounts: {
                    adults: row.adults,
                    children: row.children,
                  },
                  roomType: row.roomType,
                  ratePlanCode: row.ratePlanCode,
                  marketCode: row.marketCode,
                  sourceCode: row.sourceCode,
                  numberOfUnits: row.numberOfUnits,
                  pseudoRoom: false,
                  roomTypeCharged: row.roomTypeCharged,
                  start: formattedStartDate,
                  end: formattedEndDate,
                },
                guestCounts: {
                  adults: row.adults,
                  children: row.children,
                },
                expectedTimes: {
                  reservationExpectedArrivalTime: formattedArrivalDate,
                  reservationExpectedDepartureTime: formattedDepatureDate,
                },
                guarantee: {
                  guaranteeCode: row.guaranteeCode,
                  onHold: false,
                },
                arrivalDate: formattedArrivalDate,
                departureDate: formattedDepatureDate,
              },
              reservationGuests: {
                profileInfo: {
                  profileIdList: {
                    type: "Profile",
                    id: row.profileId,
                  },
                  profile: {
                    customer: {
                      personName: [
                        {
                          givenName: row.givenName,
                          surname: row.surname,
                          nameType: "Primary",
                        },
                        {
                          nameType: "Alternate",
                        },
                      ],
                    },
                    addresses: {
                      addressInfo: {
                        address: {
                          isValidated: false,
                          addressLine: ["", "", "", ""],
                          country: {
                            code: "US",
                          },
                          type: "HOME",
                        },
                        type: "Address",
                        id: 51206,
                      },
                    },
                  },
                },
              },
              reservationProfiles: {
                reservationProfile: [
                  {
                    reservationProfileType: "Company",
                  },
                  {
                    reservationProfileType: "Group",
                  },
                  {
                    reservationProfileType: "TravelAgent",
                  },
                  {
                    reservationProfileType: "ReservationContact",
                  },
                  {
                    reservationProfileType: "Source",
                  },
                  {
                    reservationProfileType: "Addressee",
                  },
                ],
              },
              reservationPaymentMethods: [
                {
                  emailFolioInfo: {
                    emailFolio: false,
                  },
                  paymentMethod: row.paymentMethod,
                  folioView: 1,
                },
                {
                  emailFolioInfo: {
                    emailFolio: false,
                  },
                  folioView: 2,
                },
                {
                  emailFolioInfo: {
                    emailFolio: false,
                  },
                  folioView: 3,
                },
                {
                  emailFolioInfo: {
                    emailFolio: false,
                  },
                  folioView: 4,
                },
                {
                  emailFolioInfo: {
                    emailFolio: false,
                  },
                  folioView: 5,
                },
                {
                  emailFolioInfo: {
                    emailFolio: false,
                  },
                  folioView: 6,
                },
                {
                  emailFolioInfo: {
                    emailFolio: false,
                  },
                  folioView: 7,
                },
                {
                  emailFolioInfo: {
                    emailFolio: false,
                  },
                  folioView: 8,
                },
              ],
              cashiering: {
                taxType: {
                  code: "",
                  collectingAgentTax: false,
                  printAutoAdjust: false,
                },
                reverseCheckInAllowed: false,
                // "reverseAdvanceCheckInAllowed": falses
              },
              hotelId: row.hotelId,
              reservationStatus: "Reserved",
              customReference: "",
              displayColor: "",
              markAsRecentlyAccessed: true,
              preRegistered: false,
              allowMobileCheckout: false,
              overrideOutOfServiceCheck: true,
            },
          },
        })
        .expect(201)
        .expect("Content-Type", /json/)
        .then(function (response) {
          const locationHeader = response.headers.location;
          console.log("Location Header: ", locationHeader);

          const urlParts = locationHeader.split("/");
          reservationId = urlParts[urlParts.length - 1];
          console.log("Reservation ID: ", reservationId);
          console.log("Reservation created successfully");
        });
    });

    it("GET Reservation OHIP", async function ({ supertest }) {
      await supertest
        .request(row.request)
        .get(row.Getendpath + reservationId)
        .set("Content-Type", row["Content-Type1"])
        .set("x-hotelid", row.hotelId)
        .set("x-app-key", row["x-app-key"])
        .set("bypass-routing", row["bypass-routing"])
        .set("Authorization", "Bearer " + authToken1)
        .expect(200)
        .expect("Content-Type", /json/)
        .then(function (response) {
          const responseBody = JSON.parse(response.text);
          const reservation = responseBody.reservations.reservation[0];

          const confirmationIdEntry = reservation.reservationIdList.find(
            (idEntry) => idEntry.type === "Confirmation"
          );
          confirmationId = confirmationIdEntry
            ? confirmationIdEntry.id
            : "Not found";

          const externalReferenceIdEntry = reservation.externalReferences.find(
            (ref) => ref.idContext === "CRS_HIEUAT"
          );
          externalReferenceId = externalReferenceIdEntry
            ? externalReferenceIdEntry.id
            : "Not found";

          console.log("Status : Reservation created Successfully in OHIP");
          console.log("Reservation ID :", reservationId);
          console.log("Confirmation ID:", confirmationId);
          console.log("External Reference ID:", externalReferenceId);
        });

      //         .catch(function (error) {
      //             console.error('Error in Get api test after login:', error);
      //         });

      // Store result
      testResults.push({
        // Status: 'Reservation created successfully ',
       // ReservationID: reservationId,
        ConfirmationID: confirmationId,
        ExternalReferenceId: externalReferenceId,
        // IHGConfirmationNumber: ihgConfirmationNumber,
        // ExternalConfirmationNumber: externalConfirmationNumber,
        // PMSConfirmationNumber: pmsConfirmationNumber,
        ArrivalDate: formattedArrivalDate,
        DepartureDate: formattedDepatureDate,
        // DateTime: getCurrentDateTime(),
      });

      after(function () {
        writeResultsToExcel(filePath, resultsSheetName, testResults);
      });
    });
  });
});
