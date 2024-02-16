
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
    try {
        let allData = [];
        let response = await fetchDataFromDataverse(api);
        allData.push(...response.value);

        const promises = [];
        while (response["@odata.nextLink"]) {
            promises.push(fetchDataFromDataverse(response["@odata.nextLink"]));
            response = await fetchDataFromDataverse(response["@odata.nextLink"]);
        }

        const additionalData = await Promise.all(promises);
        additionalData.forEach(data => allData.push(...data.value));

        return allData;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Event listener for button click
$('#toggleControlBtn').on('click', async () => {
    const apiEndpoint = '/_api/cr9f3_datatables?$select=cr9f3_column1,cr9f3_column2,cr9f3_column3,cr9f3_column4';
    
    const allData = await fetchAllDataFromDataverse(apiEndpoint);
    console.log("FinalData", allData);
});
```

Now, `Promise.all()` is correctly used to fetch multiple pages of data concurrently. This optimization should significantly improve performance compared to fetching pages sequentially. Each page of data is fetched asynchronously, and once all pages are fetched, they are merged into a single array (`allData`). This approach maximizes efficiency and reduces the overall time required to fetch all data.
