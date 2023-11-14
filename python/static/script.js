// document.addEventListener('DOMContentLoaded', function () {
//     // Dropdown button click event listener
//     document.querySelectorAll('.select-menu').forEach(function (dropdown) {
//         var selectBtn = dropdown.querySelector('.select-btn');
//         var options = dropdown.querySelector('.options');

//         selectBtn.addEventListener('click', function () {
//             options.classList.toggle('active');
//         });

//         // Option click event listener
//         dropdown.querySelectorAll('.option').forEach(function (option) {
//             option.addEventListener('click', function () {
//                 var text = option.querySelector('.option-text').innerText;
//                 selectBtn.querySelector('.sBtn-text').innerText = text;
//                 options.classList.remove('active');
//             });
//         });
//     });

//     // Handle click outside of the dropdown to close it
//     document.addEventListener('click', function (event) {
//         var dropdowns = document.querySelectorAll('.select-menu');
//         dropdowns.forEach(function (dropdown) {
//             if (!dropdown.contains(event.target)) {
//                 dropdown.querySelector('.options').classList.remove('active');
//             }
//         });
//     });

//     // Submit button click event listener
//     document.getElementById('submitBtn').addEventListener('click', function () {
//         // Get selected values
//         var peopleValue = document.getElementById('people-dropdown').querySelector('.sBtn-text').innerText;
//         var budgetValue = document.getElementById('budget-dropdown').querySelector('.sBtn-text').innerText;
//         var timeValue = document.getElementById('time-dropdown').querySelector('.sBtn-text').innerText;

//         // Log selected values (you can send these values to the server)
//         console.log('Selected People:', peopleValue);
//         console.log('Selected Budget:', budgetValue);
//         console.log('Selected Time:', timeValue);

//         // Here you can send the selected values to the server using AJAX or fetch
//         // Example using fetch:
//         fetch('/chat', {  // Change '/submit' to the actual endpoint on your server
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 people: peopleValue,
//                 budget: budgetValue,
//                 time: timeValue,
//             }),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 // Handle the response from the server if needed
//                 console.log('Server Response:', data);
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     });
// });
// script.js
document.addEventListener("DOMContentLoaded", function () {
    const optionMenus = document.querySelectorAll(".select-menu");

    optionMenus.forEach((optionMenu) => {
        const selectBtn = optionMenu.querySelector(".select-btn");
        const options = optionMenu.querySelectorAll(".option");
        const sBtn_text = optionMenu.querySelector(".sBtn-text");

        selectBtn.addEventListener("click", () => {
            optionMenu.classList.toggle("active");
        });

        options.forEach((option) => {
            option.addEventListener("click", () => {
                let selectedOption = option.querySelector(".option-text").innerText;
                sBtn_text.innerText = selectedOption;
                optionMenu.classList.remove("active");
            });
        });
    });

    // Submit button click event listener
    document.getElementById('submitBtn').addEventListener('click', function () {
        // Get selected values
        var peopleValue = document.getElementById('people-dropdown').querySelector('.sBtn-text').innerText;
        var budgetValue = document.getElementById('budget-dropdown').querySelector('.sBtn-text').innerText;
        var timeValue = document.getElementById('time-dropdown').querySelector('.sBtn-text').innerText;

        // Log selected values (you can send these values to the server)
        console.log('Selected People:', peopleValue);
        console.log('Selected Budget:', budgetValue);
        console.log('Selected Time:', timeValue);

        // Build the URL-encoded form data
        var formData = new URLSearchParams();
        formData.append('people', peopleValue);
        formData.append('budget', budgetValue);
        formData.append('time', timeValue);

        // Here you can send the selected values to the server using AJAX or fetch
        // Example using fetch:
        fetch('/chat', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server if needed
                console.log('Server Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
