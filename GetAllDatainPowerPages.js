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
        const { value, "@odata.nextLink" } = response;
        allData.push(...value);

        while (nextLink) {
            response = await fetchDataFromDataverse(nextLink);
            const { value, "@odata.nextLink" } = response;
            allData.push(...value);
        }
    } catch (error) {
        console.error(error);
    }

    return allData;
}

// Event listener for button click
$('#getData').on('click', async () => {
    const apiEndpoint = '/_api/{tablename}';
    
    const allData = await fetchAllDataFromDataverse(apiEndpoint);
    console.log("FinalData", allData);
});
