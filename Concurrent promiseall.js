
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
            promises.push(response.value);
        }

        const additionalData = await Promise.all(promises);
        allData.push(...additionalData.flat());
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

In this version, `Promise.all()` is used to fetch multiple pages concurrently, reducing the overall time to fetch all data. This should significantly improve the performance and fetch all data in a much shorter time compared to fetching pages sequentially. Adjusting the pagination size may further optimize performance, but it depends on factors such as server capacity and network speed.
