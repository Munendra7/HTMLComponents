
```javascript
// Function to fetch data from dataverse with pagination
async function fetchDataFromDataverse(api) {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Function to fetch all data from dataverse
async function fetchAllDataFromDataverse(api) {
    let allData = [];

    try {
        let response = await fetchDataFromDataverse(api);
        allData.push(...response.value);

        const promises = [];
        while (response["@odata.nextLink"]) {
            response = await fetchDataFromDataverse(response["@odata.nextLink"]);
            allData.push(...response.value);
        }
    } catch (error) {
        console.error(error);
    }

    return allData;
}

// Event listener for button click
$('#toggleControlBtn').on('click', async () => {
    const apiEndpoint = '/_api/cr9f3_datatables?$select=cr9f3_column1,cr9f3_column2,cr9f3_column3,cr9f3_column4';
    
    const allData = await fetchAllDataFromDataverse(apiEndpoint);
    console.log("FinalData", allData);
});
```

Now, all the fetched data from each page will be properly concatenated into the `allData` array, ensuring that all data is returned and logged correctly. This should resolve the issue of only returning the first set of data.
