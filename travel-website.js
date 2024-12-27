document.getElementById('searchBtn').addEventListener('click', function () {
    const searchValue = document.getElementById('searchInput').value.trim();
    if (searchValue) {
        alert(`Searching for: ${searchValue}`);
    } else {
        alert("Please enter a keyword to search.");
    }
});

document.getElementById('resetBtn').addEventListener('click', function () {
    document.getElementById('searchInput').value = '';
});
